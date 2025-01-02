/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        "modal-overlay-open": "modal-overlay-open 300ms forwards ease-in-out",
        "modal-overlay-exit": "modal-overlay-exit 300ms forwards ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "modal-overlay-open": {
          from: {
            "background-color": "rgba(0,0,0,0)",
          },
          to: {
            "background-color": "rgba(0,0,0,0.4)",
          },
        },
        "modal-overlay-exit": {
          from: {
            "background-color": "rgba(0,0,0,0.4)",
          },
          to: {
            "background-color": "rgba(0,0,0,0)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        highlight: "var(--highlight)",
        gray: {
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
        success: "hsl(var(--success))",
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
        background: "hsl(var(--background))",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "var(--primary-foreground)",
          light: "var(--primary-light)",
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
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          light: "var(--destructive-light)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: {
          DEFAULT: "var(--input)",
          invalid: "hsl(var(--input-invalid))",
        },
        error: "hsl(var(--error))",
        border: "var(--border)",
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
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
};
