import type { Config } from "tailwindcss";

/**
 * Ported from the inline `tailwind-config` in agent/code.html, plus the
 * typographic scale from agent/DESIGN.md. Tailwind v4 loads this through
 * the `@config` directive in src/app/globals.css so the original class
 * names keep working unchanged.
 */
const config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#800020",
        "primary-container": "#5c0017",
        "on-primary": "#FFF4E0",
        secondary: "#B8923A",
        "secondary-container": "#EAD7B0",
        "on-secondary": "#221B08",
        background: "#F5EAD4",
        surface: "#F5EAD4",
        "surface-variant": "#EFE1C3",
        "surface-dim": "#E5D4B3",
        "surface-container": "#FBF4E6",
        "surface-container-high": "#F8EED9",
        "surface-container-low": "#FAF0DC",
        "surface-container-lowest": "#FFFDF7",
        "on-surface": "#3B2A20",
        "on-surface-variant": "#584141",
        outline: "#3B2A20",
        "antique-gold": "#B8923A",
        "ink-brown": "#3B2A20",
        "parchment-deep": "#EFE1C3",
        "parchment-light": "#FBF4E6",
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        lg: "0.625rem",
        xl: "1rem",
        full: "9999px",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.75rem",
        "space-xl": "2.5rem",
        gutter: "1.5rem",
        margin: "1.5rem",
      },
      fontFamily: {
        "display-hero": ["var(--font-cormorant)", "serif"],
        "headline-lg": ["var(--font-cormorant)", "serif"],
        "headline-md": ["var(--font-cormorant)", "serif"],
        "headline-sm": ["var(--font-cormorant)", "serif"],
        "body-lg": ["var(--font-eb-garamond)", "serif"],
        "body-md": ["var(--font-eb-garamond)", "serif"],
        "body-sm": ["var(--font-eb-garamond)", "serif"],
        "label-lg": ["var(--font-newsreader)", "serif"],
        "label-md": ["var(--font-newsreader)", "serif"],
        "label-sm": ["var(--font-newsreader)", "serif"],
      },
      fontSize: {
        "headline-xl": [
          "44px",
          { lineHeight: "52px", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        "headline-xl-mobile": [
          "32px",
          { lineHeight: "40px", fontWeight: "600", letterSpacing: "0em" },
        ],
        "headline-lg": [
          "34px",
          { lineHeight: "42px", fontWeight: "500", letterSpacing: "-0.005em" },
        ],
        "headline-lg-mobile": [
          "26px",
          { lineHeight: "34px", fontWeight: "500", letterSpacing: "0em" },
        ],
        "headline-md": ["26px", { lineHeight: "34px", fontWeight: "500" }],
        "headline-sm": ["21px", { lineHeight: "28px", fontWeight: "600" }],
        "title-md": [
          "18px",
          { lineHeight: "26px", fontWeight: "600", letterSpacing: "0.02em" },
        ],
        "title-sm": [
          "15px",
          { lineHeight: "22px", fontWeight: "600", letterSpacing: "0.03em" },
        ],
        "body-lg": ["19px", { lineHeight: "30px", fontWeight: "400" }],
        "body-md": ["17px", { lineHeight: "26px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "label-md": [
          "12px",
          { lineHeight: "16px", fontWeight: "500", letterSpacing: "0.08em" },
        ],
        "label-sm": [
          "10px",
          { lineHeight: "14px", fontWeight: "600", letterSpacing: "0.12em" },
        ],
      },
    },
  },
} satisfies Config;

export default config;
