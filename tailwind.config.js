module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],
        },
        colors: {
          primary: '#ea5a19',
          dark: '#333333',
          light: '#ffffff',
        },
      },
    },
    plugins: [],
  };
  