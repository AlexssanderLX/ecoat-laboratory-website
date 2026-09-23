"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
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
  knowledgeTopics,
} from "@/lib/content";

const manrope = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function Icon({ name, className }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    bath: <><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" {...stroke} /><path d="M7 12V6a2 2 0 0 1 2-2h1" {...stroke} /><path d="M10 6h3" {...stroke} /></>,
    flask: <><path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3" {...stroke} /><path d="M8 15h8" {...stroke} /></>,
    layers: <><path d="M12 3 3 8l9 5 9-5-9-5Z" {...stroke} /><path d="M3 13l9 5 9-5" {...stroke} /></>,
    doc: <><path d="M7 3h7l4 4v14H7V3Z" {...stroke} /><path d="M14 3v4h4" {...stroke} /><path d="M9 12h6M9 16h6" {...stroke} /></>,
    users: <><circle cx="9" cy="8" r="3" {...stroke} /><path d="M3 20c0-3 3-5 6-5s6 2 6 5M16 6a3 3 0 0 1 0 6" {...stroke} /></>,
    search: <><circle cx="11" cy="11" r="6" {...stroke} /><path d="m20 20-3.5-3.5" {...stroke} /></>,
    compare: <><path d="M4 20V8M10 20V4M16 20v-8M22 20V6" {...stroke} /></>,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" {...stroke} /></>,
    shieldcheck: <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" {...stroke} /><path d="m9 11 2 2 4-4" {...stroke} /></>,
    pulse: <><path d="M3 12h4l2 6 4-14 2 8h6" {...stroke} /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" {...stroke} /></>,
  };
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{paths[name]}</svg>;
}

const serviceIcons = ["bath", "flask", "layers", "doc", "users"];
const labIcons = ["search", "compare", "pulse", "spark", "shieldcheck", "layers"];

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
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (<a key={n.href} href={n.href} className="text-sm font-medium text-muted transition-colors hover:text-primary">{n.label}</a>))}
          </nav>
          <a href="#contato" className="hidden rounded-token bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-ink lg:inline-block">Fale conosco</a>
          <button className="lg:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <div className="space-y-1.5"><span className="block h-0.5 w-6 bg-fg" /><span className="block h-0.5 w-6 bg-fg" /><span className="block h-0.5 w-6 bg-fg" /></div>
          </button>
        </div>
        {open && (
          <div className="border-t border-line bg-bg lg:hidden"><div className="shell flex flex-col gap-1 py-3">
            {nav.map((n) => (<a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-token px-2 py-2 text-sm font-medium hover:bg-surface">{n.label}</a>))}
            <a href="#contato" onClick={() => setOpen(false)} className="mt-2 rounded-token bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white">Fale conosco</a>
          </div></div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-surface to-bg">
        <div className="shell grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <Reveal>
            <p className="eyebrow text-accent">Laboratório de E-coat / Eletrodeposição</p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl">
              Tecnologia que protege. <span className="text-primary">Conhecimento que transforma resultados.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{heroIntro}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["E-coat", "KTL", "Cataforese"].map((t) => (<span key={t} className="rounded-full border border-line bg-elevated px-3 py-1 text-sm font-medium text-primary">{t}</span>))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contato" className="inline-flex items-center gap-2 rounded-token bg-primary px-6 py-3 font-semibold text-white shadow-card transition-colors hover:bg-primary-ink">Fale conosco <Icon name="arrow" className="h-4 w-4" /></a>
              <a href="#eletrodeposicao" className="rounded-token border border-line bg-elevated px-6 py-3 font-semibold text-fg transition-colors hover:border-primary hover:text-primary">Entenda a eletrodeposição</a>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-token border border-line shadow-card">
              <div className="relative aspect-[4/3]">
                <Image src="/images/hero-line.jpg" alt="Carroceria metálica em linha de produção, antes da proteção anticorrosiva" fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute bottom-3 left-3 rounded-token bg-bg/85 px-3 py-1.5 text-xs font-medium text-fg backdrop-blur">
                Proteção anticorrosiva de componentes metálicos
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAIXA DE CAPACIDADES */}
      <section className="border-b border-line bg-primary text-white">
        <RevealGroup className="shell grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {serviceGroups.slice(0, 4).map((g, i) => (
            <motion.div key={g.title} variants={staggerItem} className="flex items-center gap-3">
              <Icon name={serviceIcons[i]} className="h-6 w-6 shrink-0 text-white/80" />
              <span className="text-sm font-semibold leading-tight">{g.title}</span>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* INTRO E-COAT */}
      <section id="eletrodeposicao" className="border-b border-line py-16 md:py-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-token border border-line shadow-card">
              <div className="relative aspect-[4/3]"><Image src="/images/engineering.jpg" alt="Mesa de engenharia com desenhos técnicos, instrumentos de medição e componentes" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-accent">O que é</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Eletrodeposição, de forma clara</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{ecoatIntro}</p>
            <a href="#servicos" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3">Entenda a eletrodeposição <Icon name="arrow" className="h-4 w-4" /></a>
          </Reveal>
        </div>
      </section>

      {/* FLUXO */}
      <section className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <Reveal><p className="eyebrow text-accent">Fluxo do processo</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Do banho à proteção</h2></Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {processFlow.map((s, i) => (
              <motion.div key={s.step} variants={staggerItem} className="group relative rounded-token border border-line bg-elevated p-6 shadow-soft transition-shadow hover:shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-token bg-primary/10 font-heading text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading text-lg font-bold">{s.step}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CONCEITO DO SISTEMA */}
      <section className="border-b border-line py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow text-accent">O conceito</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">E-coat não é apenas uma tinta. <span className="text-primary">É um sistema.</span></h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">O desempenho do revestimento depende da interação entre variáveis. Cada uma influencia o resultado — e cada uma pode ser medida e compreendida.</p>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.05}>
            {systemFactors.map((f, i) => (
              <motion.div key={f} variants={staggerItem} className="rounded-token border border-line bg-surface p-4">
                <span className="font-heading text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1 text-sm font-semibold leading-snug">{f}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl"><p className="eyebrow text-accent">Serviços</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">O que o laboratório faz</h2><p className="mt-4 text-lg text-muted">Ensaios, análises, documentação e capacitação para todo o ciclo do E-coat.</p></Reveal>
          <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {serviceGroups.map((g, i) => (
              <motion.article key={g.title} variants={staggerItem} className="flex flex-col rounded-token border border-line bg-elevated p-6 shadow-soft transition-shadow hover:shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-token bg-primary/10 text-primary"><Icon name={serviceIcons[i]} className="h-5 w-5" /></span>
                  <h3 className="font-heading text-lg font-bold text-primary">{g.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (<li key={it} className="flex gap-2 text-sm text-muted"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{it}</li>))}
                </ul>
              </motion.article>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* POR QUE O LABORATÓRIO IMPORTA */}
      <section className="border-b border-line py-16 md:py-24">
        <div className="shell">
          <Reveal className="max-w-2xl"><p className="eyebrow text-accent">Por que o laboratório importa</p><h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Resultados não são apenas números</h2><p className="mt-4 text-lg leading-relaxed text-muted">Eles ajudam a compreender processos e a apoiar decisões técnicas.</p></Reveal>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {labValue.map((v, i) => (
              <motion.div key={v.title} variants={staggerItem} className="rounded-token border border-line bg-surface p-6">
                <span className="grid h-10 w-10 place-items-center rounded-token bg-primary/10 text-primary"><Icon name={labIcons[i]} className="h-5 w-5" /></span>
                <h3 className="mt-4 font-heading text-lg font-bold">{v.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{v.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CONTEÚDO TÉCNICO (teaser) */}
      <section className="border-b border-line bg-surface py-16 md:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-accent">Conhecimento</p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-4xl">Falando sobre eletrodeposição</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">Uma área dedicada a explicar a tecnologia — do princípio químico ao papel do laboratório.</p>
            <a href="#" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3">Ver conteúdos <Icon name="arrow" className="h-4 w-4" /></a>
          </Reveal>
          <RevealGroup className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
            {knowledgeTopics.slice(0, 6).map((t) => (
              <motion.a key={t} href="#" variants={staggerItem} className="group flex items-center justify-between gap-2 rounded-token border border-line bg-elevated px-4 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
                {t}<Icon name="arrow" className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </motion.a>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="border-b border-line py-16 md:py-24">
        <div className="shell grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-accent">Sobre nós</p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl">Parceiro técnico em sistemas de E-coat</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{positioning}</p>
            <a href="#contato" className="mt-6 inline-flex items-center gap-2 rounded-token bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-ink">Conheça o laboratório <Icon name="arrow" className="h-4 w-4" /></a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-token border border-line shadow-card">
              <div className="relative aspect-[4/3]"><Image src="/images/automotive.jpg" alt="Componentes automotivos metálicos — aplicação típica de E-coat" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="contato" className="py-16 md:py-24">
        <div className="shell">
          <Reveal className="mx-auto max-w-3xl rounded-token border border-line bg-surface p-10 text-center shadow-card md:p-14">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">Precisa avaliar seu processo de E-coat?</h2>
            <p className="mt-4 text-lg text-muted">Fale com nossa equipe e solicite uma análise.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#" className="rounded-token bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-ink">Fale com nossa equipe</a>
              <a href="#" className="rounded-token border border-line bg-elevated px-6 py-3 font-semibold text-fg transition-colors hover:border-primary hover:text-primary">Solicite uma análise</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line bg-surface">
        <div className="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-token bg-primary text-sm font-bold text-white">L</span><span className="font-heading text-lg font-bold">{company.name}</span></div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{company.tagline}</p>
          </div>
          {[{ h: "Navegação", items: nav.map((n) => n.label) }, { h: "Serviços", items: serviceGroups.map((g) => g.title) }, { h: "Contato", items: ["Solicitar análise", "Fale conosco", "— (a definir)"] }].map((col) => (
            <div key={col.h}><h4 className="font-heading text-sm font-bold">{col.h}</h4><ul className="mt-3 space-y-2">{col.items.map((it) => (<li key={it} className="text-sm text-muted">{it}</li>))}</ul></div>
          ))}
        </div>
        <div className="border-t border-line"><div className="shell flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row"><span>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</span><span>Dados legais e endereço — a definir.</span></div></div>
      </footer>
    </div>
  );
}
