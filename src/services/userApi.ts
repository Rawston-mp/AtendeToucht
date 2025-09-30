// Simulação de API de usuários
type User = { nome: string, autorizacoes: string[], senha?: string }
const ADMIN_DEFAULT_PASSWORD = 'admin123'

let users: User[] = [
  { nome: 'admin', senha: ADMIN_DEFAULT_PASSWORD, autorizacoes: ['Acesso Admin', 'Cadastrar Usuários', 'Visualizar Produtos'] }
]

export function listarUsuarios() {
  return Promise.resolve(users)
}

export function cadastrarUsuario(usuario: { nome: string, autorizacoes: string[] }) {
  users.push(usuario)
  return Promise.resolve(usuario)
}

export function autenticar(nome: string, senha?: string) {
  const user = users.find(u => u.nome === nome)
  if (!user) return Promise.resolve(undefined)
  // Para o usuário admin exigimos senha; demais, opcional no mock
  if (user.nome === 'admin') {
    if (!senha) return Promise.resolve(undefined)
    if (user.senha && senha !== user.senha) return Promise.resolve(undefined)
  }
  return Promise.resolve(user)
}

export function verifyAdminPassword(senha: string) {
  const admin = users.find(u => u.nome === 'admin')
  if (!admin || !admin.senha) return Promise.resolve(false)
  return Promise.resolve(senha === admin.senha)
}
