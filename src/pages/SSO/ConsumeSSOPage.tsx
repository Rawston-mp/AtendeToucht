import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/app/AuthContext'
import { cadastrarUsuario, listarUsuarios } from '@/services/userApi'

type TokenPayload = {
  sub: string
  role?: string
  exp?: number
}

function parseToken(b64: string): TokenPayload | null {
  try {
    const json = atob(b64)
    return JSON.parse(json)
  } catch {
    return null
  }
}

function mapRoleToAutorizacoes(role?: string): string[] {
  const r = (role || '').toUpperCase()
  if (r === 'ADMIN') return ['Acesso Admin', 'Cadastrar Usuários', 'Visualizar Produtos']
  if (r === 'GERENTE') return ['Acesso Admin', 'Visualizar Produtos']
  return ['Visualizar Produtos']
}

export function ConsumeSSOPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    (async () => {
      const token = params.get('token') || ''
      const redirect = params.get('redirect') || '/'

      const payload = parseToken(token)
      if (!payload || !payload.sub) {
        navigate('/login', { replace: true })
        return
      }
      if (payload.exp && Date.now() > payload.exp) {
        navigate('/login', { replace: true })
        return
      }

      const nome = payload.sub
      const autorizacoes = mapRoleToAutorizacoes(payload.role)

      const existing = (await listarUsuarios()).find(u => u.nome === nome)
      if (!existing) {
        await cadastrarUsuario({ nome, autorizacoes })
      }
      await login(nome)
      navigate(redirect, { replace: true })
    })()
  }, [login, navigate, params])

  return (
    <section className="card max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-2">Autenticando…</h2>
      <p className="text-slate-500 text-sm">Validando acesso e preparando sua sessão.</p>
    </section>
  )
}
