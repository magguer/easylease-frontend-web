'use client';

import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/lib/api";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        {listing.images && listing.images.length > 0 ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100">
            <div className="text-gray-400 text-center">
              <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
              </svg>
              <p className="text-sm">Sin imagen</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {listing.title}
          </h3>
          <span className="flex-shrink-0 ml-2">
            {getRoomTypeIcon(listing.room_type)}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-1">
          📍 {listing.address}
        </p>
        
        {listing.suburb && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
            {listing.suburb}
          </span>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${listing.price_per_week}
              <span className="text-sm font-normal text-gray-500">/semana</span>
            </p>
            {listing.bond > 0 && (
              <p className="text-sm text-gray-500">
                Depósito: ${listing.bond}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {listing.bills_included && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Servicios incluidos
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {listing.min_term_weeks} sem. mín.
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            href={`/listings/${listing.slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Ver detalles
          </Link>
          <Link
            href={`/listings/${listing.slug}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}

function getRoomTypeIcon(roomType: string) {
  switch (roomType) {
    case 'master':
      return <span className="text-xl" title="Habitación principal">👑</span>;
    case 'double':
      return <span className="text-xl" title="Habitación doble">🛏️</span>;
    case 'single':
      return <span className="text-xl" title="Habitación individual">🛌</span>;
    default:
      return <span className="text-xl">🏠</span>;
  }
}