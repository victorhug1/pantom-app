import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">¡Ups! No encontramos la página que buscas.</h2>
      <p className="text-gray-300 mb-8 text-center max-w-md">
        Puede que la dirección esté mal escrita o que la página haya sido movida. Pero no te preocupes, puedes volver al inicio fácilmente.
      </p>
      <Link href="/">
        <span className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-[#ff8f59] transition-colors text-lg cursor-pointer">
          Volver al Home
        </span>
      </Link>
    </div>
  );
} 