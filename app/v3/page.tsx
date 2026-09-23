"use client";

import { useState } from "react";
import { Newsreader, Source_Sans_3 } from "next/font/google";
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
} from "@/lib/content";

const news = Newsreader({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-news" });
const source = Source_Sans_3({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-source" });

export default function V3() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`theme-v3 ${news.variable} ${source.variable} min-h-screen bg-bg font-body text-fg`}
      style={{ ["--font-heading" as string]: "var(--font-news)", ["--font-body" as string]: "var(--font-source)" }}
      id="top"
    >
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
        <div className="shell flex h-20 items-center justify-between">
          <a href="#top" className="font-heading text-2xl font-semibold tracking-tight">{company.name}</a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (<a key={n.href} href={n.href} className="text-sm text-muted transition-colors hover:text-fg">{n.label}</a>))}
          </nav>
          <a href="#contato" className="hidden border-b-2 border-primary pb-0.5 text-sm font-semibold text-primary md:inline-block">Fale conosco</a>
          <button className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <div className="space-y-1.5"><span className="block h-0.5 w-6 bg-fg" /><span className="block h-0.5 w-6 bg-fg" /><span className="block h-0.5 w-6 bg-fg" /></div>
          </button>
        </div>
        {open && (
          <div className="border-t border-line bg-bg md:hidden"><div className="shell flex flex-col py-3">
            {nav.map((n) => (<a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-sm text-fg">{n.label}</a>))}
            <a href="#contato" onClick={() => setOpen(false)} className="mt-2 font-semibold text-primary">Fale conosco →</a>
          </div></div>
        )}
      </header>

      {/* HERO */}
      <section className="border-b border-line">
        <div className="shell py-20 md:py-32">
          <Reveal>
            <p className="eyebrow text-primary">E-coat · KTL · Cataforese</p>
            <h1 className="mt-6 max-w-4xl font-heading text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
              E-coat não é apenas uma tinta. <span className="italic text-primary">É um sistema.</span>
            </h1>
            <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <p className="max-w-xl text-xl leading-relaxed text-muted">
                Laboratório especializado em eletrodeposição — do banho ao filme, do ensaio à informação. Tecnologia que protege, conhecimento que transforma resultados.
              </p>
              <div className="flex flex-wrap gap-4 md:justify-end">
                <a href="#contato" className="bg-primary px-7 py-3.5 font-semibold text-white transition-colors hover:bg-primary-ink">Fale conosco</a>
                <a href="#eletrodeposicao" className="border border-fg/20 px-7 py-3.5 font-semibold text-fg transition-colors hover:border-fg">Entenda mais</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO */}
      <section id="eletrodeposicao" className="border-b border-line py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-[0.8fr_1.4fr]">
          <Reveal><h2 className="font-heading text-3xl font-medium leading-tight md:text-4xl">O que é eletrodeposição</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="font-heading text-2xl font-normal leading-relaxed text-fg/90">{ecoatIntro}</p>
            <a href="#servicos" className="mt-8 inline-block border-b-2 border-primary pb-1 font-semibold text-primary">Entenda a eletrodeposição</a>
          </Reveal>
        </div>
      </section>

      {/* FLUXO — editorial numerado */}
      <section className="border-b border-line py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl"><p className="eyebrow text-primary">O processo</p>
            <h2 className="mt-4 font-heading text-4xl font-medium tracking-tight md:text-5xl">Do banho à proteção</h2></Reveal>
          <RevealGroup className="mt-14 divide-y divide-line border-y border-line" stagger={0.06}>
            {processFlow.map((s, i) => (
              <motion.div key={s.step} variants={staggerItem} className="grid grid-cols-[auto_1fr] gap-6 py-6 md:grid-cols-[80px_1fr_1.5fr] md:items-baseline md:gap-10">
                <span className="font-heading text-3xl font-normal text-primary/40 md:text-4xl">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-2xl font-medium md:text-3xl">{s.step}</h3>
                <p className="col-span-2 text-lg leading-relaxed text-muted md:col-span-1">{s.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SISTEMA */}
      <section className="border-b border-line bg-surface py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="eyebrow text-primary">O conceito</p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-tight md:text-5xl">O desempenho nasce da interação.</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">Cada variável do sistema influencia o resultado final do revestimento — e cada uma pode ser medida e compreendida.</p>
          </Reveal>
          <RevealGroup className="space-y-px" stagger={0.06}>
            {systemFactors.map((f, i) => (
              <motion.div key={f} variants={staggerItem} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="font-heading text-lg text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-heading text-2xl font-medium">{f}</span>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SERVIÇOS — índice editorial */}
      <section id="servicos" className="border-b border-line py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl"><p className="eyebrow text-primary">Serviços</p>
            <h2 className="mt-4 font-heading text-4xl font-medium tracking-tight md:text-5xl">O que o laboratório faz</h2></Reveal>
          <div className="mt-14 space-y-14">
            {serviceGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.04}>
                <div className="grid gap-6 border-t border-line pt-8 md:grid-cols-[0.9fr_1.6fr]">
                  <div className="flex items-baseline gap-4">
                    <span className="font-heading text-2xl text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-heading text-2xl font-medium md:text-3xl">{g.title}</h3>
                  </div>
                  <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                    {g.items.map((it) => (<li key={it} className="text-lg leading-relaxed text-muted">{it}</li>))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LAB VALUE */}
      <section className="border-b border-line bg-surface py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl"><p className="eyebrow text-primary">Por que o laboratório importa</p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-tight md:text-5xl">Resultados não são apenas números.</h2></Reveal>
          <RevealGroup className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {labValue.map((v) => (
              <motion.div key={v.title} variants={staggerItem} className="border-t-2 border-primary pt-4">
                <h3 className="font-heading text-2xl font-medium">{v.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="border-b border-line py-20 md:py-28">
        <div className="shell grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <Reveal>
            <p className="eyebrow text-primary">Sobre nós</p>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-tight tracking-tight md:text-5xl">Parceiro técnico em sistemas de E-coat.</h2>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{positioning}</p>
          </Reveal>
          <Reveal delay={0.1}><a href="#contato" className="inline-block border-b-2 border-primary pb-1 font-heading text-2xl font-medium text-primary">Conheça o laboratório →</a></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="py-20 md:py-32">
        <div className="shell text-center">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="font-heading text-4xl font-medium leading-tight tracking-tight md:text-6xl">Precisa avaliar seu processo de E-coat?</h2>
            <p className="mt-6 text-xl text-muted">Fale com nossa equipe e solicite uma análise.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-primary px-8 py-4 font-semibold text-white transition-colors hover:bg-primary-ink">Fale com nossa equipe</a>
              <a href="#" className="border border-fg/20 px-8 py-4 font-semibold text-fg transition-colors hover:border-fg">Solicite uma análise</a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-line bg-surface">
        <div className="shell grid gap-8 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <span className="font-heading text-2xl font-semibold">{company.name}</span>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-muted">{company.tagline}</p>
          </div>
          {[{ h: "Navegação", items: nav.map((n) => n.label) }, { h: "Serviços", items: serviceGroups.map((g) => g.title) }, { h: "Contato", items: ["Solicitar análise", "Fale conosco", "— (a definir)"] }].map((col) => (
            <div key={col.h}>
              <h4 className="font-heading text-base font-semibold">{col.h}</h4>
              <ul className="mt-3 space-y-2">{col.items.map((it) => (<li key={it} className="text-sm text-muted">{it}</li>))}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-line"><div className="shell flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row"><span>© {new Date().getFullYear()} {company.name}</span><span>Dados legais e endereço — a definir.</span></div></div>
      </footer>
    </div>
  );
}
