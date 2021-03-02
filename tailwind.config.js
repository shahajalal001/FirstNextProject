module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: '#226dd8',
        'primary-hover': '#013c90'
      },
      width: {
        116: 464
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
