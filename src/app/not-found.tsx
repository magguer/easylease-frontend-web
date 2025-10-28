import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🏠</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Página no encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="space-y-3">
          <div>
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Ir al inicio
            </Link>
          </div>
          <div>
            <Link
              href="/listings"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas las habitaciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}