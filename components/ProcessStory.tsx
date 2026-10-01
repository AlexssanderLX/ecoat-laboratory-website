"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { company, processFlow } from "@/lib/content";

const POSTER = "/images/process-poster.jpg";
const GRADE = "grayscale(.35) contrast(1.06) brightness(.92) saturate(.9)";

/* Posições do hexágono (desktop), na ordem das 6 etapas — sentido horário. */
const HEX = [
  "left-[3%] top-[9%] w-[22%]",
  "right-[3%] top-[9%] w-[22%]",
  "right-[3%] top-1/2 -translate-y-1/2 w-[21%]",
  "right-[3%] bottom-[9%] w-[22%]",
  "left-[3%] bottom-[9%] w-[22%]",
  "left-[3%] top-1/2 -translate-y-1/2 w-[21%]",
];

function Node({
  step,
  desc,
  index,
  active,
  align = "left",
}: {
  step: string;
  desc: string;
  index: number;
  active: boolean;
  align?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 14,
        scale: active ? 1 : 0.96,
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${align === "right" ? "items-end text-right" : "items-start"}`}
    >
      <span
        className="font-mono text-xs font-semibold"
        style={{ color: "var(--accent-glow)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-1 font-heading text-lg font-bold leading-tight text-white sm:text-xl">
        {step}
      </h3>
      <p className="mt-1 text-[13px] leading-relaxed text-white/70">{desc}</p>
    </motion.div>
  );
}

export function ProcessStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const total = processFlow.length;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setCount(total);
      return;
    }
    const wrap = wrapRef.current;
    if (!wrap) return;

    let interval: ReturnType<typeof setInterval> | undefined;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      const v = videoRef.current;
      if (v) {
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      }
      const t0 = performance.now();
      interval = setInterval(() => {
        const vv = videoRef.current;
        const dur =
          vv && isFinite(vv.duration) && vv.duration ? vv.duration : 10;
        const step = dur / total;
        const t =
          vv && vv.currentTime > 0.05
            ? vv.currentTime
            : (performance.now() - t0) / 1000;
        const next = Math.min(total, Math.floor(t / step + 0.1));
        setCount((prev) => (next > prev ? next : prev));
        if (t >= dur && interval) clearInterval(interval);
      }, 120);
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        }),
      { threshold: 0.4 },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [reduced, total]);

  // Conforme os textos aparecem, o vídeo desfoca e escurece (foco no texto).
  const blur = count === 0 ? 0 : 3 + (count / total) * 7;
  const darken = 0.22 + (count / total) * 0.5;
  const done = count >= total;

  return (
    <div
      ref={wrapRef}
      className="grain relative overflow-hidden bg-primary-ink"
    >
      <div className="relative min-h-[100dvh]">
        {/* VÍDEO DE FUNDO */}
        {!reduced ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: `${GRADE} blur(${blur}px)`,
              transform: `scale(${count > 0 ? 1.06 : 1})`,
              transition: "filter .7s ease, transform .7s ease",
            }}
            muted
            playsInline
            preload="auto"
            poster={POSTER}
          >
            <source src="/video/process.mp4" type="video/mp4" />
            <source src="/video/process.webm" type="video/webm" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={POSTER}
            alt="Carroceria mergulhando no tanque de eletrodeposição"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: GRADE }}
          />
        )}

        {/* Escurecimento que cresce com os textos */}
        <div
          className="absolute inset-0 bg-primary-ink transition-opacity duration-700"
          style={{ opacity: darken }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-ink/70 via-transparent to-primary-ink/20" />

        {/* HEXÁGONO (desktop) */}
        <div className="absolute inset-0 hidden lg:block">
          {processFlow.map((s, i) => (
            <div key={s.step} className={`absolute ${HEX[i]}`}>
              <Node
                step={s.step}
                desc={s.desc}
                index={i}
                active={i < count}
                align={i >= 1 && i <= 3 ? "right" : "left"}
              />
            </div>
          ))}
        </div>

        {/* MOBILE: textos empilhados na base, na mesma sequência */}
        <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-4">
            {processFlow.map((s, i) => (
              <li key={s.step}>
                <Node step={s.step} desc={s.desc} index={i} active={i < count} />
              </li>
            ))}
          </ul>
        </div>

        {/* Frase de efeito no centro — surge quando os 6 já apareceram */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
            transition={{ duration: 0.8, delay: done ? 0.25 : 0 }}
            className="max-w-xl text-center font-heading text-2xl font-bold leading-snug text-white sm:text-3xl md:text-[2.5rem]"
          >
            {company.motto}
          </motion.p>
        </div>

        {/* "role para baixo" fraco, no rodapé — surge no fim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 1 : 0 }}
          transition={{ duration: 0.8, delay: done ? 0.7 : 0 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-white/45"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
            role para baixo
          </span>
          <span aria-hidden className="cue-bob inline-block">
            <span className="block h-2.5 w-2.5 rotate-45 border-b border-r border-white/50" />
          </span>
        </motion.div>
      </div>
    </div>
  );
}
