import { getPdvBaseUrl } from './pdvConfig'
import { useAuth } from '@/app/AuthContext'

export type PdvRole = 'ADMIN' | 'GERENTE' | 'CAIXA' | 'BALANÇA A' | 'BALANÇA B' | 'ATENDENTE'

export function mapToPdvRole(autorizacoes: string[] | undefined): PdvRole {
  const auth = (autorizacoes || []).map(a => a.toUpperCase())
  if (auth.includes('ACESSO ADMIN')) return 'ADMIN'
  if (auth.includes('GERENTE')) return 'GERENTE'
  if (auth.includes('CAIXA')) return 'CAIXA'
  if (auth.includes('BALANÇA A')) return 'BALANÇA A'
  if (auth.includes('BALANÇA B')) return 'BALANÇA B'
  return 'ATENDENTE'
}

export function buildToken(sub: string, role: PdvRole) {
  const payload = {
    sub,
    role,
    exp: Date.now() + 2 * 60 * 1000,
  }
  return btoa(JSON.stringify(payload))
}

export function buildPdvSsoUrl(baseUrl: string, token: string, redirect: '/venda' | '/finalizacao') {
  const u = new URL(baseUrl)
  u.pathname = '/sso/consume'
  u.searchParams.set('token', token)
  u.searchParams.set('redirect', redirect)
  return u.toString()
}

export function useOpenPDV() {
  const { user } = useAuth()
  return (redirect: '/venda' | '/finalizacao') => {
    const base = getPdvBaseUrl()
    if (!base) throw new Error('URL do PDV não configurada')
    const sub = user?.nome || 'guest'
    const role = mapToPdvRole(user?.autorizacoes)
    const token = buildToken(sub, role)
    const url = buildPdvSsoUrl(base, token, redirect)
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
