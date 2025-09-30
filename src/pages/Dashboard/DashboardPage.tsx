import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const vendasPorPagamento = {
	labels: ['Dinheiro', 'Fiado'],
	datasets: [
		{
			label: 'Vendas',
			data: [96.6, 3.4],
			backgroundColor: ['#2563eb', '#f43f5e'],
			borderWidth: 1,
		},
	],
}

export function DashboardPage() {
	return (
		<section className="grid gap-4">
			<h2 className="text-xl font-semibold">Dashboard</h2>
			<div className="grid md:grid-cols-3 gap-4">
				<div className="card">
					<div className="text-slate-500 text-sm">Vendas do dia</div>
					<div className="text-2xl font-semibold">R$ 0,00</div>
				</div>
				<div className="card">
					<div className="text-slate-500 text-sm">Títulos em aberto</div>
					<div className="text-2xl font-semibold">R$ 0,00</div>
				</div>
				<div className="card">
					<div className="text-slate-500 text-sm">Estoque baixo</div>
					<div className="text-2xl font-semibold">0</div>
				</div>
			</div>
					<div className="card mt-6 max-w-xl">
						<h3 className="text-lg font-semibold mb-2">Vendas por forma pagamento</h3>
						<div style={{ width: 300, height: 300, margin: '0 auto' }}>
							<Pie data={vendasPorPagamento} />
						</div>
					</div>
		</section>
	)
}