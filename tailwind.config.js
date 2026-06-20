/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        cream: {
          50: "#FFFBF7",
          100: "#FFF9F5",
          200: "#FDF1E8",
        },
        butterfly: {
          pink: "#E8B4D4",
          "pink-light": "#F5D9E8",
          "pink-deep": "#D28FB8",
          green: "#86B98E",
          "green-light": "#B7D9BC",
          "green-deep": "#5F9368",
          ink: "#3A3A3A",
          gold: "#D4A574",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif SC"', "serif"],
        sans: ['"Noto Sans SC"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 32px rgba(134, 185, 142, 0.12)",
        card: "0 4px 24px rgba(232, 180, 212, 0.15)",
        hover: "0 16px 40px rgba(134, 185, 142, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        flutter: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "lifecycle-fade-in": {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "timeline-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(134, 185, 142, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(134, 185, 142, 0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        flutter: "flutter 4s ease-in-out infinite",
        "lifecycle-fade-in": "lifecycle-fade-in 0.6s ease-out forwards",
        "timeline-pulse": "timeline-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
