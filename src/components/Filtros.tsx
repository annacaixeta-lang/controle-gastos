import type { ReactNode } from 'react'
import { CATEGORIAS, type FiltroCategoria, type FiltroTipo } from '../tipos'

type Props = {
  filtroTipo: FiltroTipo
  onMudarTipo: (filtro: FiltroTipo) => void
  filtroCategoria: FiltroCategoria
  onMudarCategoria: (filtro: FiltroCategoria) => void
}

function Pilula({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`rounded-full px-3 py-1 text-sm transition ${
        ativo ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
      }`}
    >
      {children}
    </button>
  )
}

const TIPOS: { valor: FiltroTipo; rotulo: string }[] = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'receita', rotulo: 'Receitas' },
  { valor: 'despesa', rotulo: 'Despesas' },
]

export function Filtros({ filtroTipo, onMudarTipo, filtroCategoria, onMudarCategoria }: Props) {
  return (
    <section className="space-y-2 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 text-sm font-medium text-slate-500">Tipo:</span>
        {TIPOS.map((t) => (
          <Pilula key={t.valor} ativo={filtroTipo === t.valor} onClick={() => onMudarTipo(t.valor)}>
            {t.rotulo}
          </Pilula>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="w-20 text-sm font-medium text-slate-500">Categoria:</span>
        <Pilula ativo={filtroCategoria === 'todas'} onClick={() => onMudarCategoria('todas')}>
          Todas
        </Pilula>
        {CATEGORIAS.map((c) => (
          <Pilula
            key={c.valor}
            ativo={filtroCategoria === c.valor}
            onClick={() => onMudarCategoria(c.valor)}
          >
            {c.rotulo}
          </Pilula>
        ))}
      </div>
    </section>
  )
}
