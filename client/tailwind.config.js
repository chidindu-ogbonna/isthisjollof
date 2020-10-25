const spacingValues = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
}

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

      height: { ...spacingValues },

      maxWidth: { ...spacingValues },

      maxHeight: { ...spacingValues },

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
