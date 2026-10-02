"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* Vídeo: painel de teste se movendo pela tela em 4 estados, fundo BRANCO.
   O painel alterna lados; o texto fica sempre no lado OPOSTO.
   Coloque public/video/tech.mp4 (10s, ~2,5s por estado). */
const STEPS = [
  { t: "Substrato", d: "Metal nu, antes de qualquer proteção.", side: "right" },
  { t: "Pré-tratamento", d: "A superfície é preparada para ancorar o revestimento.", side: "left" },
  { t: "E-coat", d: "O filme se deposita uniforme, cobrindo cavidades e bordas.", side: "right" },
  { t: "Proteção", d: "A peça sai revestida e protegida contra a corrosão.", side: "left" },
] as const;

function Caption({
  step,
  index,
  total,
  progress,
}: {
  step: { t: string; d: string; side: "left" | "right" };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const opacity = useTransform(
    progress,
    [start, start + seg * 0.25, end - seg * 0.25, end],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start, start + seg * 0.25], [22, 0]);
  const pos =
    step.side === "right"
      ? "right-[6vw] items-end text-right"
      : "left-[6vw] items-start text-left";
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute top-1/2 flex max-w-sm -translate-y-1/2 flex-col ${pos}`}
    >
      <span className="font-mono text-xs font-semibold tracking-[0.2em] text-accent">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-heading text-3xl font-bold tracking-tight text-fg sm:text-5xl">
        {step.t}
      </h3>
      <p className="mt-3 text-lg leading-relaxed text-muted">{step.d}</p>
    </motion.div>
  );
}

export function TechProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [hasVideo, setHasVideo] = useState(false);
  const total = STEPS.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const target = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration || !isFinite(v.duration)) return;
    target.current = Math.min(p, 0.999) * v.duration;
  });
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && v.duration && isFinite(v.duration) && v.readyState >= 1) {
        const cur = v.currentTime;
        const diff = target.current - cur;
        if (Math.abs(diff) > 0.02) v.currentTime = cur + diff * 0.3;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const mark = () => setHasVideo(true);
    if (v.readyState >= 2) mark();
    v.addEventListener("loadeddata", mark);
    v.addEventListener("canplay", mark);
    return () => {
      v.removeEventListener("loadeddata", mark);
      v.removeEventListener("canplay", mark);
    };
  }, []);

  if (reduced) {
    return (
      <section className="bg-surface py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow text-accent">O sistema de revestimento</p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight md:text-[2.5rem]">
            Da peça crua à peça protegida
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.t} className="border-t border-line pt-4">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-heading text-lg font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[280vh] bg-surface">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-surface">
        {/* vídeo do painel (fundo branco), movendo-se pela tela */}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            hasVideo ? "opacity-100" : "opacity-0"
          }`}
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/tech.mp4" type="video/mp4" />
          <source src="/video/process.mp4" type="video/mp4" />
        </video>

        {/* eyebrow fixo no topo */}
        <p className="absolute left-1/2 top-10 -translate-x-1/2 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-muted">
          O sistema de revestimento
        </p>

        {/* textos por etapa — lado oposto ao painel */}
        {STEPS.map((s, i) => (
          <Caption
            key={s.t}
            step={s}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        {/* barra de progresso */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-line">
          <motion.div
            style={{ scaleX: barScaleX, transformOrigin: "left" }}
            className="h-full"
          >
            <div className="h-full w-full bg-accent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
