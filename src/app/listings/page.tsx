import Link from "next/link";
import { Suspense } from "react";
import { ListingCard } from "@/components/ListingCard";
import { SearchFilters } from "@/components/SearchFilters";
import { apiClient, Listing } from "@/lib/api";

interface SearchParams {
  suburb?: string;
  room_type?: string;
  min_price?: string;
  max_price?: string;
  limit?: string;
}

interface ListingsPageProps {
  searchParams: SearchParams;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  let listings: Listing[] = [];
  let error = null;

  try {
    const params = {
      suburb: searchParams.suburb,
      room_type: searchParams.room_type,
      min_price: searchParams.min_price ? parseInt(searchParams.min_price) : undefined,
      max_price: searchParams.max_price ? parseInt(searchParams.max_price) : undefined,
      limit: searchParams.limit ? parseInt(searchParams.limit) : undefined,
    };

    const response = await apiClient.getListings(params);
    listings = response.data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load listings';
    console.error('Failed to fetch listings:', err);
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Habitaciones Disponibles
          </h1>
          <p className="mt-2 text-gray-600">
            Encuentra la habitación perfecta para ti
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8">
          <Suspense fallback={<div className="bg-white p-6 rounded-lg shadow-sm border animate-pulse">Cargando filtros...</div>}>
            <SearchFilters />
          </Suspense>
        </div>

        {/* Results */}
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
        ) : (
          <>
            {/* Results Summary */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {listings.length === 0 
                  ? "No hay habitaciones que coincidan con tu búsqueda"
                  : `${listings.length} habitación${listings.length !== 1 ? 'es' : ''} encontrada${listings.length !== 1 ? 's' : ''}`
                }
              </p>
              
              {listings.length > 0 && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Ordenar por:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option value="newest">Más recientes</option>
                    <option value="price_low">Precio: menor a mayor</option>
                    <option value="price_high">Precio: mayor a menor</option>
                  </select>
                </div>
              )}
            </div>

            {/* Listings Grid */}
            {listings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-yellow-600 text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    No hay resultados
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    Intenta ajustar tus filtros de búsqueda o revisar más tarde.
                  </p>
                  <Link
                    href="/listings"
                    className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md hover:bg-yellow-200 transition-colors"
                  >
                    Ver todas las habitaciones
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {listings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}