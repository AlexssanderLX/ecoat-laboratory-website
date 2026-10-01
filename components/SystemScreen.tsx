"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

/* Parâmetros reais que o laboratório mede (do briefing do cliente). */
const PARAMS = ["pH", "Condutividade", "Sólidos", "Camada", "Cura"];
// posições da curva (x por parâmetro, y = variação ilustrativa)
const PTS: [number, number][] = [
  [55, 232],
  [160, 150],
  [262, 196],
  [364, 112],
  [455, 158],
];
const PATH_D = `M ${PTS.map((p) => p.join(",")).join(" L ")}`;

function MeasureViz() {
  const reduced = useReducedMotion();
  return (
    <div className="relative w-full overflow-hidden rounded-token border border-line bg-surface p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span>Parâmetros do sistema</span>
        <span style={{ color: "var(--accent)" }}>medição</span>
      </div>
      <svg viewBox="0 0 510 300" className="h-auto w-full" role="img" aria-label="Curva de medição dos parâmetros do processo E-coat">
        <defs>
          <pattern id="meshGrid" width="34" height="34" patternUnits="userSpaceOnUse">
            <path d="M34 0H0V34" fill="none" stroke="var(--line)" strokeWidth="1" />
          </pattern>
          <linearGradient id="fadeFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grade */}
        <rect x="0" y="0" width="510" height="250" fill="url(#meshGrid)" opacity="0.7" />

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

        {/* nós + rótulos dos parâmetros */}
        {PTS.map((p, i) => (
          <motion.g
            key={PARAMS[i]}
            initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: reduced ? 0 : 0.3 + i * 0.26, duration: 0.4 }}
            style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
          >
            <circle cx={p[0]} cy={p[1]} r="7" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2.5" />
            <line x1={p[0]} y1={p[1] + 8} x2={p[0]} y2="262" stroke="var(--line)" strokeWidth="1" />
            <text
              x={p[0]}
              y="282"
              textAnchor="middle"
              className="font-mono"
              fontSize="11"
              fill="var(--muted)"
            >
              {PARAMS[i]}
            </text>
          </motion.g>
        ))}
      </svg>
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

        {/* VISUAL — curva de medição */}
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
