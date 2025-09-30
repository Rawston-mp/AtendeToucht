import { useState } from 'react'
import { getPdvBaseUrl, setPdvBaseUrl } from '@/services/pdvConfig'
import { useOpenPDV } from '@/services/ssoToPDV'
import { usePdvStatus } from '@/services/pdvHealth'

export function ConfiguracoesPage() {
  const [url, setUrl] = useState<string>(getPdvBaseUrl() || '')
  const openPDV = useOpenPDV()
  const conectado = !!url.trim()
  const status = usePdvStatus(conectado ? url : null, 5000)

  const salvar = () => {
    setPdvBaseUrl(url)
    alert('URL do PDV salva!')
  }

  return (
    <section className="grid gap-4 max-w-2xl">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Configurações</h2>
        {conectado ? (
          status === 'online' ? (
            <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 border border-emerald-300">Conectado ao PDV</span>
          ) : status === 'offline' ? (
            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700 border border-amber-300" title="PDV não respondeu ao ping">PDV indisponível</span>
          ) : (
            <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600 border">Verificando PDV…</span>
          )
        ) : (
          <span className="px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600 border">PDV não configurado</span>
        )}
      </div>

      <div className="card p-4">
        <label className="block text-sm text-slate-600 mb-1">URL do PDV</label>
        <input
          className="input w-full"
          placeholder="http://localhost:5173"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="mt-3 flex gap-2">
          <button className="btn" onClick={salvar}>Salvar</button>
          <button className="btn-ghost" onClick={() => setUrl(getPdvBaseUrl() || '')}>Recarregar</button>
        </div>
      </div>

      <div className="card p-4">
        <div className="text-sm text-slate-600 mb-2">Ações rápidas</div>
        <div className="flex flex-wrap gap-2">
          <button
            className="btn"
            disabled={!conectado}
            title={conectado ? 'Abrir PDV em /venda' : 'Configure a URL do PDV primeiro'}
            onClick={() => openPDV('/venda')}
          >
            Abrir PDV (Vendas)
          </button>
          <button
            className="btn"
            disabled={!conectado}
            title={conectado ? 'Abrir PDV em /finalizacao' : 'Configure a URL do PDV primeiro'}
            onClick={() => openPDV('/finalizacao')}
          >
            Abrir PDV (Caixa/Finalização)
          </button>
        </div>
      </div>
    </section>
  )
}
