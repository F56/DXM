const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      black: colors.black,
      yellow: colors.yellow,
      green: colors.green,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      purple: colors.purple,
      sky: colors.sky,
      indigo: colors.indigo,
      teal: colors.teal,
    },
    extend: {},
  },
  plugins: [],
};
