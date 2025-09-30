export type Produto = { id: string; sku: string; descricao: string; unidade: string; preco: number }
export type Titulo = { id: string; cliente?: string; documento?: string; vencimento?: string; valor: number; status: 'aberto' | 'pago' | 'vencido' }
export type FechamentoDia = { data: string; recebidoVendas: number; suprimentos: number; sangrias: number; saldoEmDinheiro: number }