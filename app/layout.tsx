import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LabEnDiTec — Propostas de Homepage",
  description:
    "Ambiente de avaliação: três propostas visuais (V1, V2, V3) para o site institucional do laboratório de E-coat / eletrodeposição.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
