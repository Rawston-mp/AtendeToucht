import { produtosMock } from '@/services/mocks'
export function ListaProdutosPage() {
return (
<section className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-xl font-semibold">Produtos</h2>
<div className="flex gap-2">
<button className="btn-ghost">Importar CSV</button>
<button className="btn-primary">Novo produto</button>
</div>
</div>
<div className="card overflow-auto">
<table className="table min-w-[720px]">
<thead><tr><th>SKU</th><th>Descrição</th><th>Unidade</th><th>Preço</th></tr></thead>
<tbody>
{produtosMock.map(p => (
<tr key={p.id}>
<td>{p.sku}</td>
<td>{p.descricao}</td>
<td>{p.unidade}</td>
<td>R$ {p.preco.toFixed(2)}</td>
</tr>
))}
</tbody>
</table>
</div>
</section>
)
}