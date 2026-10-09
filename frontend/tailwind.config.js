/** @type {import('tailwindcss').Config} */

export default {
content: [
"./index.html",
"./src/**/*.{js,jsx,ts,tsx}"
],

theme: {
extend: {
fontFamily: {
sans: ["Inter", "system-ui", "sans-serif"],
mono: ["JetBrains Mono", "monospace"]
},


  colors: {
    cyber: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95"
    },

    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a"
    },

    threat: {
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c"
    },

    warning: {
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706"
    },

    safe: {
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a"
    },

    charcoal: {
      900: "#09090b",
      800: "#111116",
      700: "#18181f",
      600: "#222229"
    }
  },

  boxShadow: {
    cyber: "0 0 30px rgba(139,92,246,.12)",

    "cyber-sm":
      "0 0 18px rgba(139,92,246,.08)",

    "cyber-teal":
      "0 0 30px rgba(20,184,166,.10)",

    "cyber-violet":
      "0 0 30px rgba(139,92,246,.14)",

    "threat":
      "0 0 25px rgba(220,38,38,.10)"
  },

  backgroundImage: {
    "cyber-gradient":
      "linear-gradient(135deg, #7c3aed 0%, #14b8a6 100%)",

    "cyber-radial":
      "radial-gradient(circle at center, rgba(139,92,246,.14), transparent 65%)",

    "cyber-grid":
      "linear-gradient(rgba(167,139,250,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,.025) 1px, transparent 1px)"
  }
}


},

plugins: []
};
