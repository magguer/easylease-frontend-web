"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, X, Menu } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-xl md:text-2xl font-bold text-neutral-900 hover:text-primary-600 transition-colors">
              <Home className="w-6 h-6 text-primary-600" />
              <span>EasyLease</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === "/"
                  ? "text-primary-600 font-semibold"
                  : "text-neutral-500 hover:text-neutral-900"
                }`}
            >
              {t('header.home')}
            </Link>
            <Link
              href="/listings"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname.startsWith("/listings")
                  ? "text-primary-600 font-semibold"
                  : "text-neutral-500 hover:text-neutral-900"
                }`}
            >
              {t('header.listings')}
            </Link>
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-500 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === "/"
                    ? "text-primary-600 font-semibold bg-primary-50"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.home')}
              </Link>
              <Link
                href="/listings"
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname.startsWith("/listings")
                    ? "text-primary-600 font-semibold bg-primary-50"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.listings')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}