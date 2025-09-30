import { titulosMock } from '@/services/mocks'
export function FiadoPage() {
return (
<section className="space-y-4">
<h2 className="text-xl font-semibold">Fiado</h2>
<div className="card overflow-auto">
<table className="table min-w-[720px]">
<thead><tr><th>Cliente</th><th>Documento</th><th>Vencimento</th><th>Valor</th><th>Status</th><th>Ações</th></tr></thead>
<tbody>
{titulosMock.map(t => (
<tr key={t.id}>
<td>{t.cliente}</td>
<td>{t.documento}</td>
<td>{t.vencimento}</td>
<td>R$ {t.valor.toFixed(2)}</td>
<td>{t.status}</td>
<td><button className="btn-ghost">Receber</button></td>
</tr>
))}
</tbody>
</table>
</div>
</section>
)
}