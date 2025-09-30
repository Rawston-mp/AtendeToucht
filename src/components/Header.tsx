export function Header({ onMenu }: { onMenu: () => void }) {
return (
<header className="h-16 flex items-center gap-3 px-4 border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
<button className="btn-ghost" aria-label="Menu" onClick={onMenu}>☰</button>
<h1 className="font-semibold">AtendeToucht</h1>
<div className="ml-auto flex items-center gap-2">
<input className="rounded-xl border px-3 py-2" placeholder="Buscar" />
<button className="btn-ghost" aria-label="Notificações">🔔</button>
</div>
</header>
)
}