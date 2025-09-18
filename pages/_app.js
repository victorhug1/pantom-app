import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import FloatingContactButton from "@/components/FloatingContactButton";
import Analytics from "@/components/Analytics";
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Tema personalizado
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ea5a19',
    },
    secondary: {
      main: '#ff8f59',
    },
    background: {
      default: '#0a0a0a',
      paper: '#171717',
    },
    text: {
      primary: '#ededed',
      secondary: '#a3a3a3',
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          backgroundColor: '#171717',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
          borderBottom: '1px solid #262626',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#171717',
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
          <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <main className={inter.className}>
        <Component {...pageProps} />
        <FloatingContactButton />
        <Analytics />
      </main>
      </ThemeProvider>
    </SessionProvider>
  );
}
