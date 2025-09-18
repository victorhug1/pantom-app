import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex gap-6 items-center py-4 px-6">
      <Link href="/" className="text-foreground hover:text-[#333333] transition-colors">Inicio</Link>
      <Link href="/servicios" className="text-foreground hover:text-[#333333] transition-colors">Servicios</Link>
      <Link href="/casos-de-exito" className="text-foreground hover:text-[#333333] transition-colors">Casos de Éxito</Link>
      <Link href="/blog" className="text-foreground hover:text-[#333333] transition-colors">Blog</Link>
      <Link href="/contacto" className="text-foreground hover:text-[#333333] transition-colors">Contacto</Link>
    </nav>
  );
} 