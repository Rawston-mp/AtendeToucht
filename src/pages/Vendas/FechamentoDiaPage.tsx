import { fechamentoDiaMock } from '@/services/mocks'
export function FechamentoDiaPage() {
const f = fechamentoDiaMock
return (
<section className="grid gap-4">
<h2 className="text-xl font-semibold">Fechamento do dia</h2>
<div className="grid md:grid-cols-3 gap-4">
<div className="card"><div className="text-slate-500 text-sm">Recebido em vendas</div><div className="text-2xl font-semibold">R$ {f.recebidoVendas.toFixed(2)}</div></div>
<div className="card"><div className="text-slate-500 text-sm">Sangrias</div><div className="text-2xl font-semibold">R$ {f.sangrias.toFixed(2)}</div></div>
<div className="card"><div className="text-slate-500 text-sm">Saldo em dinheiro</div><div className="text-2xl font-semibold">R$ {f.saldoEmDinheiro.toFixed(2)}</div></div>
</div>
</section>
)
}