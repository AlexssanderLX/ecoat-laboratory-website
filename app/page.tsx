import Link from "next/link";

const proposals = [
  {
    id: "v1",
    name: "Corporate Clean",
    desc: "Clara, corporativa e minimalista. Bastante branco, azul corporativo, cards discretos.",
    fonts: "Manrope + Inter",
    swatch: ["#1257a6", "#2e86de", "#f6f8fb"],
  },
  {
    id: "v2",
    name: "Technical Industrial",
    desc: "Técnica e industrial. Azul profundo e grafite, linhas de engenharia, rótulos monoespaçados.",
    fonts: "IBM Plex Sans + IBM Plex Mono",
    swatch: ["#123650", "#1e6091", "#eef2f6"],
  },
  {
    id: "v3",
    name: "Premium Editorial",
    desc: "Editorial e sofisticada. Tipografia serif forte, muito espaço em branco, composição ampla.",
    fonts: "Newsreader + Source Sans 3",
    swatch: ["#1b3a5b", "#3e6e9e", "#faf9f6"],
  },
];

export default function Home() {
  return (
    <main
      style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}
      className="min-h-screen bg-[#0f1720] text-white"
    >
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/80">
          Ambiente de avaliação — LabEnDiTec
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
          Três propostas de homepage para você comparar.
        </h1>
        <p className="mt-4 max-w-2xl text-white/60">
          Mesmo conteúdo e posicionamento, três direções visuais diferentes. Escolha uma direção e ela
          vira o design system do restante do site.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {proposals.map((p) => (
            <Link
              key={p.id}
              href={`/${p.id}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  {p.id.toUpperCase()}
                </span>
                <div className="ml-auto flex gap-1.5">
                  {p.swatch.map((c) => (
                    <span
                      key={c}
                      className="h-4 w-4 rounded-full ring-1 ring-white/20"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{p.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{p.desc}</p>
              <p className="mt-4 text-xs text-white/40">{p.fonts}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-300">
                Ver proposta
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-xs text-white/35">
          Esta tela de seleção existe apenas para avaliação e não faz parte da identidade final do site.
        </p>
      </div>
    </main>
  );
}
