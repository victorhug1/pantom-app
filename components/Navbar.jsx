import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const navItems = [
  { name: "Servicios", href: "/servicios", submenu: [
    { name: "Desarrollo web a medida", href: "/servicios/desarrollo-web" },
    { name: "Inteligencia de datos y bases de datos", href: "/servicios/bases-de-datos" },
    { name: "Visibilidad y SEO estratégico", href: "/servicios/seo" },
    { name: "Consultoría en Estrategia Digital", href: "/servicios/estrategia-digital" },
  ] },
  { name: "Enfoque", href: "/enfoque" },
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
  const [showServices, setShowServices] = useState(false);
  const [showServicesMobile, setShowServicesMobile] = useState(false);
  const router = useRouter();
  const { locale, asPath } = router;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    router.push(asPath, asPath, { locale: nextLocale });
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
            {navItems.map((item) =>
              item.submenu ? (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setShowServices(true)}
                  onMouseLeave={() => setShowServices(false)}
                >
                  <Link
                    href={item.href}
                    className="text-white hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {item.name}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </Link>
                  {showServices && (
                    <div className="absolute left-0 w-64" style={{ top: '100%', height: '16px' }} />
                  )}
                  {showServices && (
                    <div className="absolute left-0 mt-4 w-64 bg-[#181818] border border-white/10 rounded-xl shadow-lg z-20"
                      onMouseEnter={() => setShowServices(true)}
                      onMouseLeave={() => setShowServices(false)}
                    >
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-6 py-3 text-white hover:text-primary hover:bg-white/5 transition-colors"
                          onClick={() => setShowServices(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            <button
              className="px-3 py-1 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium ml-2"
              onClick={toggleLanguage}
              aria-label="Cambiar idioma"
            >
              {locale === 'es' ? 'English' : 'Español'}
            </button>
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
            className="lg:hidden mt-4 flex flex-col gap-4 bg-[#181818] backdrop-blur-md p-6 rounded-2xl border border-white/10"
          >
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.name}>
                  <button
                    className="flex items-center w-full text-lg text-white hover:text-primary transition-colors mb-2"
                    onClick={() => setShowServicesMobile((v) => !v)}
                  >
                    {item.name}
                    <svg className={`w-4 h-4 ml-2 transition-transform ${showServicesMobile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {showServicesMobile && (
                    <div className="ml-4 border-l border-white/10 pl-4">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block py-2 text-white hover:text-primary transition-colors"
                          onClick={() => { setIsOpen(false); setShowServicesMobile(false); }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
                        : "text-white hover:text-[#333333]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            )}
            <div className="mt-8">
              <button
                className="w-full px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                onClick={toggleLanguage}
                aria-label="Cambiar idioma"
              >
                {locale === 'es' ? 'English' : 'Español'}
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
              {navItems.map((item) =>
                item.submenu ? (
                  <li key={item.name}>
                    <button
                      className="flex items-center w-full text-lg text-white hover:text-primary transition-colors mb-2"
                      onClick={() => setShowServicesMobile((v) => !v)}
                    >
                      {item.name}
                      <svg className={`w-4 h-4 ml-2 transition-transform ${showServicesMobile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {showServicesMobile && (
                      <div className="ml-4 border-l border-white/10 pl-4">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="block py-2 text-white hover:text-primary transition-colors"
                            onClick={() => { setIsOpen(false); setShowServicesMobile(false); }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block text-lg text-white hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="mt-8">
              <button
                className="w-full px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                onClick={toggleLanguage}
                aria-label="Cambiar idioma"
              >
                {locale === 'es' ? 'English' : 'Español'}
              </button>
            </div>
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
