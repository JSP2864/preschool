/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bubble: {
          50:  '#fff5f8',
          100: '#ffe6ef',
          200: '#fbccdc',
          300: '#f7a8c1',
          400: '#f482a1',
          500: '#ec5d80',
          600: '#d83f6a',
          700: '#b32a55',
          800: '#8a1f43',
          900: '#601633',
        },
        'sky-soft': '#dff3fa',
      },
      fontFamily: {
        display: ['Fredoka', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Quicksand', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
