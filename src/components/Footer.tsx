import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-700 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-lg font-semibold">EasyLease</h3>
          <p className="mt-2 text-gray-300">
            Encuentra tu hogar ideal con nosotros
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <Link href="/listings" className="text-gray-300 hover:text-white">
              Habitaciones
            </Link>
          </div>
          <div className="mt-8 border-t border-gray-600 pt-8">
            <p className="text-gray-300 text-sm">
              © 2025 EasyLease. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}