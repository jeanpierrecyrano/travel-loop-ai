import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "premium-blue": "#0f172a", // Un blu notte molto elegante
        "premium-accent": "#ea580c", // Un arancione acceso per evidenziare bottoni e icone
        "premium-sand": "#f8fafc", // Un grigio chiarissimo per dare profondità alla pagina
        "premium-green": "#166534", // Verde bosco
      }
    },
  },
  plugins: [],
};
export default config;