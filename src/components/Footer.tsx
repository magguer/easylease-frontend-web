import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold">EasyLease</h3>
          <p className="mt-2 text-neutral-400">
            Encuentra tu hogar ideal con nosotros
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <Link href="/listings" className="text-neutral-400 hover:text-white transition-colors">
              Habitaciones
            </Link>
          </div>
          <div className="mt-8 border-t border-neutral-700 pt-8">
            <p className="text-neutral-400">&copy; 2024 EasyLease. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}