/** @type {import('tailwindcss').Config} */
module.exports = {
  borderColor: (theme) => ({
    ...theme("colors"),
    DEFAULT: theme("#ACA9A9"),
  }),
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  // prefix: "tw-",
  plugins: [],
};
