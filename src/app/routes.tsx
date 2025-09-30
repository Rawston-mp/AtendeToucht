import { UsuariosPage } from '@/pages/Cadastro/Usuarios/UsuariosPage'
import { ProtectedRoute } from './ProtectedRoute'
import { LoginPage } from '@/pages/LoginPage'
import { AcessoNegadoPage } from '@/pages/AcessoNegadoPage'
	
	<Route path="/cadastro/usuarios" element={
			<ProtectedRoute autorizacao="Acesso Admin">
				<UsuariosPage />
			</ProtectedRoute>
		} />
import { Routes, Route, Navigate } from 'react-router-dom'
import { ConsumeSSOPage } from '@/pages/SSO/ConsumeSSOPage'
import { DashboardPage } from '@/pages/Dashboard/DashboardPage'
import { ProdutosPage } from '@/pages/Cadastro/Produtos/ProdutosPage'
import { ClientesPage } from '@/pages/Cadastro/Clientes/ClientesPage'
import { FornecedoresPage } from '@/pages/Cadastro/Fornecedores/FornecedoresPage'
import { FabricantesPage } from '@/pages/Cadastro/Fabricantes/FabricantesPage'
import { TransportadorasPage } from '@/pages/Cadastro/Transportadoras/TransportadorasPage'
import { FuncionariosPage } from '@/pages/Cadastro/Funcionarios/FuncionariosPage'
import { ConvenioPage } from '@/pages/Cadastro/Convenio/ConvenioPage'
import { AdministradoraCartaoPage } from '@/pages/Cadastro/AdministradoraCartao/AdministradoraCartaoPage'
import { ConfiguracoesPage } from '@/pages/Cadastro/Configuracoes/ConfiguracoesPage'
import { ListaProdutosPage } from '@/pages/Estoque/ListaProdutosPage'
import { EntradaManualPage } from '@/pages/Estoque/EntradaManualPage'
import { ImportarXMLPage } from '@/pages/Estoque/ImportarXMLPage'
import { FiadoPage } from '@/pages/Financeiro/FiadoPage'
import { ReceitasPage } from '@/pages/Financeiro/ReceitasPage'
import { DespesasPage } from '@/pages/Financeiro/DespesasPage'
import { ContaCorrentePage } from '@/pages/Financeiro/ContaCorrentePage'
import { FechamentoDiaPage } from '@/pages/Vendas/FechamentoDiaPage'
import { FechamentoMesPage } from '@/pages/Vendas/FechamentoMesPage'
import { FechamentosRelPage } from '@/pages/Relatorios/FechamentosRelPage'


export function AppRoutes() {
return (
<Routes>
<Route path="/" element={<DashboardPage />} />
	<Route path="/cadastro/produtos" element={
			<ProtectedRoute autorizacao="Visualizar Produtos">
				<ProdutosPage />
			</ProtectedRoute>
		} />
	<Route path="/login" element={<LoginPage />} />
	<Route path="/acesso-negado" element={<AcessoNegadoPage />} />
	<Route path="/cadastro/clientes" element={<ClientesPage />} />
	<Route path="/cadastro/fornecedores" element={<FornecedoresPage />} />
	<Route path="/cadastro/fabricantes" element={<FabricantesPage />} />
	<Route path="/cadastro/transportadoras" element={<TransportadorasPage />} />
	<Route path="/cadastro/funcionarios" element={<FuncionariosPage />} />
	<Route path="/cadastro/convenio" element={<ConvenioPage />} />
	<Route path="/cadastro/administradora-cartao" element={<AdministradoraCartaoPage />} />
	<Route path="/cadastro/configuracoes" element={
			<ProtectedRoute autorizacao="Acesso Admin">
				<ConfiguracoesPage />
			</ProtectedRoute>
		} />


<Route path="/estoque" element={<ListaProdutosPage />} />
<Route path="/estoque/entrada-manual" element={<EntradaManualPage />} />
<Route path="/estoque/importar-xml" element={<ImportarXMLPage />} />


<Route path="/financeiro/fiado" element={<FiadoPage />} />
<Route path="/financeiro/receitas" element={<ReceitasPage />} />
<Route path="/financeiro/despesas" element={<DespesasPage />} />
<Route path="/financeiro/conta-corrente" element={<ContaCorrentePage />} />


<Route path="/vendas/fechamento-dia" element={<FechamentoDiaPage />} />
<Route path="/vendas/fechamento-mes" element={<FechamentoMesPage />} />


<Route path="/relatorios/fechamentos" element={<FechamentosRelPage />} />

<Route path="/sso/consume" element={<ConsumeSSOPage />} />


<Route path="*" element={<Navigate to="/" replace />} />
</Routes>
)
}