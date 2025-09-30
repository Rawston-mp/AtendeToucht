import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export function ProtectedRoute({ children, autorizacao }: { children: JSX.Element, autorizacao: string }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!user.autorizacoes.includes(autorizacao)) return <Navigate to="/acesso-negado" replace />
  return children
}
