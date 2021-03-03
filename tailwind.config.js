module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['quicksand', 'sans-serif'],
      serif: ['quicksand', 'serif'],
    },
    extend: {
      textColor: {
        primary: '#226dd8',
      },
      backgroundColor: {
        primary: '#226dd8',
        'primary-hover': '#013c90'
      },
      height: {
        'px-70': 70,
        menu: 'calc(100vh - 70px)'
      },
      width: {
        'px-70': 70,
        'px-250': 250,
        100: 400,
        104: 416,
        108: 432,
        112: 448,
        116: 464
      },
      margin: {
        'px-70': '70px',
        'px-250': '250px'
      },
      padding: {
        'px-70': '70px',
        'px-250': '250px'
      },
      fontSize: {
        15: 15,
        11: 11
      },
      fontFamily: {
        'roboto-sans': "'Roboto', sans-serif"
      },
      boxShadow: {
        'c-1': '0 0 20px 0 rgb(0 0 0 / 30%)',
        'c-2': '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
