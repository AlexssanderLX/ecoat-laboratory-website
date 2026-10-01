# LabEnDiTec — Site institucional

Site institucional para laboratório especializado em **E-coat / eletrodeposição** (também: KTL, cataforese): ensaio, diagnóstico e conhecimento técnico.

> `labenditec` é nome temporário de trabalho. O repositório poderá ser renomeado.

## Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (design tokens via CSS variables — `.theme-lab`)
- Framer Motion (animações respeitando `prefers-reduced-motion`)

## Rodando

```bash
npm install
npm run dev
```

Acesse **http://localhost:3000** (versão única — a home).

Outros scripts:

```bash
npm run build      # build de produção
npm run lint       # ESLint
npm run typecheck  # checagem de tipos
```

## Estrutura

```
app/
  page.tsx            # home (versão única)
  globals.css         # tokens (.theme-lab) e utilitários
components/
  HeroVideo.tsx       # hero: vídeo de laboratório + H1 digitado
  SystemScreen.tsx    # "medir e entender o sistema" (curva de medição)
  ProcessStory.tsx    # vídeo do mergulho + 6 etapas (hexágono)
  Reveal.tsx          # animações de entrada reutilizáveis
lib/content.ts        # CONTEÚDO (fonte de verdade — briefing do cliente)
public/
  video/              # hero.mp4, process.mp4
  images/             # posters / frames
```

## Fluxo da home (telas de "filme")
1. **Preloader** — carrega os vídeos; libera o hero ao terminar.
2. **Hero** — vídeo de laboratório + H1 "E-coat não é apenas uma tinta. É um sistema." (digitado).
3. **Eletrodeposição** — "aquilo que não é medido não pode ser controlado" + curva de medição.
4. **Processo** — vídeo do mergulho com as 6 etapas em volta.
5. Sistema, Valor do laboratório, Serviços, Conhecimento, Posicionamento, Contato.

## Importante (conteúdo)
`lib/content.ts` é a **fonte de verdade** e reflete apenas o que o cliente informou.
**Não** foram inventados: certificações, anos de mercado, clientes, números, equipamentos,
prazos, métodos não informados nem o significado das marcações `*`/`**`. Dados ausentes
(dados legais, endereço, redes) estão como placeholders substituíveis.

## Próximas fases
1. Refinar página a página as telas de "filme" e integrar as seções seguintes.
2. Substituir placeholders pelos dados/fotos reais do cliente.
3. Página de conteúdo técnico (autoridade/SEO).
