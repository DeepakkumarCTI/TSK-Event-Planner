/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tsk: { red: '#e91e4f', orange: '#ff9e18', gold: '#ffc247', ink: '#17121b', cream: '#fff8f1', muted: '#756b75' }
      },
      fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Playfair Display', 'serif'] },
      boxShadow: { glow: '0 16px 50px rgba(233,30,79,.22)' }
    }
  },
  plugins: []
}