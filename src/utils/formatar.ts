const formatadorBRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatarReais(valor: number): string {
  return formatadorBRL.format(valor)
}
