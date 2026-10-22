/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        regal: {
          50: '#fbf7f4',
          100: '#f6ede7',
          200: '#eddcd1',
          300: '#dec2b1',
          400: '#cba08a',
          500: '#bd846b',
          600: '#ab6f55',
          700: '#8e5843',
          800: '#744939',
          900: '#5f3d32',
          950: '#331e17',
        },
        emerald: {
          950: '#022c22',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.12)',
        'glass-glow': '0 0 25px rgba(234, 88, 12, 0.25)',
      },
    },
  },
  plugins: [],
};
