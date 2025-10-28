import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { apiClient, Listing } from "@/lib/api";

export default async function Home() {
  let listings: Listing[] = [];
  let error = null;

  try {
    const response = await apiClient.getListings();
    listings = response.data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load listings';
    console.error('Failed to fetch listings:', err);
  }

  return (
    <div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Encuentra tu hogar ideal
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Descubre habitaciones disponibles en las mejores zonas. 
              Renta semanal, flexible y sin complicaciones.
            </p>
            <div className="mt-10">
              <Link
                href="/listings"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Ver todas las habitaciones
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Listings */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Habitaciones destacadas
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Las mejores opciones disponibles ahora
          </p>
        </div>

        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800">
                ⚠️ Error al cargar las habitaciones: {error}
              </p>
              <p className="text-red-600 text-sm mt-2">
                Asegúrate de que la API esté ejecutándose en http://localhost:4000
              </p>
            </div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-yellow-800">
                📝 No hay habitaciones disponibles en este momento
              </p>
              <p className="text-yellow-600 text-sm mt-2">
                ¡Vuelve pronto para ver nuevas opciones!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.slice(0, 6).map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}

        {listings.length > 6 && (
          <div className="text-center mt-12">
            <Link
              href="/listings"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver todas las habitaciones ({listings.length})
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
