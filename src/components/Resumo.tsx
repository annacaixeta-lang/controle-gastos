import { formatarReais } from '../utils/formatar'

type Props = {
  receitas: number
  despesas: number
  saldo: number
}

export function Resumo({ receitas, despesas, saldo }: Props) {
  const corSaldo = saldo < 0 ? 'text-red-600' : 'text-emerald-700'

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">Receitas</p>
        <p className="text-xl font-bold text-emerald-700">{formatarReais(receitas)}</p>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">Despesas</p>
        <p className="text-xl font-bold text-red-600">{formatarReais(despesas)}</p>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">Saldo</p>
        <p className={`text-xl font-bold ${corSaldo}`}>{formatarReais(saldo)}</p>
      </div>
    </section>
  )
}
