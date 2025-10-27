'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    suburb: searchParams.get('suburb') || '',
    room_type: searchParams.get('room_type') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    router.push(`/listings${queryString ? `?${queryString}` : ''}`);
  };

  const clearFilters = () => {
    setFilters({
      suburb: '',
      room_type: '',
      min_price: '',
      max_price: '',
    });
    router.push('/listings');
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filtrar habitaciones
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Suburb Filter */}
        <div>
          <label htmlFor="suburb" className="block text-sm font-medium text-gray-700 mb-1">
            Suburb
          </label>
          <input
            type="text"
            id="suburb"
            placeholder="ej: Carlton, Fitzroy..."
            value={filters.suburb}
            onChange={(e) => handleFilterChange('suburb', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Room Type Filter */}
        <div>
          <label htmlFor="room_type" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de habitación
          </label>
          <select
            id="room_type"
            value={filters.room_type}
            onChange={(e) => handleFilterChange('room_type', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Cualquier tipo</option>
            <option value="single">Individual</option>
            <option value="double">Doble</option>
            <option value="master">Principal</option>
          </select>
        </div>

        {/* Min Price Filter */}
        <div>
          <label htmlFor="min_price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio mínimo
          </label>
          <input
            type="number"
            id="min_price"
            placeholder="$0"
            value={filters.min_price}
            onChange={(e) => handleFilterChange('min_price', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label htmlFor="max_price" className="block text-sm font-medium text-gray-700 mb-1">
            Precio máximo
          </label>
          <input
            type="number"
            id="max_price"
            placeholder="$1000"
            value={filters.max_price}
            onChange={(e) => handleFilterChange('max_price', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Aplicar filtros
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Limpiar filtros
          </button>
        )}
        
        <div className="flex items-center text-sm text-gray-500">
          {hasActiveFilters && (
            <span>
              Filtros activos: {Object.values(filters).filter(v => v !== '').length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}