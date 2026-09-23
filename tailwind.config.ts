import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        elevated: "var(--elevated)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        primary: "var(--primary)",
        "primary-ink": "var(--primary-ink)",
        accent: "var(--accent)",
        line: "var(--line)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        token: "var(--radius)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
      },
      maxWidth: { shell: "1200px", wide: "1320px" },
    },
  },
  plugins: [],
};

export default config;
