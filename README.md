# LabEnDiTec — Site institucional (fase de propostas)

Site institucional para laboratório especializado em **E-coat / eletrodeposição** (também: KTL, cataforese).
Esta fase entrega **três propostas de homepage** (V1, V2, V3) para o cliente escolher a direção visual.

> `labenditec` é nome temporário de trabalho. O repositório poderá ser renomeado.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (design tokens por proposta via CSS variables)
- Framer Motion (animações discretas, respeitando `prefers-reduced-motion`)

## Rodando

```bash
npm install
npm run dev
```

Acesse **http://localhost:3000**:

- `/` — tela de seleção das propostas (apenas avaliação)
- `/v1` — Corporate Clean
- `/v2` — Technical Industrial
- `/v3` — Premium Editorial

Outros scripts:

```bash
npm run build      # build de produção
npm run lint       # ESLint
npm run typecheck  # checagem de tipos
```

## Estrutura

```
app/
  page.tsx        # seletor de propostas (avaliação)
  v1|v2|v3/       # cada proposta de homepage
  globals.css     # tokens por tema (.theme-v1/v2/v3)
components/Reveal.tsx  # animações discretas reutilizáveis
lib/content.ts    # CONTEÚDO (fonte de verdade — briefing do cliente)
docs/proposals.md # conceito, tipografia, paletas e decisões de UI
```

## Importante (conteúdo)
`lib/content.ts` é a **fonte de verdade** e reflete apenas o que o cliente informou.
**Não** foram inventados: certificações, anos de mercado, clientes, números, equipamentos,
prazos, métodos não informados nem o significado das marcações `*`/`**`. Dados ausentes
(dados legais, endereço, redes) estão como placeholders substituíveis.

## Próximas fases
1. Consolidar a versão escolhida como **design system** único.
2. Desenvolver as demais áreas: Eletrodeposição, Serviços, Sobre, Contato.
3. Página de conteúdo técnico (autoridade/SEO) e visual 3D discreto no hero.
