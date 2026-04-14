/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0f172a',
        accent: '#fbbf24',
        sadaRed: '#fbbf24',
        sadaYellow: '#fbbf24',
        sadaOrange: '#fbbf24',
        sadaGreen: '#fbbf24',
        sadaJade: '#fbbf24',
        sadaTerre: '#fbbf24',
        sadaPalm: '#fbbf24',
        sadaSand: '#0f172a'
      }
    }
  },
  plugins: []
};
