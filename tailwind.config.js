/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          brown: {
            DEFAULT: "#DF7844",
            100: "#FFF1CE",
            200: "#FFD08E",
            300: "#FFBF6E",
            400: "#FFAE4D",
            500: "#EF9439",
          },
          orange: {
            DEFAULT: "#EF4734",
            dark: "#C23525"
          },
          gray: {
            DEFAULT: "#898989",
            100: "#E9E9E9",
            200: "#D9D9D9",
            300: "#C7C7C7",
            400: "#A0A0A0",
            500: "#979797"
          },
          blue: "#111625",
          lightBlack: "#1F1F1F",
        },
        fontFamily: {
          mthin: ["Montserrat-Thin", "sans-serif"],
          mlight: ["Montserrat-Light", "sans-serif"],
          mregular: ["Montserrat-Regular", "sans-serif"],
          mmedium: ["Montserrat-Medium", "sans-serif"],
          mbold: ["Montserrat-Bold", "sans-serif"],
          msbold: ["Montserrat-SemiBold", "sans-serif"],
          mblack: ["Montserrat-Black", "sans-serif"],
        },
        animation: {
          'spin-fast': 'spin 0.5s linear infinite',
        }
      },
    },
    plugins: [],
  }