"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const GRADE = "grayscale(.3) contrast(1.05) brightness(.9) saturate(.9)";
const FULL = "E-coat não é apenas uma tinta. É um sistema.";
const CYAN_FROM = FULL.indexOf("É um sistema.");

export function HeroVideo({ start = false }: { start?: boolean }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(false); // libera o texto (~3,5s)
  const [typed, setTyped] = useState(0); // efeito máquina de escrever

  // só começa depois que o preloader termina (start); toca uma vez e agenda o texto
  useEffect(() => {
    if (reduced) {
      setShow(true);
      setTyped(FULL.length);
      return;
    }
    if (!start) return;
    const v = videoRef.current;
    if (v) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
    const t = setTimeout(() => setShow(true), 3500);
    return () => clearTimeout(t);
  }, [reduced, start]);

  // digita o H1 quando o texto é liberado
  useEffect(() => {
    if (!show || reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= FULL.length) clearInterval(id);
    }, 42);
    return () => clearInterval(id);
  }, [show, reduced]);

  const shown = FULL.slice(0, typed);
  const whitePart = shown.slice(0, Math.min(typed, CYAN_FROM));
  const cyanPart = typed > CYAN_FROM ? shown.slice(CYAN_FROM) : "";
  const typingDone = typed >= FULL.length;

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-primary-ink">
      {/* Placeholder: brilho ciano enquanto o vídeo carrega */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 55% at 50% 42%, rgba(53,201,224,0.14), transparent 70%)",
        }}
      />

      {/* VÍDEO DE FUNDO — toca uma vez e congela no último frame; desfoca quando o texto entra */}
      {!reduced && (
        <video
          ref={videoRef}
          id="hero-video"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: `${GRADE} blur(${show ? 9 : 0}px)`,
            transform: `scale(${show ? 1.06 : 1})`,
            transition: "filter 1s ease, transform 1s ease",
          }}
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
          <source src="/video/hero.webm" type="video/webm" />
        </video>
      )}

      {/* Escurecimento que entra junto com o texto (limpa o fundo) */}
      <div
        className="absolute inset-0 bg-primary-ink transition-opacity duration-1000"
        style={{ opacity: show ? 0.45 : 0.1 }}
      />

      {/* CONTEÚDO CENTRAL */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* eyebrow com linhas ciano */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <span
            className="h-px w-10"
            style={{ background: "var(--accent-glow)", opacity: 0.6 }}
          />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-white/75">
            Laboratório de Eletrodeposição
          </span>
          <span
            className="h-px w-10"
            style={{ background: "var(--accent-glow)", opacity: 0.6 }}
          />
        </motion.div>

        {/* H1 com efeito de digitação */}
        <h1 className="mt-6 min-h-[3.2em] font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:min-h-[2.2em] sm:text-6xl">
          <span>{whitePart}</span>
          <span style={{ color: "var(--accent-glow)" }}>{cyanPart}</span>
          {show && !typingDone && (
            <span
              className="ml-0.5 inline-block w-[0.06em] animate-pulse self-stretch"
              style={{ background: "var(--accent-glow)" }}
              aria-hidden
            >
              &nbsp;
            </span>
          )}
        </h1>

        {/* CTAs entram após a digitação */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: typingDone ? 1 : 0, y: typingDone ? 0 : 10 }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contato"
            className="rounded-token bg-white px-6 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            Fale conosco
          </a>
          <a
            href="#processo"
            className="rounded-token border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Entenda o processo
          </a>
        </motion.div>
      </div>

      {/* "role para baixo" fraco — igual ao da seção do vídeo de baixo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: typingDone ? 1 : 0 }}
        transition={{ duration: 0.8, delay: typingDone ? 0.4 : 0 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-white/45"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          role para baixo
        </span>
        <span aria-hidden className="cue-bob inline-block">
          <span className="block h-2.5 w-2.5 rotate-45 border-b border-r border-white/50" />
        </span>
      </motion.div>
    </section>
  );
}
