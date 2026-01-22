import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HDG Brand Colors (from logo)
        hdg: {
          blue: {
            DEFAULT: "#3B6B9C",
            light: "#5A8BBF",
            dark: "#2A4F73",
            muted: "#E8F0F7",
            50: "#F0F6FB",
            100: "#E1EDF7",
            200: "#C3DBF0",
            300: "#96BFE3",
            400: "#6A9FD3",
            500: "#3B6B9C",
            600: "#2F5680",
            700: "#264567",
            800: "#1E374F",
            900: "#162839",
            950: "#0D1A25",
          },
          dark: {
            DEFAULT: "#3A3A3A",
            light: "#525252",
            muted: "#6B7280",
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            400: "#9CA3AF",
            500: "#6B7280",
            600: "#4B5563",
            700: "#3A3A3A",
            800: "#1F2937",
            900: "#111827",
            950: "#030712",
          },
        },
        // Semantic colors using HDG palette
        primary: {
          DEFAULT: "#3B6B9C",
          foreground: "#FFFFFF",
          50: "#F0F6FB",
          100: "#E1EDF7",
          200: "#C3DBF0",
          300: "#96BFE3",
          400: "#6A9FD3",
          500: "#3B6B9C",
          600: "#2F5680",
          700: "#264567",
          800: "#1E374F",
          900: "#162839",
          950: "#0D1A25",
        },
        secondary: {
          DEFAULT: "#3A3A3A",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#5A8BBF",
          foreground: "#FFFFFF",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slide-in-left 0.4s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
