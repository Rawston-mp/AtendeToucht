import { createContext, useContext, useState, ReactNode } from 'react'
import { autenticar } from '@/services/userApi'

interface User {
  nome: string
  autorizacoes: string[]
}

interface AuthContextType {
  user: User | null
  login: (nome: string, senha?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  async function login(nome: string, senha?: string) {
    const u = await autenticar(nome, senha)
    setUser(u || null)
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
