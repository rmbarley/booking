/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        xs: "1rem",
        md: "10rem",
      },
    },
  },
  plugins: [],
};
