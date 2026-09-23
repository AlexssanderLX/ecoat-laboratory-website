# LabEnDiTec — Propostas de Homepage (V1 / V2 / V3)

Três direções visuais para a mesma Home, com o **mesmo conteúdo-base** (`lib/content.ts`) e o mesmo posicionamento. Após a escolha do cliente, a direção vencedora vira o **design system** do restante do site.

> As telas `/v1`, `/v2`, `/v3` e a tela de seleção `/` existem apenas para avaliação — "V1/V2/V3" não fazem parte da identidade final.

## Conteúdo (fonte de verdade)
Todo o conteúdo institucional/técnico vem de `lib/content.ts`, transcrito do briefing do cliente. **Nada foi inventado** (certificações, anos, clientes, números, equipamentos, significado de `*`/`**`, prazos). Onde faltou dado, há placeholder substituível (ex.: rodapé "a definir").

---

## V1 — Corporate Clean
- **Conceito:** clara, corporativa, minimalista. Bastante branco, azul corporativo, cards discretos, geometria simples. Mensagem-âncora: *"Tecnologia que protege. Conhecimento que transforma resultados."*
- **Tipografia:** Manrope (títulos) + Inter (texto).
- **Paleta:** primary `#1257A6`, primary-ink `#0B3D73`, accent `#2E86DE`, bg `#FFFFFF`, surface `#F6F8FB`, fg `#0F2540`, muted `#5A6B80`, line `#E3E9F1`. Radius 12px, sombras suaves.
- **UI:** hero em 2 colunas com um "visual de camadas" (substrato → pré-tratamento → filme); fluxo em cards; serviços em cards; seção Sobre em bloco azul.

## V2 — Technical Industrial
- **Conceito:** técnica/industrial, orientada a processo. Azul profundo/grafite, linhas técnicas, rótulos monoespaçados, numeração `01–06`, diagrama esquemático. Mensagem-âncora: *"Do banho ao filme. Do ensaio à informação."*
- **Tipografia:** IBM Plex Sans (títulos/texto) + IBM Plex Mono (rótulos técnicos).
- **Paleta:** primary `#123650`, primary-ink `#0A2436`, accent `#1E6091`, bg `#EEF2F6`, surface `#FFFFFF`, fg `#14202E`, muted `#55636F`, line `#CFD8E2`. Radius 4px (mais reto), hairlines.
- **UI:** hero com blueprint (grid + tanque + corrente + deposição); fluxo como timeline; serviços em grade com divisórias; seções numeradas.

## V3 — Premium Editorial
- **Conceito:** editorial/premium, muito espaço em branco, tipografia serif protagonista. Mensagem-âncora: *"E-coat não é apenas uma tinta. É um sistema."*
- **Tipografia:** Newsreader (serif, títulos) + Source Sans 3 (texto).
- **Paleta:** primary `#1B3A5B`, primary-ink `#12293F`, accent `#3E6E9E`, bg `#FAF9F6` (off-white quente), surface `#FFFFFF`, fg `#17222E`, muted `#6A7481`, line `#E7E3D9`. Radius 2px.
- **UI:** hero tipográfico grande; processo como lista numerada editorial; serviços como índice; grids amplos.

---

## Decisões de UI comuns
- **Tokens** (`app/globals.css`): cada versão define os mesmos nomes de token (`--primary`, `--surface`, `--fg`, `--muted`, `--line`, `--radius`, sombras…) com valores próprios, via classes `.theme-v1/.theme-v2/.theme-v3`. Isso facilita consolidar **uma** direção depois.
- **Animações** (`components/Reveal.tsx`): fade/slide discretos, `whileInView` com `once`, stagger em grupos. Respeita `prefers-reduced-motion` (Framer Motion + guarda global no CSS).
- **Navegação:** as 5 áreas (Início, Eletrodeposição, Serviços, Sobre, Contato) já aparecem na navbar para o cliente visualizar a arquitetura final.
- **Responsividade:** desktop e mobile tratados desde o início (grids colapsam, menu mobile em cada versão).
- **A definir / não inventado:** dados legais, endereço, redes, certificações, números e o significado de `*`/`**` ficam como placeholders.

## Roadmap (próximas fases)
- Após a escolha: consolidar tokens da versão vencedora como design system único.
- Página "Falando sobre Eletrodeposição" (autoridade/SEO) — tópicos já listados em `lib/content.ts` (`knowledgeTopics`).
- Animações interativas + 3D discreto (peça metálica/óleo/filme) no hero — reservado um slot de visual para isso.
