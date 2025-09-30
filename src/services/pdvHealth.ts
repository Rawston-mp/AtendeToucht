import { useEffect, useState } from 'react'

export type PdvStatus = 'unknown' | 'online' | 'offline'

export function pingPdv(baseUrl: string, timeoutMs = 1500): Promise<boolean> {
  if (!baseUrl) return Promise.resolve(false)

  const controller = new AbortController()
  const to = setTimeout(() => controller.abort(), timeoutMs)

  // 1) Tenta um fetch no-cors para a raiz: se resolve (mesmo opaco), consideramos online
  //    Isso evita falsos negativos por assets específicos.
  const tryFetch = async () => {
    try {
      const u = new URL(baseUrl)
      // força raiz
      u.pathname = '/'
      const res = await fetch(u.toString(), {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store',
        signal: controller.signal,
      })
      // Resposta opaca não é inspecionável, mas ter evitado erro de rede já é um bom indicador
      return true
    } catch {
      return false
    } finally {
      clearTimeout(to)
    }
  }

  // 2) Fallback: tenta carregar imagens em alguns caminhos conhecidos
  const tryImages = () => {
    const paths = ['/vite.svg', '/favicon.ico']
    const tryPath = (idx: number): Promise<boolean> => {
      return new Promise((resolve) => {
        if (idx >= paths.length) return resolve(false)
        try {
          const u = new URL(baseUrl)
          u.pathname = paths[idx]
          const img = new Image()
          let done = false
          const cleanup = () => {
            img.onload = null
            img.onerror = null
          }
          const timer = setTimeout(() => {
            if (done) return
            cleanup()
            resolve(false)
          }, timeoutMs)
          img.onload = () => {
            if (done) return
            done = true
            clearTimeout(timer)
            cleanup()
            resolve(true)
          }
          img.onerror = async () => {
            if (done) return
            clearTimeout(timer)
            cleanup()
            resolve(await tryPath(idx + 1))
          }
          img.src = u.toString() + (u.search ? `&t=${Date.now()}` : `?t=${Date.now()}`)
        } catch {
          resolve(false)
        }
      })
    }
    return tryPath(0)
  }

  return tryFetch().then(ok => (ok ? true : tryImages()))
}

export function usePdvStatus(baseUrl: string | null, refreshMs = 0) {
  const [status, setStatus] = useState<PdvStatus>('unknown')

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      if (!baseUrl) {
        setStatus('unknown')
        return
      }
      const ok = await pingPdv(baseUrl)
      if (!cancelled) setStatus(ok ? 'online' : 'offline')
    }
    check()
    let iv: any
    if (refreshMs && refreshMs > 0) {
      iv = setInterval(check, refreshMs)
    }
    return () => {
      cancelled = true
      if (iv) clearInterval(iv)
    }
  }, [baseUrl, refreshMs])

  return status
}
