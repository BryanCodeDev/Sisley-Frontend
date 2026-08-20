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
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '150ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-out',
      },
      aspectRatio: {
        'product': '3 / 4',
        'editorial': '4 / 5',
        'banner': '16 / 9',
      },
    },
  },
  plugins: [],
}
