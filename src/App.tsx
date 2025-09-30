import { AppShell } from '@/components/AppShell'
import { AppRoutes } from '@/app/routes'
import { AuthProvider } from '@/app/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </AuthProvider>
  )
}
