export function ImportarXMLPage() {
return (
<section className="card grid gap-4 max-w-2xl">
<h2 className="text-xl font-semibold">Importar XML da NF-e</h2>
<input type="file" accept=".xml" />
<p className="text-sm text-slate-500">Selecione o arquivo XML. O sistema exibirá um espelho para conferência.</p>
<div className="flex justify-end">
<button className="btn-primary">Processar</button>
</div>
</section>
)
}