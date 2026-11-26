export type TipoTransacao = 'receita' | 'despesa'

export type Categoria =
  | 'salario'
  | 'transporte'
  | 'lanche'
  | 'games'
  | 'faculdade'
  | 'outros'

export type Transacao = {
  id: string
  descricao: string
  valor: number
  categoria: Categoria
  tipo: TipoTransacao
}

export type DadosTransacao = Omit<Transacao, 'id'>

export type FiltroCategoria = Categoria | 'todas'
export type FiltroTipo = TipoTransacao | 'todos'

export const CATEGORIAS = [
  { valor: 'salario', rotulo: 'Salário' },
  { valor: 'transporte', rotulo: 'Transporte' },
  { valor: 'lanche', rotulo: 'Lanche' },
  { valor: 'games', rotulo: 'Games' },
  { valor: 'faculdade', rotulo: 'Faculdade' },
  { valor: 'outros', rotulo: 'Outros' },
] as const satisfies readonly { valor: Categoria; rotulo: string }[]

export function rotuloCategoria(c: Categoria): string {
  return CATEGORIAS.find((item) => item.valor === c)?.rotulo ?? c
}
