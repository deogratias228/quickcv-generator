const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    extend: {
      colors: {
        // on réassigne en HEX/RGB
        blue: colors.blue,
        gray: colors.gray,
        primary: '#2563eb',   // ex: bleu
        secondary: '#1f2937', // ex: gris foncé
      },
    },
  },
  corePlugins: {
    // désactive la nouvelle génération lab()
    textOpacity: true,
    backgroundOpacity: true,
  },
}
