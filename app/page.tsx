"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, staggerItem } from "@/components/Reveal";
import { ProcessStory } from "@/components/ProcessStory";
import { HeroVideo } from "@/components/HeroVideo";
import { SystemScreen } from "@/components/SystemScreen";
import { SystemSum } from "@/components/SystemSum";
import { TechProcess } from "@/components/TechProcess";
import {
  company,
  nav,
  serviceGroups,
  labValue,
  positioning,
  knowledgeTopics,
} from "@/lib/content";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

/* Marca simples (placeholder de logo — trocável quando o cliente enviar o vetor) */
function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5">
      <span
        className={`grid h-8 w-8 place-items-center rounded-token font-mono text-sm font-bold ${
          onDark ? "bg-white text-primary" : "bg-primary text-white"
        }`}
      >
        L
      </span>
      <span
        className={`font-heading text-lg font-semibold tracking-tight ${
          onDark ? "text-white" : "text-fg"
        }`}
      >
        {company.name}
      </span>
    </a>
  );
}

export default function LabHome() {
  const [started, setStarted] = useState(false);

  // Preloader: mostra a tela de carregamento por no mínimo ~1,6s e até o vídeo
  // do hero estar pronto (máx. 3,5s). Só então o hero começa.
  useEffect(() => {
    const t0 = Date.now();
    const MIN = 1600;
    const MAX = 3500;
    let raf = 0;
    const check = () => {
      const v = document.getElementById("hero-video") as HTMLVideoElement | null;
      const elapsed = Date.now() - t0;
      const ready = !v || v.readyState >= 3; // sem vídeo (reduced) conta como pronto
      if (elapsed >= MAX || (elapsed >= MIN && ready)) {
        setStarted(true);
        return;
      }
      raf = requestAnimationFrame(check);
    };
    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(check);
    }, 150);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`theme-lab ${plex.variable} ${plexMono.variable} min-h-[100dvh] bg-bg font-body text-fg`}
      style={{
        ["--font-heading" as string]: "var(--font-plex)",
        ["--font-body" as string]: "var(--font-plex)",
        ["--font-mono" as string]: "var(--font-plex-mono)",
      }}
      id="top"
    >
      {/* ==================== PRELOADER ==================== */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-ink transition-opacity duration-700 ${
          started ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden={started}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, rgba(53,201,224,0.12), transparent 70%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-6">
          <div
            className="rounded-token border px-7 py-5"
            style={{
              borderColor: "rgba(53,201,224,0.45)",
              boxShadow:
                "0 0 44px rgba(53,201,224,0.16), inset 0 0 22px rgba(53,201,224,0.08)",
            }}
          >
            <span
              className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl"
              style={{ textShadow: "0 0 22px rgba(53,201,224,0.35)" }}
            >
              LabEnDiTec
            </span>
          </div>
          <span className="block h-px w-44 overflow-hidden bg-white/15">
            <span
              className="block h-full w-full origin-left"
              style={{
                background: "var(--accent-glow)",
                animation: "loadbar 1.6s ease-in-out forwards",
              }}
            />
          </span>
        </div>
      </div>

      {/* ==================== HERO (vídeo de laboratório + H1 central) ==================== */}
      <HeroVideo start={started} />

      {/* ==================== ELETRODEPOSIÇÃO (tela cheia — 2ª página de filme) ==================== */}
      <SystemScreen />

      {/* ==================== PROCESSO (vídeo interativo — hexágono, full-bleed) ==================== */}
      <section id="processo">
        <ProcessStory />
      </section>

      {/* ==================== SISTEMA (soma das partes — hover + equação) ==================== */}
      <SystemSum />

      {/* ==================== COMO O E-COAT SE FORMA (vídeo scrubado + etapas) ==================== */}
      <TechProcess />

      {/* ==================== VALOR DO LAB (lista editorial, sem cards) ==================== */}
      <section id="sobre" className="bg-bg py-20 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
              Por que um laboratório?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Porque aquilo que não é medido não pode ser verdadeiramente
              controlado. Resultados de laboratório não são apenas números: são
              informação para decisões técnicas.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-token border border-line shadow-card">
              <Image
                src="/images/lab-ph-ecoat.jpg"
                alt="Medição de pH em banho de E-coat no laboratório"
                fill
                sizes="(max-width:1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <RevealGroup
            className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2"
            stagger={0.06}
          >
            {labValue.map((v) => (
              <motion.div
                key={v.title}
                variants={staggerItem}
                className="border-t-2 border-line pt-4"
              >
                <h3 className="font-heading text-xl font-semibold">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ==================== SERVIÇOS (folha agrupada, hairline só entre grupos) ==================== */}
      <section id="servicos" className="bg-surface py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow text-accent">Ensaios &amp; Capacitação</p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl font-bold tracking-tight md:text-[2.5rem]">
              O que o laboratório entrega
            </h2>
          </Reveal>

          <div className="mt-12">
            {serviceGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.05}>
                <div className="grid gap-4 border-t border-line py-7 md:grid-cols-[0.9fr_2fr] md:gap-10">
                  <h3 className="font-heading text-xl font-semibold text-primary">
                    {g.title}
                  </h3>
                  <ul className="flex flex-wrap gap-x-3 gap-y-2.5">
                    {g.items.map((it) => (
                      <li
                        key={it}
                        className="rounded-token border border-line bg-elevated px-3 py-1.5 font-mono text-[13px] text-fg"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs text-muted">
            Escopo detalhado de cada ensaio: a definir com o cliente.
          </p>
        </div>
      </section>

      {/* ==================== CONHECIMENTO (índice de autoridade, scroll-snap) ==================== */}
      <section className="bg-bg py-20 md:py-28">
        <div className="shell">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight md:text-[2.5rem]">
              Falando sobre eletrodeposição
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Uma base técnica em construção, para transformar conhecimento em
              autoridade.
            </p>
          </Reveal>

          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {knowledgeTopics.map((t) => (
              <a
                key={t}
                href="#contato"
                className="group flex min-w-[15rem] shrink-0 snap-start flex-col justify-between rounded-token border border-line bg-surface p-6 transition-colors hover:border-accent"
              >
                <span className="font-heading text-lg font-semibold leading-snug">
                  {t}
                </span>
                <span className="mt-8 font-mono text-xs uppercase tracking-wider text-accent">
                  Ler
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== POSICIONAMENTO (faixa da marca) ==================== */}
      <section className="grain relative overflow-hidden bg-primary-ink py-24 text-white md:py-32">
        <div className="shell">
          <Reveal>
            <p
              className="max-w-4xl font-heading text-2xl font-medium leading-[1.35] tracking-tight md:text-[2rem]"
            >
              {positioning}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================== CONTATO (split, uma CTA) ==================== */}
      <section id="contato" className="bg-surface py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
              Precisa avaliar seu processo de E-coat?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Fale com o laboratório para investigar desvios, comparar materiais
              ou acompanhar a estabilidade do seu banho.
            </p>
            <a
              href="mailto:contato@labenditec.com"
              className="mt-8 inline-block rounded-token bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Fale conosco
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="grid gap-px overflow-hidden rounded-token border border-line bg-line">
              {[
                { k: "E-mail", v: "a definir" },
                { k: "Telefone / WhatsApp", v: "a definir" },
                { k: "Endereço", v: "a definir" },
                { k: "LinkedIn", v: "a definir" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between bg-elevated px-5 py-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                    {row.k}
                  </dt>
                  <dd className="text-sm font-medium text-fg">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-line bg-bg">
        <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {company.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">
              Contato
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>a definir</li>
              <li>
                <a href="#contato" className="transition-colors hover:text-primary">
                  Fale conosco
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="shell flex flex-col items-center justify-between gap-2 py-5 font-mono text-xs text-muted sm:flex-row">
            <span>
              © {new Date().getFullYear()} {company.name}
            </span>
            <span>Dados legais: a definir.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
