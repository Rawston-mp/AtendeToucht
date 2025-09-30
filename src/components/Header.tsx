import { getPdvBaseUrl } from '@/services/pdvConfig'
import { useOpenPDV } from '@/services/ssoToPDV'

export function Header({ onMenu }: { onMenu: () => void }) {
const openPDV = useOpenPDV()
const conectado = !!getPdvBaseUrl()
return (
<header className="h-16 flex items-center gap-3 px-4 border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
<button className="btn-ghost" aria-label="Menu" onClick={onMenu}>☰</button>
<h1 className="font-semibold">AtendeToucht</h1>
<div className="ml-auto flex items-center gap-2">
{conectado ? (
	<span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 border border-emerald-300">Conectado ao PDV</span>
) : (
	<span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600 border" title="Configure a URL do PDV em Configurações">PDV não configurado</span>
)}
<button className="btn" disabled={!conectado} title={conectado ? 'Abrir PDV em /venda' : 'Configure a URL do PDV em Configurações'} onClick={() => openPDV('/venda')}>Abrir PDV (Vendas)</button>
<button className="btn" disabled={!conectado} title={conectado ? 'Abrir PDV em /finalizacao' : 'Configure a URL do PDV em Configurações'} onClick={() => openPDV('/finalizacao')}>Abrir PDV (Finalização)</button>
<input className="rounded-xl border px-3 py-2" placeholder="Buscar" />
<button className="btn-ghost" aria-label="Notificações">🔔</button>
</div>
</header>
)
}