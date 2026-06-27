import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        "bg-elevated": "var(--bg-elevated)",
        "bg-overlay": "var(--bg-overlay)",
        // Text
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        "fg-subtle": "var(--fg-subtle)",
        // Accent
        accent: "var(--accent)",
        "accent-bright": "var(--accent-bright)",
        "accent-2": "var(--accent-2)",
        // Legacy aliases
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
        strong: "var(--border-strong)",
      },
      fontFamily: {
        // Wired to next/font CSS variables set in layout.tsx.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      // Fluid type scale (clamp = scales smoothly between mobile and desktop).
      fontSize: {
        "fluid-xs": "clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)",
        "fluid-sm": "clamp(0.875rem, 0.84rem + 0.18vw, 0.9375rem)",
        "fluid-base": "clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)",
        "fluid-lg": "clamp(1.125rem, 1.06rem + 0.3vw, 1.25rem)",
        "fluid-xl": "clamp(1.375rem, 1.25rem + 0.6vw, 1.75rem)",
        "fluid-2xl": "clamp(1.75rem, 1.5rem + 1.2vw, 2.5rem)",
        "fluid-3xl": "clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem)",
        "fluid-display": "clamp(2.75rem, 1.8rem + 4.6vw, 6rem)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "in-out-soft": "var(--ease-in-out-soft)",
      },
      maxWidth: {
        container: "72rem", // 1152px — main content width
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s var(--ease-out-expo) both",
      },
    },
  },
  plugins: [],
};
export default config;
