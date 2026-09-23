"use client";

import { useState } from "react";
import { Manrope, Inter } from "next/font/google";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, staggerItem } from "@/components/Reveal";
import {
  company,
  nav,
  heroIntro,
  ecoatIntro,
  processFlow,
  systemFactors,
  serviceGroups,
  labValue,
  positioning,
} from "@/lib/content";

const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

export default function V1() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`theme-v1 ${manrope.variable} ${inter.variable} min-h-screen bg-bg font-body text-fg`}
      style={{ ["--font-heading" as string]: "var(--font-manrope)", ["--font-body" as string]: "var(--font-inter)" }}
      id="top"
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
        <div className="shell flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-token bg-primary text-sm font-bold text-white">L</span>
            <span className="font-heading text-lg font-bold tracking-tight">{company.name}</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-muted transition-colors hover:text-primary">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#contato" className="hidden rounded-token bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-ink md:inline-block">
            Fale conosco
          </a>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-fg" />
              <span className="block h-0.5 w-6 bg-fg" />
              <span className="block h-0.5 w-6 bg-fg" />
            </div>
          </button>
        </div>
        {open && (
          <div className="border-t border-line bg-bg md:hidden">
            <div className="shell flex flex-col gap-1 py-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-token px-2 py-2 text-sm font-medium text-fg hover:bg-surface">
                  {n.label}
                </a>
              ))}
              <a href="#contato" onClick={() => setOpen(false)} className="mt-2 rounded-token bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white">
                Fale conosco
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="shell grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <Reveal>
            <p className="eyebrow text-accent">Laboratório de E-coat / Eletrodeposição</p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
              Tecnologia que protege.{" "}
              <span className="text-primary">Conhecimento que transforma resultados.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{heroIntro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contato" className="rounded-token bg-primary px-6 py-3 font-semibold text-white shadow-card transition-colors hover:bg-primary-ink">
                Fale conosco
              </a>
              <a href="#eletrodeposicao" className="rounded-token border border-line bg-elevated px-6 py-3 font-semibold text-fg transition-colors hover:border-primary hover:text-primary">
                Entenda a eletrodeposição
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <CoatingVisual />
          </Reveal>
        </div>
      </section>

      {/* INTRO E-COAT */}
      <section id="eletrodeposicao" className="border-b border-line py-16 md:py-24">
        <div className="shell grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
          <Reveal>
            <p className="eyebrow text-accent">O que é</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Eletrodeposição, de forma clara</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {["E-coat", "KTL", "Cataforese"].map((t) => (
                <span key={t} className="rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium text-primary">{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted">{ecoatIntro}</p>
            <a href="#servicos" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all">
              Entenda a eletrodeposição <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* FLUXO DO PROCESSO */}
      <section className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <Reveal><p className="eyebrow text-accent">Fluxo do processo</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Do banho à proteção</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {processFlow.map((s, i) => (
              <motion.div key={s.step} variants={staggerItem} className="rounded-token border border-line bg-elevated p-6 shadow-soft">
                <span className="font-heading text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-heading text-lg font-bold">{s.step}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CONCEITO DO SISTEMA */}
      <section className="border-b border-line py-16 md:py-24">
        <div className="shell grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="eyebrow text-accent">O conceito</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              E-coat não é apenas uma tinta. <span className="text-primary">É um sistema.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              O desempenho depende da interação entre variáveis. Cada uma influencia o resultado final do revestimento.
            </p>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.06}>
            {systemFactors.map((f) => (
              <motion.div key={f} variants={staggerItem} className="rounded-token border border-line bg-surface px-4 py-5 text-center text-sm font-semibold text-fg">
                {f}
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <Reveal><p className="eyebrow text-accent">Serviços</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">O que o laboratório faz</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {serviceGroups.map((g) => (
              <motion.article key={g.title} variants={staggerItem} className="flex flex-col rounded-token border border-line bg-elevated p-6 shadow-soft">
                <h3 className="font-heading text-lg font-bold text-primary">{g.title}</h3>
                <ul className="mt-3 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* POR QUE O LABORATÓRIO IMPORTA */}
      <section className="border-b border-line py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-accent">Por que o laboratório importa</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Resultados não são apenas números</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">Eles ajudam a compreender processos e a apoiar decisões técnicas.</p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {labValue.map((v) => (
              <motion.div key={v.title} variants={staggerItem} className="rounded-token border border-line bg-surface p-6">
                <h3 className="font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="border-b border-line bg-primary py-16 text-white md:py-24">
        <div className="shell grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <Reveal>
            <p className="eyebrow text-white/70">Sobre nós</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">Parceiro técnico em sistemas de E-coat</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{positioning}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href="#contato" className="inline-block rounded-token bg-white px-6 py-3 font-semibold text-primary transition-transform hover:-translate-y-0.5">
              Conheça o laboratório
            </a>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" className="py-16 md:py-24">
        <div className="shell">
          <Reveal className="mx-auto max-w-2xl rounded-token border border-line bg-surface p-10 text-center shadow-card">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Precisa avaliar seu processo de E-coat?</h2>
            <p className="mt-4 text-lg text-muted">Fale com nossa equipe e solicite uma análise.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#" className="rounded-token bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-ink">Fale com nossa equipe</a>
              <a href="#" className="rounded-token border border-line bg-elevated px-6 py-3 font-semibold text-fg transition-colors hover:border-primary hover:text-primary">Solicite uma análise</a>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* Visual do hero: componente metálico + camadas de revestimento (placeholder limpo) */
function CoatingVisual() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-md rounded-token border border-line bg-surface p-8 shadow-card">
      <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Camadas de revestimento sobre substrato metálico">
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9d3df" />
            <stop offset="1" stopColor="#9aa8b8" />
          </linearGradient>
        </defs>
        {[
          { y: 150, h: 40, fill: "url(#metal)", label: "Substrato" },
          { y: 128, h: 22, fill: "var(--primary-ink)", label: "Pré-tratamento" },
          { y: 108, h: 20, fill: "var(--primary)", label: "Filme E-coat" },
        ].map((l) => (
          <g key={l.label}>
            <rect x="40" y={l.y} width="200" height={l.h} fill={l.fill} rx="2" />
            <line x1="240" y1={l.y + l.h / 2} x2="284" y2={l.y + l.h / 2} stroke="var(--line)" />
            <text x="288" y={l.y + l.h / 2 + 3} fontSize="9" fill="var(--muted)" fontFamily="var(--font-body)">{l.label}</text>
          </g>
        ))}
        <text x="40" y="70" fontSize="11" fill="var(--muted)" fontFamily="var(--font-body)">Proteção anticorrosiva</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${70 + i * 40} 96 q6 -14 12 0`} stroke="var(--accent)" fill="none" strokeWidth="1.5" />
        ))}
      </svg>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-token bg-primary text-sm font-bold text-white">L</span>
            <span className="font-heading text-lg font-bold">{company.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{company.tagline}</p>
        </div>
        {[
          { h: "Navegação", items: nav.map((n) => n.label) },
          { h: "Serviços", items: serviceGroups.map((g) => g.title) },
          { h: "Contato", items: ["Solicitar análise", "Fale conosco", "— (a definir)"] },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="font-heading text-sm font-bold">{col.h}</h4>
            <ul className="mt-3 space-y-2">
              {col.items.map((it) => (
                <li key={it} className="text-sm text-muted">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</span>
          <span>Dados legais e endereço — a definir.</span>
        </div>
      </div>
    </footer>
  );
}
