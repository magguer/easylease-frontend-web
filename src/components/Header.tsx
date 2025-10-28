"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              🏠 EasyLease
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/" 
                  ? "text-blue-600 font-semibold" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/listings" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname.startsWith("/listings") 
                  ? "text-blue-600 font-semibold" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Habitaciones
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}