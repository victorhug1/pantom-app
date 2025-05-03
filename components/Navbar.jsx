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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${
        scrolled ? 'border-b border-white/5' : ''
      }`}>
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/pantom_logo.svg"
              alt="Pantom Digital Studio"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-white">Pantom</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="px-4 py-2 text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
            >
              Contactar
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-white hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
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

      <div className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/95" />
        <div className="relative h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/pantom_logo.svg"
                alt="Pantom Digital Studio"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-white">Pantom</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-6 py-8">
            <ul className="space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-lg text-white hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-6 border-t border-white/10">
            <Link
              href="/contacto"
              className="block w-full px-6 py-3 text-center text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
