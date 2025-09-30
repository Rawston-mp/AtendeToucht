export const PDV_URL_KEY = 'pdv.baseUrl'

export function getPdvBaseUrl(): string | null {
  try {
    const v = localStorage.getItem(PDV_URL_KEY)
    return v && v.trim() ? v.trim() : null
  } catch {
    return null
  }
}

export function setPdvBaseUrl(url: string) {
  const v = (url || '').trim()
  if (!v) {
    localStorage.removeItem(PDV_URL_KEY)
  } else {
    localStorage.setItem(PDV_URL_KEY, v)
  }
  // Notificar outras abas/componentes
  try {
    window.dispatchEvent(new StorageEvent('storage', { key: PDV_URL_KEY, newValue: v }))
  } catch {
    /* noop */
  }
}

// Hook utilitário para refletir mudanças de storage
import { useEffect, useState } from 'react'
export function usePdvBaseUrl() {
  const [url, setUrl] = useState<string | null>(() => getPdvBaseUrl())

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key === PDV_URL_KEY) {
        setUrl(getPdvBaseUrl())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return [url, setPdvBaseUrl] as const
}
