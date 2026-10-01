// Gera 3 HTMLs autocontidos (imagens em base64) — um por proposta.
// Uso: node scripts/build-standalone.mjs  ->  handoff/labenditec-v1|v2|v3.html
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const img = (name) =>
  "data:image/jpeg;base64," + readFileSync(join(root, "public/images", name)).toString("base64");

const IMG = {
  line: img("hero-line.jpg"),
  eng: img("engineering.jpg"),
  auto: img("automotive.jpg"),
  weld: img("welding.jpg"),
};

/* ---------- CONTEÚDO (fonte de verdade) ---------- */
const company = { name: "LabEnDiTec", tagline: "Tecnologia que protege. Conhecimento que transforma resultados." };
const nav = ["Página Inicial", "Eletrodeposição", "Serviços", "Sobre Nós", "Contato"];
const navHref = ["#top", "#eletrodeposicao", "#servicos", "#sobre", "#contato"];
const heroIntro =
  "Laboratório especializado em E-coat / eletrodeposição. Unimos ensaio, diagnóstico e conhecimento técnico para ajudar a compreender processos, investigar desvios e transformar resultados em decisões.";
const ecoatIntro =
  "A eletrodeposição — também conhecida como E-coat, KTL ou cataforese — é utilizada para proteção anticorrosiva de componentes metálicos. O processo envolve preparação da superfície, imersão da peça em uma dispersão aquosa de tinta, aplicação de corrente elétrica, deposição do filme, lavagem e cura térmica.";
const processFlow = [
  ["Imersão", "Peça imersa em dispersão aquosa de tinta."],
  ["Aplicação elétrica", "Corrente elétrica aplicada ao sistema."],
  ["Deposição", "Formação do filme sobre a superfície."],
  ["Lavagem", "Remoção de excessos e resíduos."],
  ["Cura", "Cura térmica do revestimento."],
  ["Proteção", "Componente protegido contra corrosão."],
];
const systemFactors = ["Substrato", "Pré-tratamento", "Banho E-coat", "Parâmetros de aplicação", "Cura", "Análise"];
const serviceGroups = [
  ["Controle do banho", ["Determinação de pH", "Análise de condutividade", "Teor de sólidos", "Análise de ultrafiltrado", "Análise de anolito", "Análise de tinta E-coat"]],
  ["Composição e contaminação", ["Análise de cinzas", "Análise de resíduos", "Análise de bactérias e fungos", "Análise de íons", "Análise de solventes"]],
  ["Aplicação e filme", ["Aplicação de painéis", "Verificação de camada", "Verificação de rugosidade", "Análise de sujidades e crateras"]],
  ["Processo e documentação", ["Elaboração de instrução e operação de processos", "Mapeamento de processo"]],
  ["Capacitação", ["Treinamento E-coat — módulo básico", "Treinamento E-coat — módulo intermediário", "Treinamento E-coat — módulo avançado"]],
];
const labValue = [
  ["Caracterizar", "Entender materiais, banhos e filmes com base em dados."],
  ["Comparar", "Confrontar materiais, lotes e condições de processo."],
  ["Investigar", "Rastrear desvios e a origem de não conformidades."],
  ["Desenvolver", "Apoiar a evolução de processos e formulações."],
  ["Validar", "Confirmar desempenho antes de decisões técnicas."],
  ["Monitorar", "Acompanhar a estabilidade do processo ao longo do tempo."],
];
const positioning =
  "Laboratório voltado a ensaios, diagnóstico, tecnologia e compreensão dos sistemas de E-coat. Resultados laboratoriais não são apenas números: são informação para compreender processos e apoiar decisões técnicas.";
const knowledge = ["O que é E-coat", "Como funciona", "Química do filme", "E-coat e corrosão", "Pré-tratamento", "Evolução da tecnologia", "Novos materiais", "Papel do laboratório", "Futuro da eletrodeposição"];
const two = (i) => String(i + 1).padStart(2, "0");

/* ---------- CSS ---------- */
const css = `
*{box-sizing:border-box;margin:0;padding:0}
img{max-width:100%;display:block}
a{text-decoration:none;color:inherit}
ul{list-style:none}
html{scroll-behavior:smooth}
body{font-family:var(--fb);color:var(--fg);background:var(--bg);line-height:1.5;-webkit-font-smoothing:antialiased}
.shell{width:100%;max-width:1200px;margin:0 auto;padding:0 clamp(20px,4vw,48px)}
h1,h2,h3,h4{font-family:var(--fh);line-height:1.1}
.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;font-weight:600}
.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.5rem;font-weight:600;border-radius:var(--rad);border:1px solid transparent;cursor:pointer;transition:.2s}
.btn-primary{background:var(--primary);color:#fff}.btn-primary:hover{background:var(--pink)}
.btn-ghost{border-color:var(--line);background:var(--elev);color:var(--fg)}.btn-ghost:hover{border-color:var(--primary);color:var(--primary)}
.chip{display:inline-block;border:1px solid var(--line);background:var(--elev);color:var(--primary);border-radius:999px;padding:.25rem .75rem;font-size:.85rem;font-weight:500}
header.nav{position:sticky;top:0;z-index:50;background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav-in{display:flex;align-items:center;justify-content:space-between;height:64px}
.brand{display:flex;align-items:center;gap:.6rem;font-family:var(--fh);font-weight:800;font-size:1.15rem}
.mark{width:32px;height:32px;display:grid;place-items:center;background:var(--primary);color:#fff;border-radius:var(--rad);font-weight:700;font-size:.9rem}
.links{display:none;gap:1.6rem}.links a{color:var(--muted);font-size:.9rem;font-weight:500}.links a:hover{color:var(--primary)}
.navcta{display:none}
.burger{background:none;border:0;cursor:pointer;display:flex;flex-direction:column;gap:5px}.burger span{width:24px;height:2px;background:var(--fg);display:block}
.mobile{display:none;border-top:1px solid var(--line);background:var(--bg)}
.mobile.open{display:block}.mobile a{display:block;padding:.6rem 0;font-weight:600}
section{border-bottom:1px solid var(--line)}
.pad{padding:clamp(56px,8vw,110px) 0}
.muted{color:var(--muted)}
.grid{display:grid;gap:1rem}
.reveal{transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
html.js .reveal{opacity:0;transform:translateY(20px)}
html.js .reveal.in{opacity:1;transform:none}
@media(min-width:1024px){.links{display:flex}.navcta{display:inline-flex}.burger{display:none}}
@media(prefers-reduced-motion:reduce){html.js .reveal{opacity:1;transform:none;transition:none}html{scroll-behavior:auto}}
/* THEME V1 */
body.v1{--bg:#fff;--surface:#f6f8fb;--elev:#fff;--fg:#0f2540;--muted:#5a6b80;--primary:#1257a6;--pink:#0b3d73;--accent:#2e86de;--line:#e3e9f1;--rad:12px;--fh:'Manrope',system-ui,sans-serif;--fb:'Inter',system-ui,sans-serif}
/* THEME V2 */
body.v2{--bg:#eef2f6;--surface:#fff;--elev:#fff;--fg:#14202e;--muted:#55636f;--primary:#123650;--pink:#0a2436;--accent:#1e6091;--line:#cfd8e2;--rad:4px;--fh:'IBM Plex Sans',system-ui,sans-serif;--fb:'IBM Plex Sans',system-ui,sans-serif;--fm:'IBM Plex Mono',ui-monospace,monospace}
/* THEME V3 */
body.v3{--bg:#faf9f6;--surface:#fff;--elev:#fff;--fg:#17222e;--muted:#6a7481;--primary:#1b3a5b;--pink:#12293f;--accent:#3e6e9e;--line:#e7e3d9;--rad:2px;--fh:'Newsreader',Georgia,serif;--fb:'Source Sans 3',system-ui,sans-serif}
.mono{font-family:var(--fm)}
`;

const script = `
document.documentElement.classList.add('js');
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(el,i){el.style.transitionDelay=((i%6)*60)+'ms';io.observe(el)});
  setTimeout(function(){els.forEach(function(el){if(el.getBoundingClientRect().top<innerHeight)el.classList.add('in')})},300);
}else{els.forEach(function(el){el.classList.add('in')})}
const b=document.querySelector('.burger'),m=document.querySelector('.mobile');
if(b)b.addEventListener('click',()=>m.classList.toggle('open'));
document.querySelectorAll('.mobile a').forEach(a=>a.addEventListener('click',()=>m.classList.remove('open')));
`;

const navbar = () => `
<header class="nav"><div class="shell nav-in">
<a class="brand" href="#top"><span class="mark">L</span>${company.name}</a>
<nav class="links">${nav.map((n, i) => `<a href="${navHref[i]}">${n}</a>`).join("")}</nav>
<a class="btn btn-primary navcta" href="#contato">Fale conosco</a>
<button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
</div><div class="mobile"><div class="shell" style="padding-top:8px;padding-bottom:12px">${nav.map((n, i) => `<a href="${navHref[i]}">${n}</a>`).join("")}<a class="btn btn-primary" style="width:100%;justify-content:center;margin-top:8px" href="#contato">Fale conosco</a></div></div></header>`;

const footer = () => `
<footer style="background:var(--surface)"><div class="shell" style="display:grid;gap:2rem;padding:48px 0;grid-template-columns:1fr">
<div><div class="brand"><span class="mark">L</span>${company.name}</div><p class="muted" style="margin-top:1rem;max-width:22rem;font-size:.9rem">${company.tagline}</p></div>
<div style="display:grid;gap:2rem;grid-template-columns:repeat(3,1fr)">
${[["Navegação", nav], ["Serviços", serviceGroups.map((g) => g[0])], ["Contato", ["Solicitar análise", "Fale conosco", "— (a definir)"]]]
    .map(([h, items]) => `<div><h4 style="font-size:.85rem">${h}</h4><ul style="margin-top:.75rem;display:grid;gap:.5rem">${items.map((i) => `<li class="muted" style="font-size:.85rem">${i}</li>`).join("")}</ul></div>`).join("")}
</div></div>
<div style="border-top:1px solid var(--line)"><div class="shell" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem;padding:20px 0;font-size:.75rem" class="muted"><span class="muted">© 2026 ${company.name}. Todos os direitos reservados.</span><span class="muted">Dados legais e endereço — a definir.</span></div></div>
</footer>`;

const cta = () => `
<section id="contato" class="pad"><div class="shell"><div class="reveal" style="max-width:48rem;margin:0 auto;text-align:center;border:1px solid var(--line);background:var(--surface);border-radius:var(--rad);padding:clamp(32px,5vw,56px)">
<h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem)">Precisa avaliar seu processo de E-coat?</h2>
<p class="muted" style="margin-top:1rem;font-size:1.1rem">Fale com nossa equipe e solicite uma análise.</p>
<div style="margin-top:2rem;display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="#">Fale com nossa equipe</a><a class="btn btn-ghost" href="#">Solicite uma análise</a></div>
</div></div></section>`;

const page = (version, fonts, body) => `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${company.name} — Proposta ${version.toUpperCase()}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fonts}" rel="stylesheet">
<style>${css}</style></head><body class="${version}" id="top">${navbar()}${body}${cta()}${footer()}<script>${script}<\/script></body></html>`;

/* ================= V1 — Corporate Clean ================= */
function buildV1() {
  const fonts = "https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600&display=swap";
  const body = `
<section class="pad" style="background:linear-gradient(var(--surface),var(--bg))"><div class="shell" style="display:grid;gap:3rem;grid-template-columns:1fr;align-items:center">
<div class="reveal" style="min-width:0">
<p class="eyebrow" style="color:var(--accent)">Laboratório de E-coat / Eletrodeposição</p>
<h1 style="font-size:clamp(2.2rem,5vw,3.4rem);margin-top:1rem">Tecnologia que protege. <span style="color:var(--primary)">Conhecimento que transforma resultados.</span></h1>
<p class="muted" style="margin-top:1.5rem;font-size:1.15rem;max-width:34rem">${heroIntro}</p>
<div style="margin-top:1.25rem;display:flex;gap:.5rem;flex-wrap:wrap">${["E-coat", "KTL", "Cataforese"].map((t) => `<span class="chip">${t}</span>`).join("")}</div>
<div style="margin-top:2rem;display:flex;gap:.75rem;flex-wrap:wrap"><a class="btn btn-primary" href="#contato">Fale conosco →</a><a class="btn btn-ghost" href="#eletrodeposicao">Entenda a eletrodeposição</a></div>
</div>
<div class="reveal" style="border:1px solid var(--line);border-radius:var(--rad);overflow:hidden;box-shadow:0 20px 40px -24px rgba(15,37,64,.35);position:relative">
<img src="${IMG.line}" alt="Carroceria metálica em linha de produção" style="aspect-ratio:4/3;object-fit:cover;width:100%">
<div style="position:absolute;left:12px;bottom:12px;background:color-mix(in srgb,var(--bg) 85%,transparent);padding:6px 12px;border-radius:var(--rad);font-size:.75rem;font-weight:500">Proteção anticorrosiva de componentes metálicos</div>
</div></div></section>

<section style="background:var(--primary);color:#fff"><div class="shell" style="display:grid;gap:1.5rem;grid-template-columns:repeat(2,1fr);padding:28px 0">
${serviceGroups.slice(0, 4).map((g) => `<div class="reveal" style="font-weight:600;font-size:.9rem">${g[0]}</div>`).join("")}
</div></section>

<section id="eletrodeposicao" class="pad"><div class="shell" style="display:grid;gap:3rem;grid-template-columns:1fr;align-items:center">
<div class="reveal" style="border:1px solid var(--line);border-radius:var(--rad);overflow:hidden"><img src="${IMG.eng}" alt="Mesa de engenharia" style="aspect-ratio:4/3;object-fit:cover;width:100%"></div>
<div class="reveal"><p class="eyebrow" style="color:var(--accent)">O que é</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Eletrodeposição, de forma clara</h2><p class="muted" style="margin-top:1.25rem;font-size:1.1rem">${ecoatIntro}</p></div>
</div></section>

<section class="pad" style="background:var(--surface)"><div class="shell">
<div class="reveal"><p class="eyebrow" style="color:var(--accent)">Fluxo do processo</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Do banho à proteção</h2></div>
<div style="margin-top:2.5rem;display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">
${processFlow.map((s, i) => `<div class="reveal" style="border:1px solid var(--line);background:var(--elev);border-radius:var(--rad);padding:1.5rem"><div style="display:flex;align-items:center;gap:.75rem"><span style="display:grid;place-items:center;width:36px;height:36px;border-radius:var(--rad);background:color-mix(in srgb,var(--primary) 12%,transparent);color:var(--primary);font-weight:700;font-size:.85rem">${two(i)}</span><h3 style="font-size:1.15rem">${s[0]}</h3></div><p class="muted" style="margin-top:.75rem;font-size:.9rem">${s[1]}</p></div>`).join("")}
</div></div></section>

<section class="pad"><div class="shell" style="display:grid;gap:2.5rem;grid-template-columns:1fr;align-items:center">
<div class="reveal"><p class="eyebrow" style="color:var(--accent)">O conceito</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">E-coat não é apenas uma tinta. <span style="color:var(--primary)">É um sistema.</span></h2><p class="muted" style="margin-top:1.25rem;font-size:1.1rem;max-width:32rem">O desempenho do revestimento depende da interação entre variáveis. Cada uma influencia o resultado — e cada uma pode ser medida e compreendida.</p></div>
<div style="display:grid;gap:.75rem;grid-template-columns:repeat(auto-fit,minmax(140px,1fr))">${systemFactors.map((f, i) => `<div class="reveal" style="border:1px solid var(--line);background:var(--surface);border-radius:var(--rad);padding:1rem"><span style="color:var(--accent);font-weight:700;font-size:.75rem">${two(i)}</span><p style="margin-top:.25rem;font-weight:600;font-size:.9rem">${f}</p></div>`).join("")}</div>
</div></section>

<section id="servicos" class="pad" style="background:var(--surface)"><div class="shell">
<div class="reveal" style="max-width:40rem"><p class="eyebrow" style="color:var(--accent)">Serviços</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">O que o laboratório faz</h2></div>
<div style="margin-top:2.5rem;display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
${serviceGroups.map((g) => `<article class="reveal" style="border:1px solid var(--line);background:var(--elev);border-radius:var(--rad);padding:1.5rem"><h3 style="color:var(--primary);font-size:1.15rem">${g[0]}</h3><ul style="margin-top:1rem;display:grid;gap:.5rem">${g[1].map((it) => `<li class="muted" style="font-size:.9rem;display:flex;gap:.5rem"><span style="width:6px;height:6px;border-radius:999px;background:var(--accent);margin-top:.5rem;flex:none"></span>${it}</li>`).join("")}</ul></article>`).join("")}
</div></div></section>

<section class="pad"><div class="shell">
<div class="reveal" style="max-width:40rem"><p class="eyebrow" style="color:var(--accent)">Por que o laboratório importa</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Resultados não são apenas números</h2></div>
<div style="margin-top:2.5rem;display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">${labValue.map((v) => `<div class="reveal" style="border:1px solid var(--line);background:var(--surface);border-radius:var(--rad);padding:1.5rem"><h3 style="font-size:1.15rem">${v[0]}</h3><p class="muted" style="margin-top:.25rem;font-size:.9rem">${v[1]}</p></div>`).join("")}</div>
</div></section>

<section id="sobre" class="pad"><div class="shell" style="display:grid;gap:3rem;grid-template-columns:1fr;align-items:center">
<div class="reveal"><p class="eyebrow" style="color:var(--accent)">Sobre nós</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Parceiro técnico em sistemas de E-coat</h2><p class="muted" style="margin-top:1.25rem;font-size:1.1rem;max-width:34rem">${positioning}</p><a class="btn btn-primary" style="margin-top:1.5rem" href="#contato">Conheça o laboratório →</a></div>
<div class="reveal" style="border:1px solid var(--line);border-radius:var(--rad);overflow:hidden"><img src="${IMG.auto}" alt="Componentes automotivos metálicos" style="aspect-ratio:4/3;object-fit:cover;width:100%"></div>
</div></section>`;
  return page("v1", fonts, body);
}

/* ================= V2 — Technical Industrial ================= */
function buildV2() {
  const fonts = "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";
  const mono = "font-family:var(--fm);text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;font-weight:600";
  const body = `
<section class="pad" style="background:var(--surface)"><div class="shell" style="display:grid;gap:2.5rem;grid-template-columns:1fr;align-items:stretch">
<div class="reveal"><p style="${mono};color:var(--accent)">// E-coat · KTL · Cataforese</p>
<h1 style="font-size:clamp(2.1rem,5vw,3.2rem);margin-top:1rem">Do banho ao filme.<br>Do ensaio à informação.</h1>
<p class="muted" style="margin-top:1.5rem;font-size:1.15rem;max-width:34rem">Laboratório especializado em eletrodeposição. Ensaio, diagnóstico e conhecimento técnico para investigar processos, comparar materiais e transformar resultados em decisões.</p>
<div class="mono" style="margin-top:1.5rem;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:.75rem 0;display:flex;gap:1rem;flex-wrap:wrap;text-transform:uppercase;letter-spacing:.12em;font-size:.72rem;color:var(--muted)"><span>Ensaio</span><span>/</span><span>Diagnóstico</span><span>/</span><span>Documentação</span><span>/</span><span>Capacitação</span></div>
<div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap"><a class="btn btn-primary mono" style="text-transform:uppercase;letter-spacing:.1em;font-size:.72rem" href="#contato">Fale conosco</a><a class="btn btn-ghost mono" style="text-transform:uppercase;letter-spacing:.1em;font-size:.72rem" href="#eletrodeposicao">Entenda o processo</a></div></div>
<div class="reveal" style="position:relative;min-height:320px;border:1px solid var(--line);border-radius:var(--rad);overflow:hidden;background:var(--primary)">
<img src="${IMG.weld}" alt="Trabalho industrial em componente metálico" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.9">
<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(10,36,54,.8),transparent 60%)"></div>
<div class="mono" style="position:absolute;left:16px;bottom:16px;color:rgba(255,255,255,.85);text-transform:uppercase;letter-spacing:.12em;font-size:.7rem">Componentes metálicos · indústria</div>
</div></div></section>

<section id="eletrodeposicao" class="pad"><div class="shell" style="display:grid;gap:2.5rem;grid-template-columns:1fr">
<div class="reveal"><p style="${mono};color:var(--accent)">01 — Definição</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Eletrodeposição</h2></div>
<div class="reveal"><p class="muted" style="border-left:2px solid var(--primary);padding-left:1.25rem;font-size:1.1rem">${ecoatIntro}</p></div>
</div></section>

<section class="pad" style="background:var(--surface)"><div class="shell">
<div class="reveal"><p style="${mono};color:var(--accent)">02 — Fluxo do processo</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Sequência do sistema</h2></div>
<div style="margin-top:3rem;display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">
${processFlow.map((s, i) => `<div class="reveal"><span style="display:grid;place-items:center;width:32px;height:32px;border:1px solid var(--primary);border-radius:var(--rad);color:var(--primary);font-family:var(--fm);font-weight:700;font-size:.72rem">${two(i)}</span><h3 style="margin-top:.75rem;font-size:1rem">${s[0]}</h3><p class="muted" style="margin-top:.25rem;font-size:.85rem">${s[1]}</p></div>`).join("")}
</div></div></section>

<section class="pad"><div class="shell">
<div class="reveal" style="max-width:42rem"><p style="${mono};color:var(--accent)">03 — Conceito</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">E-coat não é apenas uma tinta. É um sistema.</h2><p class="muted" style="margin-top:1rem;font-size:1.05rem">O desempenho depende da interação entre variáveis técnicas:</p></div>
<div style="margin-top:2.5rem;display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--rad);overflow:hidden;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))">${systemFactors.map((f, i) => `<div class="reveal" style="background:var(--elev);padding:1.25rem"><span class="mono" style="color:var(--accent);font-size:.72rem">${two(i)}</span><p style="margin-top:.5rem;font-weight:700;font-size:.9rem">${f}</p></div>`).join("")}</div>
</div></section>

<section id="servicos" class="pad" style="background:var(--surface)"><div class="shell">
<div class="reveal"><p style="${mono};color:var(--accent)">04 — Serviços</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Ensaios e capacitação</h2></div>
<div style="margin-top:2.5rem;display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--rad);overflow:hidden;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
${serviceGroups.map((g, i) => `<article class="reveal" style="background:var(--elev);padding:1.5rem"><div style="display:flex;gap:.5rem;align-items:center;border-bottom:1px solid var(--line);padding-bottom:.75rem"><span class="mono" style="color:var(--accent);font-size:.72rem">${two(i)}</span><h3 style="color:var(--primary);font-size:1rem">${g[0]}</h3></div><ul style="margin-top:.75rem;display:grid;gap:.35rem">${g[1].map((it) => `<li class="mono muted" style="font-size:.8rem">— ${it}</li>`).join("")}</ul></article>`).join("")}
</div></div></section>

<section class="pad"><div class="shell" style="display:grid;gap:2.5rem;grid-template-columns:1fr;align-items:center">
<div class="reveal" style="border:1px solid var(--line);border-radius:var(--rad);overflow:hidden"><img src="${IMG.eng}" alt="Mesa de engenharia" style="aspect-ratio:4/3;object-fit:cover;width:100%"></div>
<div class="reveal"><p style="${mono};color:var(--accent)">05 — Papel do laboratório</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Resultados que viram decisão</h2>
<div style="margin-top:1.5rem;display:grid;gap:1rem 1.5rem;grid-template-columns:1fr 1fr">${labValue.map((v) => `<div style="border-top:1px solid var(--line);padding-top:.75rem"><h3 class="mono" style="color:var(--primary);text-transform:uppercase;letter-spacing:.08em;font-size:.8rem">${v[0]}</h3><p class="muted" style="margin-top:.25rem;font-size:.85rem">${v[1]}</p></div>`).join("")}</div></div>
</div></section>

<section class="pad" style="background:var(--surface)"><div class="shell">
<div class="reveal" style="max-width:42rem"><p style="${mono};color:var(--accent)">06 — Conhecimento</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Falando sobre eletrodeposição</h2></div>
<div style="margin-top:2rem;display:grid;gap:1px;background:var(--line);border:1px solid var(--line);border-radius:var(--rad);overflow:hidden;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">${knowledge.map((t, i) => `<a href="#" class="reveal" style="background:var(--elev);padding:1rem 1.25rem;display:flex;justify-content:space-between;gap:.5rem;align-items:center"><span style="display:flex;gap:.75rem;align-items:center"><span class="mono" style="color:var(--accent);font-size:.72rem">${two(i)}</span><span style="font-weight:600;font-size:.9rem">${t}</span></span><span class="mono muted">→</span></a>`).join("")}</div>
</div></section>

<section id="sobre" class="pad" style="background:var(--primary);color:#fff"><div class="shell" style="display:grid;gap:2rem;grid-template-columns:1fr;align-items:center">
<div class="reveal"><p class="mono" style="text-transform:uppercase;letter-spacing:.16em;font-size:.72rem;color:rgba(255,255,255,.6)">07 — Sobre</p><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);margin-top:.75rem">Parceiro técnico em sistemas de E-coat</h2><p style="margin-top:1.25rem;font-size:1.1rem;max-width:34rem;color:rgba(255,255,255,.8)">${positioning}</p></div>
<div class="reveal"><a class="btn mono" style="background:#fff;color:var(--primary);text-transform:uppercase;letter-spacing:.1em;font-size:.72rem" href="#contato">Conheça o laboratório</a></div>
</div></section>`;
  return page("v2", fonts, body);
}

/* ================= V3 — Premium Editorial ================= */
function buildV3() {
  const fonts = "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Source+Sans+3:wght@400;500;600&display=swap";
  const body = `
<section><div class="shell pad"><div class="reveal">
<p class="eyebrow" style="color:var(--primary)">E-coat · KTL · Cataforese</p>
<h1 style="font-size:clamp(2.6rem,7vw,5rem);font-weight:500;margin-top:1.25rem;max-width:16ch">E-coat não é apenas uma tinta. <span style="font-style:italic;color:var(--primary)">É um sistema.</span></h1>
<div style="margin-top:2rem;display:grid;gap:2rem;grid-template-columns:1fr;align-items:end">
<p class="muted" style="font-size:1.25rem;max-width:34rem">Laboratório especializado em eletrodeposição — do banho ao filme, do ensaio à informação. Tecnologia que protege, conhecimento que transforma resultados.</p>
<div style="display:flex;gap:1rem;flex-wrap:wrap"><a class="btn btn-primary" href="#contato">Fale conosco</a><a class="btn btn-ghost" href="#eletrodeposicao">Entenda mais</a></div>
</div></div></div>
<figure class="reveal" style="position:relative;height:min(60vh,520px)"><img src="${IMG.line}" alt="Carrocerias metálicas em linha de produção" style="width:100%;height:100%;object-fit:cover"><figcaption class="shell" style="position:absolute;left:0;right:0;bottom:16px;color:#fff;font-size:.9rem;text-shadow:0 1px 8px rgba(0,0,0,.6)">Componentes metálicos em processo — proteção anticorrosiva por eletrodeposição.</figcaption></figure>
</section>

<section id="eletrodeposicao" class="pad"><div class="shell" style="display:grid;gap:3rem;grid-template-columns:1fr">
<div class="reveal"><h2 style="font-size:clamp(1.7rem,3.4vw,2.4rem);font-weight:500">O que é eletrodeposição</h2></div>
<div class="reveal"><p style="font-family:var(--fh);font-size:1.5rem;line-height:1.5;color:var(--fg)">${ecoatIntro}</p></div>
</div></section>

<section class="pad"><div class="shell">
<div class="reveal" style="max-width:42rem"><p class="eyebrow" style="color:var(--primary)">O processo</p><h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:500;margin-top:1rem">Do banho à proteção</h2></div>
<div style="margin-top:3rem;border-top:1px solid var(--line)">${processFlow.map((s, i) => `<div class="reveal" style="display:grid;gap:1rem 2.5rem;grid-template-columns:64px 1fr;align-items:baseline;padding:1.5rem 0;border-bottom:1px solid var(--line)"><span style="font-family:var(--fh);font-size:2rem;color:color-mix(in srgb,var(--primary) 45%,transparent)">${two(i)}</span><div><h3 style="font-size:clamp(1.4rem,3vw,2rem);font-weight:500">${s[0]}</h3><p class="muted" style="margin-top:.5rem;font-size:1.1rem">${s[1]}</p></div></div>`).join("")}</div>
</div></section>

<section class="pad" style="background:var(--surface)"><div class="shell" style="display:grid;gap:3rem;grid-template-columns:1fr;align-items:center">
<div class="reveal"><p class="eyebrow" style="color:var(--primary)">O conceito</p><h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:500;margin-top:1rem">O desempenho nasce da interação.</h2>
<div style="margin-top:2rem">${systemFactors.map((f, i) => `<div style="display:flex;gap:1.25rem;align-items:baseline;border-bottom:1px solid var(--line);padding:.75rem 0"><span style="font-family:var(--fh);color:color-mix(in srgb,var(--primary) 50%,transparent)">${two(i)}</span><span style="font-family:var(--fh);font-size:1.5rem;font-weight:500">${f}</span></div>`).join("")}</div></div>
<div class="reveal"><img src="${IMG.eng}" alt="Mesa de engenharia" style="aspect-ratio:4/5;object-fit:cover;width:100%"></div>
</div></section>

<section id="servicos" class="pad"><div class="shell">
<div class="reveal" style="max-width:42rem"><p class="eyebrow" style="color:var(--primary)">Serviços</p><h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:500;margin-top:1rem">O que o laboratório faz</h2></div>
<div style="margin-top:3rem;display:grid;gap:3rem">${serviceGroups.map((g, i) => `<div class="reveal" style="display:grid;gap:1.5rem;grid-template-columns:1fr;border-top:1px solid var(--line);padding-top:2rem"><div style="display:flex;gap:1rem;align-items:baseline"><span style="font-family:var(--fh);font-size:1.5rem;color:color-mix(in srgb,var(--primary) 45%,transparent)">${two(i)}</span><h3 style="font-size:clamp(1.4rem,3vw,1.9rem);font-weight:500">${g[0]}</h3></div><ul style="display:grid;gap:.5rem 2rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))">${g[1].map((it) => `<li class="muted" style="font-size:1.1rem">${it}</li>`).join("")}</ul></div>`).join("")}</div>
</div></section>

<section class="pad" style="background:var(--surface)"><div class="shell">
<div class="reveal" style="max-width:42rem"><p class="eyebrow" style="color:var(--primary)">Por que o laboratório importa</p><h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:500;margin-top:1rem">Resultados não são apenas números.</h2></div>
<div style="margin-top:3rem;display:grid;gap:2.5rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">${labValue.map((v) => `<div class="reveal" style="border-top:2px solid var(--primary);padding-top:1rem"><h3 style="font-size:1.5rem;font-weight:500">${v[0]}</h3><p class="muted" style="margin-top:.5rem;font-size:1.1rem">${v[1]}</p></div>`).join("")}</div>
</div></section>

<section id="sobre" style="display:grid;grid-template-columns:1fr">
<div class="reveal" style="display:flex;align-items:center"><div class="shell pad" style="width:100%"><p class="eyebrow" style="color:var(--primary)">Sobre nós</p><h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:500;margin-top:1rem">Parceiro técnico em sistemas de E-coat.</h2><p class="muted" style="margin-top:1.5rem;font-size:1.25rem;max-width:34rem">${positioning}</p><a href="#contato" style="display:inline-block;margin-top:2rem;font-family:var(--fh);font-size:1.5rem;font-weight:500;color:var(--primary);border-bottom:2px solid var(--primary);padding-bottom:.15rem">Conheça o laboratório →</a></div></div>
<div class="reveal" style="min-height:300px"><img src="${IMG.auto}" alt="Componentes automotivos metálicos" style="width:100%;height:100%;object-fit:cover;min-height:300px"></div>
</section>`;
  return page("v3", fonts, body);
}

/* ---------- build ---------- */
const out = join(root, "handoff");
mkdirSync(out, { recursive: true });
const files = [["labenditec-v1-corporate.html", buildV1()], ["labenditec-v2-industrial.html", buildV2()], ["labenditec-v3-editorial.html", buildV3()]];
for (const [name, html] of files) {
  writeFileSync(join(out, name), html);
  console.log("gerado:", name, (Buffer.byteLength(html) / 1024 / 1024).toFixed(2) + " MB");
}
