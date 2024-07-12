/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#76A5C1",
          DEFAULT: "#428ACA",
        },
        gray: {
          light: "#D6DFE7",
          mid: "#BDCBD9",
          dark: "#9CAAB9",
          bg: "#586670",
        },
        "peach-light": "#F0CAB3",
        txt: {
          white: "#FFFFFF",
          primary: "#333333",
          secondary: "#B8B8B8",
        },
      },

    },
  },
  plugins: [],
};
