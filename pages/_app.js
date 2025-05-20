import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import FloatingContactButton from "@/components/FloatingContactButton";
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

// Tema personalizado
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff9800',
    },
    secondary: {
      main: '#ea5a19',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Head>
          <link rel="icon" href="/pantom_logo.svg" />
          <link rel="apple-touch-icon" href="/pantom_logo.svg" />
          <meta name="theme-color" content="#000000" />
        </Head>
        <main className={inter.className}>
          <Component {...pageProps} />
          <FloatingContactButton />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
}
