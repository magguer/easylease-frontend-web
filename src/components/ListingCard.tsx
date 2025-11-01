'use client';

import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/lib/api";
import { MapPin, Crown, Bed, Home, CheckCircle, ImageOff } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link 
      href={`/listings/${listing.slug}`}
      className="group block bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-xl hover:border-neutral-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-56 bg-neutral-100 overflow-hidden">
        {listing.images && listing.images.length > 0 ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
            <div className="text-neutral-400 text-center">
              <ImageOff className="mx-auto h-16 w-16 mb-2" />
              <p className="text-sm font-medium">Sin imagen</p>
            </div>
          </div>
        )}
        
        {/* Badges superpuestos */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {listing.suburb && (
            <span className="bg-white/95 backdrop-blur-sm text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center">
              <MapPin className="w-3 h-3 mr-1.5" />
              {listing.suburb}
            </span>
          )}
        </div>

        {/* Room Type Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg">
            {getRoomTypeIcon(listing.room_type)}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {listing.title}
        </h3>
        
        {/* Address */}
        <div className="flex items-start text-neutral-600 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{listing.address}</span>
        </div>

        {/* Price Section */}
        <div className="mb-4 pb-4 border-b border-neutral-100">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-neutral-900">
              ${listing.price_per_week}
            </span>
            <span className="text-sm font-medium text-neutral-500">/semana</span>
          </div>
          {listing.bond > 0 && (
            <p className="text-xs text-neutral-500 mt-1">
              Depósito: ${listing.bond}
            </p>
          )}
        </div>
        
        {/* Features Tags */}
        <div className="flex flex-wrap gap-2">
          {listing.bills_included && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              <CheckCircle className="w-3 h-3 mr-1.5" />
              Servicios incluidos
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-neutral-50 text-neutral-700 border border-neutral-200">
            {listing.min_term_weeks} sem. mín.
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-200">
            {getRoomTypeLabel(listing.room_type)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function getRoomTypeIcon(roomType: string) {
  switch (roomType) {
    case 'master':
      return <Crown className="w-5 h-5 text-orange-600" />;
    case 'double':
      return <Bed className="w-5 h-5 text-primary-600" />;
    case 'single':
      return <Bed className="w-5 h-5 text-neutral-600" />;
    default:
      return <Home className="w-5 h-5 text-neutral-600" />;
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