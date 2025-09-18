import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/pantom_logo.svg" />
        <link rel="apple-touch-icon" href="/pantom_logo.svg" />
        <meta name="theme-color" content="#000000" />
        {/* Scripts de analytics movidos a componente diferido */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
