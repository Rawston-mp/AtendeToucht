import { useEffect, useState } from 'react'

export type PdvStatus = 'unknown' | 'online' | 'offline'

export function pingPdv(baseUrl: string, timeoutMs = 1500): Promise<boolean> {
  return new Promise((resolve) => {
    if (!baseUrl) return resolve(false)
    try {
      const url = new URL(baseUrl)
      // tentar um asset público comum
      url.pathname = '/vite.svg'
      const img = new Image()
      const timer = setTimeout(() => {
        cleanup()
        resolve(false)
      }, timeoutMs)
      const cleanup = () => {
        clearTimeout(timer)
        img.onload = null
        img.onerror = null
      }
      img.onload = () => {
        cleanup()
        resolve(true)
      }
      img.onerror = () => {
        cleanup()
        resolve(false)
      }
      img.src = url.toString() + `?t=${Date.now()}`
    } catch {
      resolve(false)
    }
  })
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
