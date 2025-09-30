import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { PropsWithChildren, useState } from 'react'


export function AppShell({ children }: PropsWithChildren) {
const [open, setOpen] = useState(true)
return (
<div className="min-h-dvh grid grid-cols-1 lg:grid-cols-[260px,1fr]">
<aside className={`${open ? 'block' : 'hidden'} lg:block bg-white/80 dark:bg-slate-800/80 backdrop-blur border-r border-slate-200 dark:border-slate-700`}>
<Sidebar onNavigate={() => setOpen(false)} />
</aside>
<div className="grid grid-rows-[64px,1fr]">
<Header onMenu={() => setOpen(v => !v)} />
<main className="container-page">{children}</main>
</div>
</div>
)
}