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
        // 🎨 BRAND COLORS — matched to jesusislordradio.info
        // Primary red extracted from the official JILR logo (#DB0000)
        primary: {
          DEFAULT: '#DB0000', // Logo vibrant red
          light: '#FF1A1A', // Brighter hover/active red
          dark: '#B30000', // Darker red for pressed states
          deeper: '#8B0000', // Deep red for gradients
        },

        // Gold accent — complements the red for a ministerial feel
        secondary: {
          DEFAULT: '#D4A017', // Warm gold
          light: '#E6B84A', // Light gold
          dark: '#B78A12', // Dark gold
        },

        // Blue tones — inspired by the header banner's deep sky
        blueTheme: {
          DEFAULT: '#0131FF', // Rich royal blue (from header image)
          light: '#3B82F6', // Bright blue
          dark: '#00198F', // Deep navy blue
        },

        // 🌊 Navy family — dark blues for navbars, footers, and gradients
        navy: {
          DEFAULT: '#0b1e3A', // Dark navy (navbar, footer backgrounds)
          light: '#1D3A5F', // Lighter navy (mobile menu drawer)
          gradient: '#254575', // Gradient start for page background
        },

        // Background colors — reference site uses clean white
        background: {
          light: '#FFFFFF', // ✅ Clean white (like the reference site)
          dark: '#0D1117', // Dark theme background
        },

        surface: {
          light: '#F5F5F5', // Card/section backgrounds in light mode
          dark: '#1A1A1A', // Card backgrounds in dark mode
        },

        text: {
          light: '#1F2937', // Near-black for readability on white
          dark: '#F9FAFB', // Near-white for readability on dark
        },

        accent: {
          light: '#F0F0F0', // Subtle accent borders/surfaces
          dark: '#2A2A2A', // Subtle dark accent
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
