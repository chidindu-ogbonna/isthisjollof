module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        'light-gray': 'var(--light-gray)',
        'dark-gray': 'var(--dark-gray)',
        'orange-1': 'var(--orange-1)',
        'orange-2': 'var(--orange-2)',
        blue: 'var(--blue)',
        red: 'var(--red)',
        green: 'var(--green)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },

      fontSize: {
        '7xl': '6rem',
        '8xl': '8rem',
        '9xl': '12rem',
        '10xl': '16rem',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
