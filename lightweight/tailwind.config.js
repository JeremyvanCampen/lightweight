module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Azo Sans'],
      },
      colors: {
        primary: {
          light: '#ffd919',
          DEFAULT: "#e5e5e5",
          button: '#03dac6',
          buttonNav: '#e5e5e5',
          textBody: '#e5e5e5',
          textSub: '#e3e3e3',
          textTitle: '#858585',
          dark: '#1e1e1e',
          darker: '#121212'
        },
        secondary: {
          button: '#c38fff',
          textBody: '#000000',
          light: '#474747',
          DEFAULT: '#333333',
          dark: '#2d2d2d',
          darker: '#282828',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
