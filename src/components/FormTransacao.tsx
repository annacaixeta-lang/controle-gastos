import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  CATEGORIAS,
  type Categoria,
  type DadosTransacao,
  type TipoTransacao,
  type Transacao,
} from '../tipos'

type Props = {
  transacaoEmEdicao: Transacao | null
  onSalvar: (dados: DadosTransacao) => void
  onCancelarEdicao: () => void
}

type Erros = { descricao?: string; valor?: string }

function lerValor(texto: string): number {
  return Number(texto.replace(',', '.'))
}

function validar(descricao: string, valorTexto: string): Erros {
  const erros: Erros = {}
  if (descricao.trim().length < 3) {
    erros.descricao = 'A descrição precisa ter pelo menos 3 letras.'
  }
  const valor = lerValor(valorTexto)
  if (valorTexto.trim() === '' || Number.isNaN(valor) || valor <= 0) {
    erros.valor = 'Informe um valor maior que zero.'
  }
  return erros
}

export function FormTransacao({ transacaoEmEdicao, onSalvar, onCancelarEdicao }: Props) {
  const [descricao, setDescricao] = useState(transacaoEmEdicao?.descricao ?? '')
  const [valorTexto, setValorTexto] = useState(
    transacaoEmEdicao ? transacaoEmEdicao.valor.toFixed(2).replace('.', ',') : '',
  )
  const [categoria, setCategoria] = useState<Categoria>(
    transacaoEmEdicao?.categoria ?? 'lanche',
  )
  const [tipo, setTipo] = useState<TipoTransacao>(transacaoEmEdicao?.tipo ?? 'despesa')
  const [tentouEnviar, setTentouEnviar] = useState(false)

  const erros = validar(descricao, valorTexto)
  const temErros = Object.keys(erros).length > 0
  const editando = transacaoEmEdicao !== null

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTentouEnviar(true)
    if (temErros) return

    onSalvar({
      descricao: descricao.trim(),
      valor: lerValor(valorTexto),
      categoria,
      tipo,
    })

    setDescricao('')
    setValorTexto('')
    setTentouEnviar(false)
  }

  function handleTipo(e: ChangeEvent<HTMLInputElement>) {
    setTipo(e.target.value as TipoTransacao)
  }

  const classeCampo = (comErro: boolean) =>
    `w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
      comErro
        ? 'border-red-400 focus:ring-red-300'
        : 'border-slate-300 focus:ring-emerald-300'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-2xl bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-800">
        {editando ? 'Editar transação' : 'Nova transação'}
      </h2>

      <div>
        <label htmlFor="descricao" className="mb-1 block text-sm font-medium text-slate-600">
          Descrição
        </label>
        <input
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Ex.: Passe de ônibus"
          className={classeCampo(tentouEnviar && !!erros.descricao)}
        />
        {tentouEnviar && erros.descricao && (
          <p className="mt-1 text-sm text-red-600">{erros.descricao}</p>
        )}
      </div>

      <div>
        <label htmlFor="valor" className="mb-1 block text-sm font-medium text-slate-600">
          Valor (R$)
        </label>
        <input
          id="valor"
          inputMode="decimal"
          value={valorTexto}
          onChange={(e) => setValorTexto(e.target.value)}
          placeholder="0,00"
          className={classeCampo(tentouEnviar && !!erros.valor)}
        />
        {tentouEnviar && erros.valor && (
          <p className="mt-1 text-sm text-red-600">{erros.valor}</p>
        )}
      </div>

      <div>
        <label htmlFor="categoria" className="mb-1 block text-sm font-medium text-slate-600">
          Categoria
        </label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategoria(e.target.value as Categoria)
          }
          className={classeCampo(false)}
        >
          {CATEGORIAS.map((c) => (
            <option key={c.valor} value={c.valor}>
              {c.rotulo}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="flex gap-4">
        <legend className="mb-1 text-sm font-medium text-slate-600">Tipo</legend>
        {(['receita', 'despesa'] as const).map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2 capitalize">
            <input
              type="radio"
              name="tipo"
              value={t}
              checked={tipo === t}
              onChange={handleTipo}
              className="accent-emerald-600"
            />
            {t}
          </label>
        ))}
      </fieldset>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={tentouEnviar && temErros}
          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {editando ? 'Salvar alterações' : 'Adicionar'}
        </button>
        {editando && (
          <button
            type="button"
            onClick={onCancelarEdicao}
            className="rounded-lg bg-slate-200 px-4 py-2 transition hover:bg-slate-300"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
