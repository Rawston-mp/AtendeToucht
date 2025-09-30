export function EntradaManualPage() {
return (
<form className="card grid gap-4 max-w-2xl">
<h2 className="text-xl font-semibold">Entrada manual de nota</h2>
<div className="field"><label>Número</label><input placeholder="000123" /></div>
<div className="field"><label>Fornecedor</label><input placeholder="Nome ou CNPJ" /></div>
<div className="field"><label>Emissão</label><input type="date" /></div>
<div className="field"><label>CFOP</label><input placeholder="1102" /></div>
<div className="flex gap-2 justify-end">
<button className="btn-ghost" type="button">Cancelar</button>
<button className="btn-primary" type="submit">Salvar</button>
</div>
</form>
)
}