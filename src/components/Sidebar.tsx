		// ...existing code...
import { NavLink } from 'react-router-dom'


const base = 'block px-4 py-2 rounded-xl hover:bg-brand/10'
const active = 'bg-brand/15 text-brand'


export function Sidebar({ onNavigate }: { onNavigate: () => void }) {
const Item = ({ to, children }: any) => (
<NavLink to={to} className={({ isActive }) => `${base} ${isActive ? active : ''}`} onClick={onNavigate}>
{children}
</NavLink>
)
return (
<nav className="p-4 space-y-1">
		<Item to="/">Dashboard</Item>
		<div className="mt-4 mb-2 text-xs uppercase text-slate-400">Cadastros</div>
		<div className="mb-2 text-xs text-slate-400">Cadastros básicos</div>
		<Item to="/cadastro/produtos"><span className="font-semibold italic">Produtos</span></Item>
		<Item to="/cadastro/clientes">Clientes</Item>
		<Item to="/cadastro/fornecedores">Fornecedores</Item>
		<Item to="/cadastro/fabricantes">Fabricantes</Item>
		<Item to="/cadastro/transportadoras">Transportadoras</Item>
		<Item to="/cadastro/funcionarios">Funcionários</Item>
		<Item to="/cadastro/convenio">Convênio</Item>
		<Item to="/cadastro/administradora-cartao">Administradora cartão</Item>
		<Item to="/cadastro/configuracoes">Configurações</Item>
<div className="mt-4 mb-2 text-xs uppercase text-slate-400">Estoque</div>
<Item to="/estoque">Produtos</Item>
<Item to="/estoque/entrada-manual">Entrada manual</Item>
<Item to="/estoque/importar-xml">Importar XML</Item>


<div className="mt-4 mb-2 text-xs uppercase text-slate-400">Financeiro</div>
<Item to="/financeiro/fiado">Fiado</Item>
<Item to="/financeiro/receitas">Receitas</Item>
<Item to="/financeiro/despesas">Despesas</Item>
<Item to="/financeiro/conta-corrente">Conta corrente</Item>


<div className="mt-4 mb-2 text-xs uppercase text-slate-400">Vendas</div>
<Item to="/vendas/fechamento-dia">Fechamento do dia</Item>
<Item to="/vendas/fechamento-mes">Fechamento do mês</Item>


<div className="mt-4 mb-2 text-xs uppercase text-slate-400">Relatórios</div>
<Item to="/relatorios/fechamentos">Relatório de fechamentos</Item>
</nav>
)
}