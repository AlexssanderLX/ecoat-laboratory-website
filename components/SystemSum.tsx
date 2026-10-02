"use client";

import { useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Reveal } from "@/components/Reveal";

/* Partes do sistema. Arraste cada uma para a "conta" e some o desempenho. */
const FACTORS = [
  { n: "Substrato", d: "O metal base define o ponto de partida." },
  { n: "Pré-tratamento", d: "Prepara e ancora a superfície." },
  { n: "Banho E-coat", d: "A química da tinta controla o filme." },
  { n: "Parâmetros", d: "Tensão, tempo e temperatura regem a deposição." },
  { n: "Cura", d: "A reticulação forma as propriedades finais." },
  { n: "Análise", d: "Medir e interpretar fecha o ciclo." },
];

export function SystemSum() {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [placed, setPlaced] = useState<number[]>([]);
  const total = FACTORS.length;
  const pct = Math.round((placed.length / total) * 100);
  const complete = placed.length >= total;

  const place = (i: number) =>
    setPlaced((p) => (p.includes(i) ? p : [...p, i]));

  const onDragEnd = (i: number, info: PanInfo) => {
    const z = zoneRef.current?.getBoundingClientRect();
    if (!z) return;
    const { x, y } = info.point;
    if (x >= z.left && x <= z.right && y >= z.top && y <= z.bottom) place(i);
  };

  return (
    <section id="sistema" className="bg-primary py-20 text-white md:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
            O desempenho é a soma das partes.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Arraste cada parte para a conta e veja o desempenho se somar até o
            máximo. Nenhuma variável age sozinha.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {/* POOL — partes arrastáveis */}
          <div>
            <p className="eyebrow mb-4 text-white/50">As partes</p>
            <div className="flex flex-wrap gap-3">
              {FACTORS.map((f, i) =>
                placed.includes(i) ? null : (
                  <motion.button
                    key={f.n}
                    type="button"
                    drag
                    dragSnapToOrigin
                    dragElastic={0.2}
                    whileDrag={{ scale: 1.06, zIndex: 50 }}
                    onDragEnd={(_, info) => onDragEnd(i, info)}
                    onClick={() => place(i)}
                    className="cursor-grab touch-none rounded-token border border-white/15 bg-white/[0.05] px-4 py-3 text-left transition-colors hover:bg-white/[0.1] active:cursor-grabbing"
                  >
                    <p className="font-heading text-base font-semibold leading-snug">
                      {f.n}
                    </p>
                    <p className="mt-0.5 text-xs text-white/55">{f.d}</p>
                  </motion.button>
                ),
              )}
              {complete && (
                <p className="self-center font-mono text-xs text-white/50">
                  Todas as partes somadas.
                </p>
              )}
            </div>
            <p className="mt-5 font-mono text-[11px] text-white/40">
              Dica: arraste (ou clique) cada parte para a conta ao lado.
            </p>
          </div>

          {/* CONTA — zona de soma + medidor de desempenho */}
          <div
            ref={zoneRef}
            className="flex flex-col rounded-token border-2 border-dashed p-6 transition-colors duration-300"
            style={{
              borderColor: complete
                ? "var(--accent-glow)"
                : "rgba(255,255,255,0.22)",
              background: complete
                ? "color-mix(in srgb, var(--accent-glow) 10%, transparent)"
                : "rgba(255,255,255,0.03)",
            }}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-heading text-lg font-bold">Desempenho</span>
              <span
                className="font-mono text-2xl font-bold"
                style={{ color: "var(--accent-glow)" }}
              >
                {pct}%
              </span>
            </div>

            {/* medidor */}
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--accent-glow)" }}
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>

            {/* chips das partes somadas */}
            <div className="mt-6 flex min-h-[4.5rem] flex-wrap content-start gap-2">
              {placed.length === 0 && (
                <span className="self-center text-sm text-white/40">
                  Solte as partes aqui.
                </span>
              )}
              {placed.map((i) => (
                <motion.span
                  key={FACTORS[i].n}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-token border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-xs"
                >
                  {FACTORS[i].n}
                </motion.span>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <p
                className="font-heading text-lg font-semibold"
                style={{ color: complete ? "var(--accent-glow)" : undefined }}
              >
                {complete
                  ? "Desempenho máximo alcançado."
                  : "Reúna as partes para alcançar o desempenho máximo."}
              </p>
              {placed.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPlaced([])}
                  className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/50 underline-offset-4 hover:text-white hover:underline"
                >
                  Recomeçar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
