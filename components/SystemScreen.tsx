"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

/* Parâmetros reais que o laboratório mede (do briefing do cliente) + microtexto. */
const PARAMS = [
  { name: "pH", desc: "Acidez do banho. Fora da faixa, a deposição e a estabilidade mudam." },
  { name: "Condutividade", desc: "Sinaliza sais e contaminação; influencia corrente e espessura." },
  { name: "Sólidos", desc: "Teor de sólidos (NV): a tinta disponível no banho." },
  { name: "Camada", desc: "Espessura do filme depositado: define proteção e aparência." },
  { name: "Cura", desc: "Reticulação sob calor: garante as propriedades finais do filme." },
];
const PTS: [number, number][] = [
  [55, 232],
  [160, 150],
  [262, 196],
  [364, 112],
  [455, 158],
];
const PATH_D = `M ${PTS.map((p) => p.join(",")).join(" L ")}`;
const VW = 510;
const VH = 300;

function MeasureViz() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full rounded-token border border-line bg-surface p-5 shadow-card">
      {/* header */}
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span>Parâmetros do sistema</span>
        <span className="flex items-center gap-2" style={{ color: "var(--accent)" }}>
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: "var(--accent-glow)" }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </span>
          medição
        </span>
      </div>

      {/* área do gráfico (SVG + camada interativa sobreposta) */}
      <div className="relative">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="h-auto w-full" role="img" aria-label="Curva de medição dos parâmetros do processo E-coat">
          <defs>
            <pattern id="meshGrid" width="34" height="34" patternUnits="userSpaceOnUse">
              <path d="M34 0H0V34" fill="none" stroke="var(--line)" strokeWidth="1" />
            </pattern>
            <linearGradient id="fadeFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <filter id="dotGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width={VW} height="250" fill="url(#meshGrid)" opacity="0.7" />

          {/* área sob a curva */}
          <motion.path
            d={`${PATH_D} L 455 250 L 55 250 Z`}
            fill="url(#fadeFill)"
            initial={{ opacity: reduced ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
          />

          {/* curva que se desenha */}
          <motion.path
            id="measPath"
            d={PATH_D}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />

          {/* efeito constante: ponto de medição percorrendo a curva */}
          {!reduced && (
            <circle r="5" fill="var(--accent-glow)" filter="url(#dotGlow)">
              <animateMotion dur="4.5s" repeatCount="indefinite" calcMode="linear">
                <mpath href="#measPath" />
              </animateMotion>
            </circle>
          )}

          {/* nós */}
          {PTS.map((p, i) => {
            const on = active === i;
            return (
              <motion.g
                key={PARAMS[i].name}
                initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduced ? 0 : 0.3 + i * 0.26, duration: 0.4 }}
                style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
              >
                {on && (
                  <circle cx={p[0]} cy={p[1]} r="14" fill="var(--accent)" opacity="0.12" />
                )}
                <circle
                  cx={p[0]}
                  cy={p[1]}
                  r={on ? 8 : 7}
                  fill="var(--surface)"
                  stroke="var(--accent)"
                  strokeWidth={on ? 3 : 2.5}
                />
                <line x1={p[0]} y1={p[1] + 9} x2={p[0]} y2="262" stroke="var(--line)" strokeWidth="1" />
                <text
                  x={p[0]}
                  y="282"
                  textAnchor="middle"
                  className="font-mono"
                  fontSize="11"
                  fill={on ? "var(--accent)" : "var(--muted)"}
                >
                  {PARAMS[i].name}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* camada interativa: alvos + tooltip */}
        <div className="absolute inset-0">
          {PARAMS.map((p, i) => {
            const left = (PTS[i][0] / VW) * 100;
            const top = (PTS[i][1] / VH) * 100;
            const anchor =
              i === 0
                ? "translate(-8%, -118%)"
                : i === PARAMS.length - 1
                  ? "translate(-92%, -118%)"
                  : "translate(-50%, -118%)";
            return (
              <div key={p.name} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
                <button
                  type="button"
                  aria-label={`Parâmetro: ${p.name}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((a) => (a === i ? null : i))}
                  className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus:outline-none"
                />
                {active === i && (
                  <div
                    className="absolute z-10 w-48 rounded-token border border-line bg-surface p-3 shadow-card"
                    style={{ transform: anchor }}
                  >
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                      {p.name}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-muted">{p.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] text-muted">
        Passe o cursor nos pontos para ver o que cada parâmetro revela.
      </p>
    </div>
  );
}

export function SystemScreen() {
  return (
    <section
      id="eletrodeposicao"
      className="relative flex min-h-[100dvh] items-center bg-bg"
    >
      <div className="shell grid w-full items-center gap-x-14 gap-y-12 lg:grid-cols-[1fr_1fr]">
        {/* TEXTO */}
        <div>
          <Reveal>
            <p className="eyebrow text-accent">O papel do laboratório</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 max-w-[16ch] font-heading text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Aquilo que não é{" "}
              <span style={{ color: "var(--accent)" }}>medido</span> não pode ser
              controlado.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              Um sistema E-coat pode mudar mesmo quando parece normal. Pequenas
              variações na química do banho, no pré-tratamento ou na cura alteram
              o filme. Medir e interpretar o que não se vê é o que transforma
              resultado em decisão.
            </p>
          </Reveal>
        </div>

        {/* VISUAL — curva de medição interativa */}
        <Reveal delay={0.1}>
          <MeasureViz />
        </Reveal>
      </div>

      {/* role para baixo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-fg/40">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          role para baixo
        </span>
        <span className="cue-bob inline-block">
          <span className="block h-2.5 w-2.5 rotate-45 border-b border-r border-fg/40" />
        </span>
      </div>
    </section>
  );
}
