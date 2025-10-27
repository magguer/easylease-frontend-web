import Link from "next/link";
import { PartnersList } from "@/components/admin/PartnersList";
import { apiClient, Partner } from "@/lib/api";

interface PartnersPageProps {
  searchParams: {
    status?: string;
  };
}

export default async function PartnersPage({ searchParams }: PartnersPageProps) {
  let partners: Partner[] = [];
  let error = null;

  try {
    const response = await apiClient.getPartners(searchParams.status);
    partners = response.data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load partners';
    console.error('Failed to fetch partners:', err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🏠 Easylease
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link 
                href="/listings" 
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Listings
              </Link>
              <Link 
                href="/admin/leads" 
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Leads
              </Link>
              <Link 
                href="/admin/partners" 
                className="text-blue-600 font-semibold px-3 py-2 rounded-md text-sm"
              >
                Partners
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Partners
          </h1>
          <p className="mt-2 text-gray-600">
            Gestiona los propietarios y socios inmobiliarios
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <Link
                href="/admin/partners"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  !searchParams.status 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Todos ({partners.length})
              </Link>
              <Link
                href="/admin/partners?status=pending"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  searchParams.status === 'pending'
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Pendientes ({partners.filter(p => p.status === 'pending').length})
              </Link>
              <Link
                href="/admin/partners?status=active"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  searchParams.status === 'active'
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activos ({partners.filter(p => p.status === 'active').length})
              </Link>
              <Link
                href="/admin/partners?status=inactive"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  searchParams.status === 'inactive'
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Inactivos ({partners.filter(p => p.status === 'inactive').length})
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800">
                ⚠️ Error al cargar los partners: {error}
              </p>
              <p className="text-red-600 text-sm mt-2">
                Asegúrate de que la API esté ejecutándose en http://localhost:4000
              </p>
            </div>
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-yellow-600 text-6xl mb-4">🤝</div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                No hay partners
              </h3>
              <p className="text-yellow-700 mb-4">
                {searchParams.status 
                  ? `No hay partners con estado "${searchParams.status}" en este momento.`
                  : 'No hay socios inmobiliarios registrados en este momento.'
                }
              </p>
            </div>
          </div>
        ) : (
          <PartnersList partners={partners} />
        )}
      </div>
    </div>
  );
}