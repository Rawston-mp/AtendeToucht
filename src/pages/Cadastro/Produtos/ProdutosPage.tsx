
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogTrigger, DialogContent, DialogClose } from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  descricao: z.string().min(3, 'Descrição obrigatória'),
  codigoBarras: z.string().optional(),
  referencia: z.string().optional(),
  fabricante: z.string().optional(),
  categoria: z.string().optional(),
  grupo: z.string().optional(),
  subgrupo: z.string().optional(),
  status: z.enum(['Ativo', 'Inativo']),
})
type FormData = z.infer<typeof schema>

export function ProdutosPage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'Ativo' }
  })

  function onSubmit(data: FormData) {
    // Simulação de integração com API
    setTimeout(() => {
      alert('Produto cadastrado!')
      setOpen(false)
      reset()
      navigate('/cadastro/produtos')
    }, 500)
  }

  return (
    <section className="card p-4 space-y-4">
      <form className="grid grid-cols-12 gap-2 items-end">
        <input className="col-span-1 field" placeholder="#Id:" />
        <input className="col-span-2 field" placeholder="Código de barras:" />
        <input className="col-span-3 field" placeholder="Descrição do produto: Digite a descrição do produto para pesquisa" />
        <select className="col-span-1 field"><option>Ativo</option><option>Inativo</option></select>
        <input className="col-span-2 field" placeholder="Referência:" />
        <input className="col-span-2 field" placeholder="Fabricante:" />
        <input className="col-span-2 field" placeholder="Categoria:" />
        <select className="col-span-1 field"><option>Complemento</option></select>
        <input className="col-span-2 field" placeholder="Grupo:" />
        <select className="col-span-2 field"><option>SubGrupo</option></select>
        <select className="col-span-2 field"><option>Mostrar produtos</option></select>
        <button type="submit" className="btn-primary col-span-1">Buscar</button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button type="button" className="btn-primary col-span-2 ml-2">Novo Cadastro</button>
          </DialogTrigger>
          <DialogContent className="card max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Novo Produto</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
              <input {...register('descricao')} placeholder="Descrição" className="field" />
              {errors.descricao && <span className="text-red-500 text-sm">{errors.descricao.message}</span>}
              <input {...register('codigoBarras')} placeholder="Código de barras" className="field" />
              <input {...register('referencia')} placeholder="Referência" className="field" />
              <input {...register('fabricante')} placeholder="Fabricante" className="field" />
              <input {...register('categoria')} placeholder="Categoria" className="field" />
              <input {...register('grupo')} placeholder="Grupo" className="field" />
              <input {...register('subgrupo')} placeholder="SubGrupo" className="field" />
              <select {...register('status')} className="field">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
              <div className="flex gap-2 justify-end mt-2">
                <DialogClose asChild>
                  <button type="button" className="btn-ghost">Cancelar</button>
                </DialogClose>
                <button type="submit" className="btn-primary">Salvar</button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </form>
    </section>
  )
}
