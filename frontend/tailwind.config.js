/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sadaText: '#1f2937',
        sadaBorder: '#d1d5db',
        sadaCream: '#fef3c7',
        sadaPink: '#fde68a',
        sadaRed: '#ef3340',
        sadaYellow: '#f4c430',
        sadaOrange: '#d4af37',
        sadaGreen: '#00853f',
        sadaJade: '#1b5e20',
        sadaTerre: '#e8d292',
        sadaPalm: '#edf7ea',
        sadaSand: '#fff8e1'
      }
    }
  },
  plugins: []
};
