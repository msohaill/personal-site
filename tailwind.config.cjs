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
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        ...defaultTheme.fontSize,
        xs: '0.70rem',
        sm: '0.825rem',
        base: '0.95rem',
        lg: '1.075rem',
        xl: '1.20rem',
        '2xl': '1.45rem',
      },
      colors: {
        'pastel-red': '#af4d54',
        'pastel-red-light': '#e36d75',
        'pastel-blue': '#2b3c5d',
      },
    },
  },
  plugins: [],
};
