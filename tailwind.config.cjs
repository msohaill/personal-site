const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ...defaultTheme.fontFamily,
        serif: ['Cormorant Garamond', ...defaultTheme.fontFamily.serif],
        sans: ['InterVariable', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        ...defaultTheme.fontSize,
        xs: '0.70rem',
        sm: '0.825rem',
        base: '0.95rem',
        xl: '1.20rem',
        '2xl': '1.45rem'
      }
    }
  },
  plugins: []
};
