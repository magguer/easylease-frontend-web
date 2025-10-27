import Link from "next/link";
import { LeadsList } from "@/components/admin/LeadsList";
import { apiClient, Lead } from "@/lib/api";

interface LeadsPageProps {
  searchParams: {
    status?: string;
  };
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  let leads: Lead[] = [];
  let error = null;

  try {
    const response = await apiClient.getLeads(searchParams.status);
    leads = response.data;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load leads';
    console.error('Failed to fetch leads:', err);
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
                className="text-blue-600 font-semibold px-3 py-2 rounded-md text-sm"
              >
                Leads
              </Link>
              <Link 
                href="/admin/partners" 
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
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
            Gestión de Leads
          </h1>
          <p className="mt-2 text-gray-600">
            Gestiona los contactos y consultas de potenciales inquilinos
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <Link
                href="/admin/leads"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  !searchParams.status 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Todos ({leads.length})
              </Link>
              <Link
                href="/admin/leads?status=new"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  searchParams.status === 'new'
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Nuevos ({leads.filter(l => l.status === 'new').length})
              </Link>
              <Link
                href="/admin/leads?status=contacted"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  searchParams.status === 'contacted'
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Contactados ({leads.filter(l => l.status === 'contacted').length})
              </Link>
              <Link
                href="/admin/leads?status=converted"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  searchParams.status === 'converted'
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Convertidos ({leads.filter(l => l.status === 'converted').length})
              </Link>
              <Link
                href="/admin/leads?status=discarded"
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  searchParams.status === 'discarded'
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Descartados ({leads.filter(l => l.status === 'discarded').length})
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-800">
                ⚠️ Error al cargar los leads: {error}
              </p>
              <p className="text-red-600 text-sm mt-2">
                Asegúrate de que la API esté ejecutándose en http://localhost:4000
              </p>
            </div>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-yellow-600 text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                No hay leads
              </h3>
              <p className="text-yellow-700 mb-4">
                {searchParams.status 
                  ? `No hay leads con estado "${searchParams.status}" en este momento.`
                  : 'No hay consultas de inquilinos en este momento.'
                }
              </p>
              <Link
                href="/listings"
                className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md hover:bg-yellow-200 transition-colors"
              >
                Ver habitaciones disponibles
              </Link>
            </div>
          </div>
        ) : (
          <LeadsList leads={leads} />
        )}
      </div>
    </div>
  );
}