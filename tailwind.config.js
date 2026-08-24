/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: '#1F2933',
          dark: '#182026',
          light: '#263238',
        },
        charcoal: {
          DEFAULT: '#2D3748',
          card: '#324148',
          hover: '#3D4C54',
          border: 'rgba(255, 255, 255, 0.12)',
        },
        emerald: {
          DEFAULT: '#10B981',
          hover: '#059669',
          light: 'rgba(16, 185, 129, 0.15)',
        },
        coral: {
          DEFAULT: '#FF6B6B',
          hover: '#EE5253',
          light: 'rgba(255, 107, 107, 0.15)',
        },
        gold: {
          DEFAULT: '#F4C95D',
          hover: '#E5B843',
          light: 'rgba(244, 201, 93, 0.15)',
        },
        warm: {
          white: '#FFFDF7',
          card: '#FFFFFF',
          border: '#E5E7EB',
        },
        muted: {
          gray: '#667085',
        },
        campus: {
          bg: '#1F2933',
          card: '#324148',
          border: 'rgba(255, 255, 255, 0.12)',
          teal: '#10B981',
          violet: '#FF6B6B',
          cyan: '#F4C95D',
          blue: '#10B981',
          alert: '#FF6B6B',
          warning: '#F4C95D',
          success: '#10B981',
        }
      },
      textColor: {
        heading: '#FFFFFF',
        body: '#667085',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
        'soft': '0 4px 20px -2px rgba(16, 185, 129, 0.15)',
        'clean': '0 10px 30px -5px rgba(0, 0, 0, 0.25)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'glow-coral': '0 0 20px -3px rgba(255, 107, 107, 0.35)',
        'glow-gold': '0 0 20px -3px rgba(244, 201, 93, 0.35)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
