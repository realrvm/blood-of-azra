/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      md: '1070px',
    },
    fontFamily: {
      yatra: ['var(--font-family-yatra)', 'sans-serif'],
      vinque: ['var(--font-family-vinque)', 'sans-serif'],
    },
    backgroundImage: {
      'azra-desktop': "url('src/assets/images/bg-desktop.png')",
      'azra-handset': "url('src/assets/images/bg-mobile.png')",
    },
    colors: {
      beige: 'var(--font-beige)',
      light: 'var(--font-light)',
      white: 'var(--font-white)',
      black: 'var(--font-black)',
    },
  },
  plugins: [require('tailwindcss-primeui')],
}
