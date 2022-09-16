module.exports = {
    darkMode: 'class',
    content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                body: ["Roboto"],
            },
            colors: {
                bg:
                    {
                        DEFAULT: "#ffffff",
                        dark: "#121212",
                        darkOffset: "#181818"
                    },
                text:
                    {
                        DEFAULT: "#000000",
                        dark: "#e5e5e5",
                        darkSub: "#e3e3e3",
                        darkTitle: "#858585",
                    },
                primary: {
                    light: "#ffd919",
                    DEFAULT: "#e5e5e5",
                    button: "#03dac6",
                    buttonNav: "#e5e5e5",
                },
                buttonPrimary:
                    {
                        DEFAULT: "#cf0015",
                        hover: "#67000a",
                        dark: "#03dac6",
                        darkHover: "#02ae9e"
                    },
                buttonSecondary:
                    {
                        DEFAULT: "#cf0015",
                        hover: "#67000a",
                        dark: "#BB86FC",
                        darkHover: "#BB86FC"
                    },
                secondary: {
                    button: "#BB86FC",
                    DEFAULT: "#333333",
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
