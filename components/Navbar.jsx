import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const navItems = [
  { name: "Servicios", href: "/servicios" },
  { name: "Enfoque", href: "/enfoque" },
  { name: "Casos de Éxito", href: "/casos" },
  { name: "Blog", href: "/blog" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Contacto", href: "/contacto" },
];

const menuVariants = {
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      staggerDirection: 1
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full fixed top-0 left-0 z-50 px-4 py-3 transition-all duration-300 ${
        scrolled
          ? "bg-[#333333]/80 dark:bg-[#333333]/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src="/pantom_logo.svg"
              alt="Pantom Digital Studio"
              width={36}
              height={36}
              priority
              className="transition-transform duration-300 group-hover:rotate-12"
            />
          </motion.div>
          <motion.span 
            className="text-xl font-bold bg-gradient-to-r from-[#ea5a19] to-[#ff8f59] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Pantom
          </motion.span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group"
            >
              <span className={`text-sm font-medium transition-colors duration-300 ${
                router.pathname === item.href
                  ? "text-[#ea5a19]"
                  : "text-white group-hover:text-[#ea5a19]"
              }`}>
                {item.name}
              </span>
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ea5a19] transition-all duration-300 group-hover:w-full ${
                router.pathname === item.href ? "w-full" : "w-0"
              }`} />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="hidden lg:block text-sm font-medium text-white hover:text-[#ea5a19] transition-colors"
          >
            {locale.toUpperCase()}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:block bg-[#ea5a19] text-white px-4 py-2 rounded-lg hover:bg-[#ff8f59] transition-colors"
          >
            Agendar Consulta
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-800 dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden mt-4 flex flex-col gap-4 bg-white dark:bg-gray-900 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-gray-800"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                className="overflow-hidden"
              >
                <Link
                  href={item.href}
                  className={`block text-lg transition-colors duration-300 ${
                    router.pathname === item.href
                      ? "text-[#ea5a19]"
                      : "text-gray-800 dark:text-white hover:text-[#333333]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={toggleLanguage}
                className="text-sm font-medium text-gray-800 dark:text-white hover:text-[#ea5a19] transition-colors"
              >
                {locale.toUpperCase()}
              </button>
              <button className="bg-[#ea5a19] text-white px-4 py-2 rounded-lg hover:bg-[#ff8f59] transition-colors">
                Agendar Consulta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
