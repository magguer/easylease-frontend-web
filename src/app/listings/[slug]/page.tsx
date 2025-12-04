import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ImageGallery } from "@/components/ImageGallery";
import { apiClient, Listing } from "@/lib/api";
import { notFound } from "next/navigation";
import { MapPin, DollarSign, Calendar, CheckCircle, XCircle, Crown, Bed, Home, Check, AlertTriangle } from 'lucide-react';

interface ListingDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
              <p className="text-red-800">Error al cargar la habitación: {error}</p>
            </div>
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
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <ImageGallery images={listing.images || []} title={listing.title} />
            </div>

            {/* Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                {listing.title}
              </h1>
              <p className="text-neutral-600 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {listing.address}
              </p>
              {listing.suburb && (
                <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full mt-2">
                  {listing.suburb}
                </span>
              )}
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                Características principales
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-neutral-50 rounded-lg">
                  <div className="flex justify-center mb-1">
                    {getRoomTypeIcon(listing.room_type)}
                  </div>
                  <p className="text-sm font-medium text-neutral-900">
                    {getRoomTypeLabel(listing.room_type)}
                  </p>
                </div>
                {listing.available_contract && (
                  <>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <div className="flex justify-center mb-1">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-sm font-medium text-neutral-900">
                        ${listing.available_contract.weekly_rent}/sem
                      </p>
                    </div>
                    <div className="text-center p-3 bg-neutral-50 rounded-lg">
                      <div className="flex justify-center mb-1">
                        {listing.available_contract.bills_included ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-neutral-900">
                        {listing.available_contract.bills_included ? 'Servicios incluidos' : 'Servicios no incluidos'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* House Features */}
            {listing.house_features && listing.house_features.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  Características de la casa
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {listing.house_features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules */}
            {listing.rules && listing.rules.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm mb-8 border border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  Reglas de la casa
                </h2>
                <div className="space-y-2">
                  {listing.rules.map((rule, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-1">•</span>
                      <span className="text-neutral-700">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferred Tenants */}
            {listing.preferred_tenants && listing.preferred_tenants.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                  Inquilinos preferidos
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.preferred_tenants.map((tenant, index) => (
                    <span 
                      key={index} 
                      className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full"
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
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-200 sticky top-4">
              <div className="mb-6">
                {listing.available_contract ? (
                  <>
                    <div className="text-3xl font-bold text-neutral-900 mb-2">
                      ${listing.available_contract.weekly_rent}
                      <span className="text-lg font-normal text-neutral-500">/semana</span>
                    </div>
                    {listing.available_contract.bond_amount > 0 && (
                      <p className="text-neutral-600">
                        Depósito: ${listing.available_contract.bond_amount}
                      </p>
                    )}
                    <p className="text-sm text-neutral-500 mt-2">
                      Disponible desde: {new Date(listing.available_contract.start_date).toLocaleDateString('es-ES')}
                    </p>
                    <p className="text-sm text-neutral-500">
                      Hasta: {new Date(listing.available_contract.end_date).toLocaleDateString('es-ES')}
                    </p>
                    <div className="mt-3 pt-3 border-t border-neutral-200">
                      <p className="text-xs text-neutral-500">
                        Pago {listing.available_contract.payment_frequency === 'weekly' ? 'semanal' : 
                             listing.available_contract.payment_frequency === 'fortnightly' ? 'quincenal' : 'mensual'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-semibold text-neutral-600">
                    Consultar disponibilidad y precio
                  </div>
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
      return <Crown className="w-6 h-6 text-orange-600" />;
    case 'double':
      return <Bed className="w-6 h-6 text-primary-600" />;
    case 'single':
      return <Bed className="w-6 h-6 text-neutral-600" />;
    default:
      return <Home className="w-6 h-6 text-neutral-600" />;
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