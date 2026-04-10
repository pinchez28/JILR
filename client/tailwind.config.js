/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable dark mode via class

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },

      colors: {
        primary: {
          DEFAULT: '#7A0000',
          light: '#9B1C1C',
          dark: '#5A0000',
        },

        secondary: {
          DEFAULT: '#D4A017',
          light: '#E6B84A',
          dark: '#B78A12',
        },

        blueTheme: {
          DEFAULT: '#2563EB', // main blue
          light: '#3B82F6',
          dark: '#1E40AF',
        },

        background: {
          light: '#2563EB', // ✅ light theme now uses blueTheme.DEFAULT
          dark: '#0f172a', // dark theme
        },

        surface: {
          light: '#f8fafc', // card backgrounds in light mode
          dark: '#1e293b', // card backgrounds in dark mode
        },

        text: {
          light: '#1e293b',
          dark: '#f1f5f9',
        },

        accent: {
          light: '#f1f5f9',
          dark: '#334155',
        },
      },

      animation: {
        borderGlow: 'borderGlow 6s linear infinite',
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
        fadeIn: 'fadeIn 0.6s ease-in-out',
      },

      keyframes: {
        borderGlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(59,130,246,0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(59,130,246,0.8)' },
        },

        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },

  plugins: [],
};
