import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/pantom_logo.svg" />
        <link rel="apple-touch-icon" href="/pantom_logo.svg" />
        <meta name="theme-color" content="#000000" />
      </Head>
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
    </>
  );
}
