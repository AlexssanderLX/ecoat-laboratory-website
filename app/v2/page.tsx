"use client";

import { useState } from "react";
import Image from "next/image";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, staggerItem } from "@/components/Reveal";
import {
  company,
  nav,
  ecoatIntro,
  processFlow,
  systemFactors,
  serviceGroups,
  labValue,
  positioning,
  knowledgeTopics,
} from "@/lib/content";

const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plex" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" });

function Ticks() {
  return (
    <>
      <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-white/70" />
      <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-white/70" />
      <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-white/70" />
      <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-white/70" />
    </>
  );
}

export default function V2() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`theme-v2 ${plex.variable} ${plexMono.variable} min-h-screen bg-bg font-body text-fg`}
      style={{ ["--font-heading" as string]: "var(--font-plex)", ["--font-body" as string]: "var(--font-plex)", ["--font-mono" as string]: "var(--font-plex-mono)" }}
      id="top"
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-line bg-surface">
        <div className="shell flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-token bg-primary font-mono text-sm font-bold text-white">L</span>
            <span className="font-heading text-lg font-bold tracking-tight">{company.name}</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => (<a key={n.href} href={n.href} className="text-sm font-medium text-muted transition-colors hover:text-primary">{n.label}</a>))}
          </nav>
          <a href="#contato" className="hidden rounded-token bg-primary px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary-ink lg:inline-block">Fale conosco</a>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <div className="space-y-1.5"><span className="block h-0.5 w-6 bg-fg" /><span className="block h-0.5 w-6 bg-fg" /><span className="block h-0.5 w-6 bg-fg" /></div>
          </button>
        </div>
        {open && (
          <div className="border-t border-line bg-surface lg:hidden"><div className="shell flex flex-col py-2">
            {nav.map((n) => (<a key={n.href} href={n.href} onClick={() => setOpen(false)} className="px-2 py-2 text-sm font-medium">{n.label}</a>))}
            <a href="#contato" onClick={() => setOpen(false)} className="mt-2 rounded-token bg-primary px-4 py-2.5 text-center font-mono text-xs font-semibold uppercase text-white">Fale conosco</a>
          </div></div>
        )}
      </header>

      {/* HERO */}
      <section className="relative border-b border-line bg-surface">
        <div className="shell grid items-stretch gap-10 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">{"//"} E-coat · KTL · Cataforese</p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-[1.06] tracking-tight md:text-5xl">Do banho ao filme.<br />Do ensaio à informação.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">Laboratório especializado em eletrodeposição. Ensaio, diagnóstico e conhecimento técnico para investigar processos, comparar materiais e transformar resultados em decisões.</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-3 font-mono text-xs uppercase tracking-wider text-muted">
              <span>Ensaio</span><span className="text-line">/</span><span>Diagnóstico</span><span className="text-line">/</span><span>Documentação</span><span className="text-line">/</span><span>Capacitação</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contato" className="rounded-token bg-primary px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-primary-ink">Fale conosco</a>
              <a href="#eletrodeposicao" className="rounded-token border border-line bg-elevated px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-fg transition-colors hover:border-primary hover:text-primary">Entenda o processo</a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-token border border-line bg-primary">
              <Image src="/images/welding.jpg" alt="Trabalho industrial em componente metálico" fill priority sizes="(max-width:1024px) 100vw, 45vw" className="object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/80 via-transparent to-transparent" />
              <Ticks />
              <div className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-wider text-white/85">Componentes metálicos · indústria</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section id="eletrodeposicao" className="border-b border-line py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.3fr]">
          <Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">01 — Definição</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Eletrodeposição</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="border-l-2 border-primary pl-5 text-lg leading-relaxed text-muted">{ecoatIntro}</p>
            <a href="#servicos" className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">Entenda a eletrodeposição →</a>
          </Reveal>
        </div>
      </section>

      {/* FLUXO */}
      <section className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">02 — Fluxo do processo</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Sequência do sistema</h2></Reveal>
          <RevealGroup className="mt-12 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-6" stagger={0.06}>
            {processFlow.map((s, i) => (
              <motion.div key={s.step} variants={staggerItem} className="relative">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-token border border-primary font-mono text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {i < processFlow.length - 1 && <span className="hidden h-px flex-1 bg-line lg:block" />}
                </div>
                <h3 className="mt-3 font-heading text-base font-bold">{s.step}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* COMO FUNCIONA — blueprint + explicação */}
      <section className="border-b border-line py-16 md:py-24">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal><Blueprint /></Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">03 — Como funciona</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">Corrente, deposição e cura</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">A peça é imersa no banho e, sob corrente elétrica, o filme se deposita de forma uniforme sobre a superfície. Em seguida vêm a lavagem e a cura térmica — cada etapa com parâmetros que podem ser medidos e controlados.</p>
          </Reveal>
        </div>
      </section>

      {/* SISTEMA */}
      <section className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">04 — Conceito</p><h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">E-coat não é apenas uma tinta. É um sistema.</h2><p className="mt-4 text-lg leading-relaxed text-muted">O desempenho depende da interação entre variáveis técnicas:</p></Reveal>
          <RevealGroup className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-token border border-line bg-line sm:grid-cols-3 lg:grid-cols-6" stagger={0.05}>
            {systemFactors.map((f, i) => (
              <motion.div key={f} variants={staggerItem} className="bg-elevated p-5"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><p className="mt-2 font-heading text-sm font-bold leading-snug">{f}</p></motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SERVIÇOS — data-sheet */}
      <section id="servicos" className="border-b border-line py-16 md:py-24">
        <div className="shell">
          <Reveal><p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">05 — Serviços</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Ensaios e capacitação</h2></Reveal>
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-token border border-line bg-line md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {serviceGroups.map((g, i) => (
              <motion.article key={g.title} variants={staggerItem} className="flex flex-col bg-elevated p-6">
                <div className="flex items-center gap-2 border-b border-line pb-3"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><h3 className="font-heading text-base font-bold text-primary">{g.title}</h3></div>
                <ul className="mt-3 space-y-1.5">{g.items.map((it) => (<li key={it} className="font-mono text-[13px] leading-relaxed text-muted">— {it}</li>))}</ul>
              </motion.article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* LABORATÓRIO — com imagem */}
      <section className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-token border border-line">
              <div className="relative aspect-[4/3]"><Image src="/images/engineering.jpg" alt="Mesa de engenharia com desenhos técnicos e instrumentos de medição" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">06 — Papel do laboratório</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Resultados que viram decisão</h2>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              {labValue.map((v) => (
                <div key={v.title} className="border-t border-line pt-3">
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-primary">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{v.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONHECIMENTO */}
      <section className="border-b border-line py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl"><p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">07 — Conhecimento</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Falando sobre eletrodeposição</h2></Reveal>
          <RevealGroup className="mt-8 grid gap-px overflow-hidden rounded-token border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
            {knowledgeTopics.map((t, i) => (
              <motion.a key={t} href="#" variants={staggerItem} className="group flex items-center justify-between gap-2 bg-elevated px-5 py-4 transition-colors hover:bg-surface">
                <span className="flex items-center gap-3"><span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><span className="text-sm font-semibold">{t}</span></span>
                <span className="font-mono text-muted transition-transform group-hover:translate-x-0.5">→</span>
              </motion.a>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="border-b border-line bg-primary py-16 text-white md:py-24">
        <div className="shell grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/60">08 — Sobre</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">Parceiro técnico em sistemas de E-coat</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{positioning}</p>
          </Reveal>
          <Reveal delay={0.1}><a href="#contato" className="inline-block rounded-token bg-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-transform hover:-translate-y-0.5">Conheça o laboratório</a></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="py-16 md:py-24">
        <div className="shell">
          <Reveal className="rounded-token border border-line bg-surface p-10 md:p-14">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div><h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Precisa avaliar seu processo de E-coat?</h2><p className="mt-3 text-lg text-muted">Fale com nossa equipe e solicite uma análise.</p></div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <a href="#" className="rounded-token bg-primary px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-primary-ink">Fale com a equipe</a>
                <a href="#" className="rounded-token border border-line bg-elevated px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-fg hover:border-primary hover:text-primary">Solicite uma análise</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line bg-surface">
        <div className="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2"><div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-token bg-primary font-mono text-sm font-bold text-white">L</span><span className="font-heading text-lg font-bold">{company.name}</span></div><p className="mt-4 max-w-xs font-mono text-[13px] leading-relaxed text-muted">{company.tagline}</p></div>
          {[{ h: "Navegação", items: nav.map((n) => n.label) }, { h: "Serviços", items: serviceGroups.map((g) => g.title) }, { h: "Contato", items: ["Solicitar análise", "Fale conosco", "— (a definir)"] }].map((col) => (
            <div key={col.h}><h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">{col.h}</h4><ul className="mt-3 space-y-2">{col.items.map((it) => (<li key={it} className="text-sm text-muted">{it}</li>))}</ul></div>
          ))}
        </div>
        <div className="border-t border-line"><div className="shell flex flex-col items-center justify-between gap-2 py-5 font-mono text-xs text-muted sm:flex-row"><span>© {new Date().getFullYear()} {company.name}</span><span>Dados legais — a definir.</span></div></div>
      </footer>
    </div>
  );
}

function Blueprint() {
  return (
    <div className="relative rounded-token border border-line bg-elevated p-6 shadow-card">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted"><span>Esquema · E-coat</span><span>Fig. 01</span></div>
      <svg viewBox="0 0 360 240" className="h-full w-full" role="img" aria-label="Diagrama esquemático do processo de eletrodeposição">
        <defs><pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="1" /></pattern></defs>
        <rect x="0" y="0" width="360" height="240" fill="url(#grid2)" opacity="0.6" />
        <rect x="30" y="70" width="150" height="120" fill="none" stroke="var(--primary)" strokeWidth="2" />
        <line x1="30" y1="95" x2="180" y2="95" stroke="var(--accent)" strokeDasharray="4 4" />
        <text x="36" y="88" fontSize="9" fill="var(--muted)" fontFamily="var(--font-plex-mono)">BANHO E-COAT</text>
        <rect x="90" y="110" width="30" height="60" fill="var(--primary)" opacity="0.85" />
        <line x1="105" y1="70" x2="105" y2="110" stroke="var(--fg)" strokeWidth="1.5" />
        <circle cx="105" cy="70" r="3" fill="var(--accent)" />
        <text x="210" y="60" fontSize="10" fill="var(--fg)" fontFamily="var(--font-plex-mono)">+ Corrente</text>
        <path d="M210 90 H330" stroke="var(--accent)" strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (<path key={i} d={`M${220 + i * 28} 90 l8 -8 m-8 8 l8 8`} stroke="var(--accent)" strokeWidth="1.5" fill="none" />))}
        <text x="210" y="130" fontSize="9" fill="var(--muted)" fontFamily="var(--font-plex-mono)">DEPOSIÇÃO DO FILME</text>
        <rect x="210" y="140" width="120" height="14" fill="none" stroke="var(--line)" />
        <rect x="210" y="140" width="70" height="14" fill="var(--primary)" opacity="0.4" />
        <text x="210" y="185" fontSize="9" fill="var(--muted)" fontFamily="var(--font-plex-mono)">CURA · PROTEÇÃO</text>
      </svg>
    </div>
  );
}
