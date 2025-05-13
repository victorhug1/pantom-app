import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import FloatingContactButton from "@/components/FloatingContactButton";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="icon" href="/pantom_logo.svg" />
        <link rel="apple-touch-icon" href="/pantom_logo.svg" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
        <FloatingContactButton />
      </main>
    </SessionProvider>
  );
}
