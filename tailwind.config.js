/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          main: "#ffffff",
          accent_1: "#4b4b4b",
          accent_2: "#010101",
          primary: "#e31818",
          secondary: "#111111",
          state: {
            success: "#29c279",
            info: "#0da6f2",
            warning: "#f2cc0d",
            error: "#f20d0d",
          },
        },
        dark: {
          main: "#121212",
          accent_1: "#181818",
          accent_2: "#ffffff",
          primary: "#E31C25",
          primary_hover: "#BB000E",
          secondary: "#E31C25",
          secondary_hover: "#BB000E",
          state: {
            success: "#C8FBEA",
            info: "#86D2F9",
            warning: "#F9E686",
            error: "#F98686",
          },
        },
      },
    },
  },
  plugins: [],
};
