import { useState, useEffect } from 'react'
import { listarUsuarios, cadastrarUsuario } from '@/services/userApi'

const autorizacoes = [
  'Visualizar Produtos',
  'Cadastrar Produtos',
  'Visualizar Clientes',
  'Cadastrar Clientes',
  'Visualizar Financeiro',
  'Cadastrar Financeiro',
  'Visualizar Relatórios',
  'Acesso Admin'
]

export function UsuariosPage() {
  const [usuario, setUsuario] = useState('')
  const [aut, setAut] = useState<string[]>([])
  const [usuarios, setUsuarios] = useState<{nome: string, autorizacoes: string[]}[]>([])

  useEffect(() => {
    listarUsuarios().then(setUsuarios)
  }, [])

  function handleCheck(autorizacao: string) {
    setAut(a => a.includes(autorizacao) ? a.filter(x => x !== autorizacao) : [...a, autorizacao])
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    cadastrarUsuario({ nome: usuario, autorizacoes: aut }).then(() => {
      listarUsuarios().then(setUsuarios)
      setUsuario('')
      setAut([])
    })
  }

  return (
    <section className="card max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Cadastro de Usuários</h2>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <input className="field" placeholder="Nome do usuário" value={usuario} onChange={e => setUsuario(e.target.value)} required />
        <div className="grid gap-2">
          <label className="font-semibold">Autorizações:</label>
          {autorizacoes.map(a => (
            <label key={a} className="flex items-center gap-2">
              <input type="checkbox" checked={aut.includes(a)} onChange={() => handleCheck(a)} />
              {a}
            </label>
          ))}
        </div>
        <div className="flex gap-2 justify-end mt-2">
          <button type="submit" className="btn-primary">Cadastrar</button>
        </div>
      </form>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Usuários cadastrados</h3>
        <table className="table">
          <thead><tr><th>Nome</th><th>Autorizações</th></tr></thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.nome}>
                <td>{u.nome}</td>
                <td>{u.autorizacoes.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
