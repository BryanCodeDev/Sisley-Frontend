/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sisley: {
          black: '#000000',
          white: '#FFFFFF',
          bg: '#FAFAFA',
          surface: '#FFFFFF',
          border: '#E5E5E5',
          'border-strong': '#D4D4D4',
          muted: '#737373',
          'muted-strong': '#A3A3A3',
          text: '#171717',
          'text-secondary': '#525252',
          'text-tertiary': '#737373',
          dark: '#0a0a0a',
          'dark-surface': '#171717',
          'dark-muted': '#a3a3a3',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-geist-serif)', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        md: '4px',
        lg: '6px',
      },
      boxShadow: {
        none: '0 0 transparent',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'editorial': '0 0 0 1px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)',
      },
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '200ms',
        slow: '300ms',
        'slower': '500ms',
        'editorial': '700ms',
        'cinematic': '1000ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      aspectRatio: {
        'product': '3 / 4',
        'editorial': '4 / 5',
        'banner': '16 / 9',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'slide-x': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-out': 'fade-out 300ms ease-out forwards',
        'slide-up': 'slide-up 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slide-down 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 1000ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-soft': 'pulse-soft 2ms ease-in-out',
        'slide-x': 'slide-x 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
}
