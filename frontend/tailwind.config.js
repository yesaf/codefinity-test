/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#74b9ef",
          DEFAULT: "#428bca",
          dark: "#357ebc",
          text: "#3a87ae",
        },
        gray: {
          light: "#D6DFE7",
          mid: "#becbd9",
          dark: "#9CAAB9",
          bg: "#586670",
          text: "#203245",
        },
        peach: {
          light: "#f0cbb3",
          text: "#703a18",
        },
        txt: {
          white: "#FFFFFF",
          primary: "#333333",
          secondary: "#9aa8b7",
          light: "#4a4d52",
        },
        divider: "#dddddd",
        green: "#20d63e",
      },
      maxWidth: {
        desktop: "1140px",
      },
    },
  },
  plugins: [],
};
