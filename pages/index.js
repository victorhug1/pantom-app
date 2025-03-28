import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <Head>
        <title>Pantom Digital Studio</title>
        <meta name="description" content="Estudio digital especializado en SEO y marketing digital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center text-[#ea5a19]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bienvenido a Pantom
      </motion.h1>

      <motion.p
        className="mt-4 text-lg md:text-xl text-center max-w-xl text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Estudio digital especializado en SEO, marketing de contenidos y estrategias digitales personalizadas.
      </motion.p>

      <motion.a
        href="#services"
        className="mt-8 px-6 py-3 bg-[#ea5a19] text-black rounded-2xl font-semibold shadow-lg hover:bg-white transition"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Conoce nuestros servicios
      </motion.a>
    </div>
  );
}
