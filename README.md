# Controle de Gastos Pessoais

Atividade 2 de **Tecnologias para Interfaces de Aplicações Web** (IFTM, ADS, 2026).
Um app para registrar as receitas e despesas de um mês, com resumo e filtros.

Feito com **React 19 + TypeScript + Vite + Tailwind CSS v4**.

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (geralmente http://localhost:5173).

## Funcionalidades

- Cadastro de receitas e despesas (descrição, valor, categoria e tipo)
- Validação: descrição com pelo menos 3 letras e valor maior que zero, com mensagens de erro na tela
- Editar e remover transações
- Resumo com receitas, despesas e saldo (o saldo fica vermelho quando é negativo)
- Filtros por tipo e por categoria, com mensagem quando nenhum item aparece
- Valores em reais com `Intl.NumberFormat`
- Layout responsivo: formulário ao lado da lista no desktop e empilhado no celular

## Estrutura

```
src/
├── tipos.ts                  # Transacao, Categoria, TipoTransacao, filtros
├── utils/formatar.ts         # formatarReais() com Intl.NumberFormat
├── App.tsx                   # estado elevado + funções imutáveis + estado derivado
└── components/
    ├── FormTransacao.tsx     # formulário controlado com validação (criar/editar)
    ├── Resumo.tsx            # cards de receitas, despesas e saldo
    ├── Filtros.tsx           # botões de filtro por tipo e categoria
    └── ListaTransacoes.tsx   # lista com editar/remover e mensagem de lista vazia
```

## Como cada requisito foi atendido

| Requisito | Onde |
|---|---|
| Tipos com `'receita' \| 'despesa'` e união própria de categorias | `src/tipos.ts` |
| Formulário controlado com validação | `FormTransacao.tsx` (`value` + `onChange`, função `validar`) |
| Remover e editar de forma imutável | `App.tsx` (`filter`, `map` e spread `...`) |
| Resumo derivado, sem `useState` para totais | `App.tsx` (`receitas`, `despesas`, `saldo` com `reduce`) |
| Filtro por categoria e tipo + mensagem de lista vazia | `Filtros.tsx`, `ListaTransacoes.tsx` |
| Estado elevado (3 ou mais componentes com props tipadas) | `App.tsx` → `FormTransacao`, `Resumo`, `Filtros`, `ListaTransacoes` |
| Moeda em reais | `src/utils/formatar.ts` |
| Layout responsivo com Tailwind | `App.tsx` (`grid-cols-1 md:grid-cols-[320px_1fr]`) |
