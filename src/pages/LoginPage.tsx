import { useState } from 'react'
import { useAuth } from '@/app/AuthContext'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [nome, setNome] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const [senha, setSenha] = useState('')
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await login(nome, senha || undefined)
    navigate('/')
  }
  return (
    <section className="card max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <input className="field" placeholder="Nome do usuário" value={nome} onChange={e => setNome(e.target.value)} required />
        <input className="field" type="password" placeholder="Senha (obrigatória para admin)" value={senha} onChange={e => setSenha(e.target.value)} />
        <button type="submit" className="btn-primary">Entrar</button>
      </form>
    </section>
  )
}
