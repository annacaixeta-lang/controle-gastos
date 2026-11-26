import { useState } from 'react'
import { FormTransacao } from './components/FormTransacao'
import { Resumo } from './components/Resumo'
import { Filtros } from './components/Filtros'
import { ListaTransacoes } from './components/ListaTransacoes'
import type { DadosTransacao, FiltroCategoria, FiltroTipo, Transacao } from './tipos'

const INICIAIS: Transacao[] = [
  { id: crypto.randomUUID(), descricao: 'Bolsa de estágio', valor: 1200, categoria: 'salario', tipo: 'receita' },
  { id: crypto.randomUUID(), descricao: 'Passe de ônibus', valor: 220, categoria: 'transporte', tipo: 'despesa' },
  { id: crypto.randomUUID(), descricao: 'Lanche cantina', valor: 25.5, categoria: 'lanche', tipo: 'despesa' },
]

export default function App() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(INICIAIS)
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>('todos')
  const [filtroCategoria, setFiltroCategoria] = useState<FiltroCategoria>('todas')
  const [idEmEdicao, setIdEmEdicao] = useState<string | null>(null)

  function adicionar(dados: DadosTransacao) {
    setTransacoes((lista) => [...lista, { ...dados, id: crypto.randomUUID() }])
  }

  function editar(id: string, dados: DadosTransacao) {
    setTransacoes((lista) => lista.map((t) => (t.id === id ? { ...t, ...dados } : t)))
  }

  function remover(id: string) {
    setTransacoes((lista) => lista.filter((t) => t.id !== id))
    if (idEmEdicao === id) setIdEmEdicao(null)
  }

  function salvar(dados: DadosTransacao) {
    if (idEmEdicao) {
      editar(idEmEdicao, dados)
      setIdEmEdicao(null)
    } else {
      adicionar(dados)
    }
  }

  const receitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((soma, t) => soma + t.valor, 0)
  const despesas = transacoes
    .filter((t) => t.tipo === 'despesa')
    .reduce((soma, t) => soma + t.valor, 0)
  const saldo = receitas - despesas

  const visiveis = transacoes.filter(
    (t) =>
      (filtroTipo === 'todos' || t.tipo === filtroTipo) &&
      (filtroCategoria === 'todas' || t.categoria === filtroCategoria),
  )

  const transacaoEmEdicao = transacoes.find((t) => t.id === idEmEdicao) ?? null

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-5xl space-y-4 p-4 sm:p-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-800">Controle de Gastos</h1>
          <p className="text-slate-500">Receitas e despesas do mês</p>
        </header>

        <Resumo receitas={receitas} despesas={despesas} saldo={saldo} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[320px_1fr]">
          <aside className="md:sticky md:top-6 md:self-start">
            <FormTransacao
              key={idEmEdicao ?? 'nova'}
              transacaoEmEdicao={transacaoEmEdicao}
              onSalvar={salvar}
              onCancelarEdicao={() => setIdEmEdicao(null)}
            />
          </aside>

          <section className="space-y-4">
            <Filtros
              filtroTipo={filtroTipo}
              onMudarTipo={setFiltroTipo}
              filtroCategoria={filtroCategoria}
              onMudarCategoria={setFiltroCategoria}
            />
            <ListaTransacoes
              transacoes={visiveis}
              idEmEdicao={idEmEdicao}
              onEditar={setIdEmEdicao}
              onRemover={remover}
            />
          </section>
        </div>
      </main>
    </div>
  )
}
