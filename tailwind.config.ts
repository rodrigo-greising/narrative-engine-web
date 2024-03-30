import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'blue-violet': {
          '50': '#f0f3fd',
          '100': '#e3e8fc',
          '200': '#cdd4f8',
          '300': '#aeb8f3',
          '400': '#8d93ec',
          '500': '#7171e3',
          '600': '#6056d5',
          '700': '#5f54c0',
          '800': '#433c97',
          '900': '#3b3679',
          '950': '#232046',
        }, 
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config