export default function Footer() {
    return (
      <footer className="bg-[#333333] text-white py-10 px-4 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-primary">Pantom Digital Studio</h2>
            <p className="text-sm mt-1">© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
          <div className="flex gap-6">
            <a href="mailto:hola@pantom.net" className="hover:text-primary transition">hola@pantom.net</a>
            <a href="/contacto" className="hover:text-primary transition">Contacto</a>
          </div>
        </div>
      </footer>
    );
  }
  