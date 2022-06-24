const {
  colors,
  borderRadius,
  fontFamily,
  fontSize,
  screens,
  spacing,
} = require('@kiosk/styles');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './../../shared/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
      screens,
      spacing,
      fontSize,
      fontFamily,
      borderRadius,
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
