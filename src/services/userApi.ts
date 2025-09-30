// Simulação de API de usuários
let users = [
  { nome: 'admin', autorizacoes: ['Acesso Admin', 'Cadastrar Usuários', 'Visualizar Produtos'] }
]

export function listarUsuarios() {
  return Promise.resolve(users)
}

export function cadastrarUsuario(usuario: { nome: string, autorizacoes: string[] }) {
  users.push(usuario)
  return Promise.resolve(usuario)
}

export function autenticar(nome: string) {
  const user = users.find(u => u.nome === nome)
  return Promise.resolve(user)
}
