import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { apiClient, Listing } from "@/lib/api";
import { notFound } from "next/navigation";

interface ListingDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const resolvedParams = await params;
  let listing: Listing | null = null;
  let error = null;

  try {
    // Decode the slug in case it comes URL-encoded
    const decodedSlug = decodeURIComponent(resolvedParams.slug);
    const response = await apiClient.getListingBySlug(decodedSlug);
    listing = response.data;
  } catch (err) {
    if (err instanceof Error && err.message.includes('not found')) {
      notFound();
    }
    error = err instanceof Error ? err.message : 'Failed to load listing';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-800">⚠️ Error al cargar la habitación: {error}</p>
            <Link href="/listings" className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block">
              ← Volver a las habitaciones
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🏠 Rentalist
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link 
                href="/listings" 
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                ← Volver a listings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              {listing.images && listing.images.length > 0 ? (
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    width={800}
                    height={450}
                    className="w-full h-96 object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-gray-400 text-center">
                    <svg className="mx-auto h-16 w-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                    </svg>
                    <p>Sin imágenes disponibles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {listing.title}
              </h1>
              <p className="text-gray-600 flex items-center">
                📍 {listing.address}
              </p>
              {listing.suburb && (
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mt-2">
                  {listing.suburb}
                </span>
              )}
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Características principales
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">
                    {getRoomTypeIcon(listing.room_type)}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {getRoomTypeLabel(listing.room_type)}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">💰</div>
                  <p className="text-sm font-medium text-gray-900">
                    ${listing.price_per_week}/sem
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">
                    {listing.bills_included ? '✅' : '❌'}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {listing.bills_included ? 'Servicios incluidos' : 'Servicios no incluidos'}
                  </p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">📅</div>
                  <p className="text-sm font-medium text-gray-900">
                    {listing.min_term_weeks} sem. mín.
                  </p>
                </div>
              </div>
            </div>

            {/* House Features */}
            {listing.house_features && listing.house_features.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Características de la casa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listing.house_features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules */}
            {listing.rules && listing.rules.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Reglas de la casa
                </h2>
                <div className="space-y-2">
                  {listing.rules.map((rule, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferred Tenants */}
            {listing.preferred_tenants && listing.preferred_tenants.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Inquilinos preferidos
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.preferred_tenants.map((tenant, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tenant}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price and Contact */}
            <div className="bg-white rounded-lg p-6 shadow-sm border sticky top-4">
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${listing.price_per_week}
                  <span className="text-lg font-normal text-gray-500">/semana</span>
                </div>
                {listing.bond > 0 && (
                  <p className="text-gray-600">
                    Depósito: ${listing.bond}
                  </p>
                )}
                {listing.available_from && (
                  <p className="text-sm text-gray-500 mt-2">
                    Disponible desde: {new Date(listing.available_from).toLocaleDateString('es-ES')}
                  </p>
                )}
              </div>

              <ContactForm listingId={listing._id} listingTitle={listing.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getRoomTypeIcon(roomType: string) {
  switch (roomType) {
    case 'master':
      return '👑';
    case 'double':
      return '🛏️';
    case 'single':
      return '🛌';
    default:
      return '🏠';
  }
}

function getRoomTypeLabel(roomType: string) {
  switch (roomType) {
    case 'master':
      return 'Principal';
    case 'double':
      return 'Doble';
    case 'single':
      return 'Individual';
    default:
      return 'Habitación';
  }
}