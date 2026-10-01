import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LabEnDiTec — Laboratório de E-coat e Eletrodeposição",
  description:
    "Laboratório especializado em E-coat / eletrodeposição (KTL, cataforese): ensaio, diagnóstico e conhecimento técnico para processos de revestimento industrial.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
