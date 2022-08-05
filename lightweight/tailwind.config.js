module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto"],
      },
      colors: {
        bg:
        {
          DEFAULT: "#1e1e1e",
          '100': "#d2d2d2",
          '200': "#a5a5a5",
          '300': "#787878",
          '400': "#4b4b4b",
          '500': "#181818", 
          '600': "#121212", 
        },
        primary: {
          light: "#ffd919",
          DEFAULT: "#e5e5e5",
          button: "#03dac6",
          buttonNav: "#e5e5e5",
          textBody: "#e5e5e5",
          textSub: "#e3e3e3",
          textTitle: "#858585",
        },
        buttonPrimary:
        {
          DEFAULT: "#03dac6",
          hover: "#02ae9e"
        },
        secondary: {
          button: "#c38fff",
          textBody: "#000000",
          light: "#474747",
          DEFAULT: "#333333",
          dark: "#2d2d2d",
          darker: "#282828",
        },
      },
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    height: ["responsive", "hover", "focus"],
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
