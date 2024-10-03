/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}",
     "./app/(tabs)/index.{js,jsx,ts,tsx}",
     "./components/**/*.{js,jsx,ts,tsx}",
      "./utils/(tabs)/index.{js,jsx,ts,tsx}",
      "./hooks/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

