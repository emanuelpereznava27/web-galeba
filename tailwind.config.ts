import type { Config } from "tailwindcss";

/**
 * Design tokens de Logistics Galeba.
 * Los colores viven como variables CSS en `globals.css` (fuente única de verdad)
 * y aquí se exponen como utilidades de Tailwind.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem", // 24px móvil
        lg: "3rem", // 48px desktop
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        azul: {
          corporativo: "#003F94",
          profundo: "#0A2A66",
          medio: "#2B7FE0",
          claro: "#E8F0FB",
        },
        gris: {
          texto: "#3A4556",
          borde: "#D6DEEA",
        },
        acento: {
          rojo: "#D62828",
          amarillo: "#F4C20D",
        },
        verde: {
          check: "#2EA44F",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        field: "8px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,63,148,.12)",
        lg: "0 20px 50px rgba(10,42,102,.18)",
      },
      maxWidth: {
        container: "1240px",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(.22,1,.36,1)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.9)", opacity: "0.25" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "bounce-down": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(8px)", opacity: "0.4" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
        "bounce-down": "bounce-down 1.8s ease-in-out infinite",
        "fade-in": "fade-in 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
