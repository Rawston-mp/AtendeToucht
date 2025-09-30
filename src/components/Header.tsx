import { getPdvBaseUrl } from '@/services/pdvConfig'
import { useOpenPDV } from '@/services/ssoToPDV'
import { usePdvStatus } from '@/services/pdvHealth'

export function Header({ onMenu }: { onMenu: () => void }) {
const openPDV = useOpenPDV()
const base = getPdvBaseUrl()
const conectado = !!base
const status = usePdvStatus(base, 10000)
return (
<header className="h-16 flex items-center gap-3 px-4 border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
<button className="btn-ghost" aria-label="Menu" onClick={onMenu}>☰</button>
<h1 className="font-semibold">AtendeToucht</h1>
<div className="ml-auto flex items-center gap-2">
{conectado ? (
	status === 'online' ? (
		<span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 border border-emerald-300">Conectado ao PDV</span>
	) : status === 'offline' ? (
		<span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700 border border-amber-300" title="PDV não respondeu ao ping">PDV indisponível</span>
	) : (
		<span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600 border">Verificando PDV…</span>
	)
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