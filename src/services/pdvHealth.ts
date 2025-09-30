import { useEffect, useState } from 'react'

export type PdvStatus = 'unknown' | 'online' | 'offline'

export function pingPdv(baseUrl: string, timeoutMs = 1500): Promise<boolean> {
  const paths = ['/vite.svg', '/favicon.ico', '/']
  const tryPath = (idx: number): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!baseUrl) return resolve(false)
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
          // tenta o próximo caminho
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
