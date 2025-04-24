/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', 'sans-serif'],
        },
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: 'var(--card)',
          'card-foreground': 'var(--card-foreground)',
          primary: 'var(--primary)',
          'primary-hover': 'var(--primary-hover)',
          'primary-foreground': 'var(--primary-foreground)',
          muted: 'var(--muted)',
          'muted-foreground': 'var(--muted-foreground)',
          border: 'var(--border)',
        },
        animation: {
          'spin': 'spin 20s linear infinite',
          'spin-reverse': 'spin 20s linear infinite reverse',
        },
      },
    },
    plugins: [],
  };
  