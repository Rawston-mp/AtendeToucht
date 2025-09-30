export function FechamentosRelPage() {
return (
<section className="card grid gap-4">
<h2 className="text-xl font-semibold">Relatório de fechamentos</h2>
<div className="grid md:grid-cols-4 gap-3">
<div className="field"><label>Período inicial</label><input type="date" /></div>
<div className="field"><label>Período final</label><input type="date" /></div>
<div className="field"><label>PDV</label><input placeholder="001" /></div>
<div className="flex items-end justify-end"><button className="btn-primary">Gerar</button></div>
</div>
<div className="overflow-auto">
<table className="table min-w-[720px]">
<thead><tr><th>Data</th><th>Recebido vendas</th><th>Suprimentos</th><th>Sangrias</th><th>Saldo</th></tr></thead>
<tbody>
<tr><td>12 set</td><td>R$ 128,60</td><td>R$ 0,00</td><td>R$ 0,00</td><td>R$ 128,60</td></tr>
</tbody>
</table>
</div>
</section>
)
}