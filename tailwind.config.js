/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        // Primary
        primary: "var(--primary)",

        // Gray
        gray: {
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },

        // Appointment
        appointment: {
          "finished-bg": "var(--appointment-finished-bg)",
          "finished-icon-bg": "var(--appointment-finished-icon-bg)",
          "finished-treatment-type-border":
            "var(--appointment-finished-treatment-type-border)",
          "upcoming-bg": "var(--appointment-upcoming-bg)",
          "upcoming-icon-bg": "var(--appointment-upcoming-icon-bg)",
          "upcoming-treatment-type-border":
            "var(--appointment-upcoming-treatment-type-border)",
          "finished-not-paid-bg": "var(--appointment-finished-not-paid-bg)",
          "finished-not-paid-icon-bg":
            "var(--appointment-finished-not-paid-icon-bg)",
          "finished-not-paid-treatment-type-border":
            "var(--appointment-finished-not-paid-treatment-type-border)",
          "status-finished-bg": "var(--appointment-status-finished-bg)",
          "status-encounter-bg": "var(--appointment-status-encounter-bg)",
          "status-registered-bg": "var(--appointment-status-registered-bg)",
        },

        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
