import { Produto, Titulo, FechamentoDia } from '@/types/domain'


export const produtosMock: Produto[] = [
{ id: '1', sku: 'SELF_SERVICE', descricao: 'Self service por quilo', unidade: 'KG', preco: 59.9 },
{ id: '2', sku: 'REFRI_LATA', descricao: 'Refrigerante lata', unidade: 'UN', preco: 6.0 }
]


export const titulosMock: Titulo[] = [
{ id: 't1', cliente: 'Ana Paula', documento: '000123', vencimento: '2025-09-12', valor: 240, status: 'aberto' }
]


export const fechamentoDiaMock: FechamentoDia = {
data: '2025-09-12', recebidoVendas: 128.6, suprimentos: 0, sangrias: 0, saldoEmDinheiro: 128.6
}