import { rotuloCategoria, type Transacao } from '../tipos'
import { formatarReais } from '../utils/formatar'

type Props = {
  transacoes: Transacao[]
  idEmEdicao: string | null
  onEditar: (id: string) => void
  onRemover: (id: string) => void
}

export function ListaTransacoes({ transacoes, idEmEdicao, onEditar, onRemover }: Props) {
  if (transacoes.length === 0) {
    return (
      <p className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-sm">
        Nenhuma transação encontrada com esses filtros.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {transacoes.map((t) => {
        const ehReceita = t.tipo === 'receita'
        return (
          <li
            key={t.id}
            className={`flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-2 ${
              idEmEdicao === t.id ? 'ring-amber-400' : 'ring-transparent'
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-slate-800">{t.descricao}</p>
              <span className="rounded bg-slate-100 px-2 text-xs text-slate-600">
                {rotuloCategoria(t.categoria)}
              </span>
            </div>

            <span
              className={`font-semibold whitespace-nowrap ${
                ehReceita ? 'text-emerald-700' : 'text-red-600'
              }`}
            >
              {ehReceita ? '+ ' : '− '}
              {formatarReais(t.valor)}
            </span>

            <button
              type="button"
              onClick={() => onEditar(t.id)}
              aria-label={`Editar ${t.descricao}`}
              className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-amber-600"
            >
              ✎
            </button>
            <button
              type="button"
              onClick={() => onRemover(t.id)}
              aria-label={`Remover ${t.descricao}`}
              className="rounded p-1 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              ✕
            </button>
          </li>
        )
      })}
    </ul>
  )
}
