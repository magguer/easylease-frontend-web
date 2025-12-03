'use client';

import Link from "next/link";
import { useLanguage } from '@/lib/LanguageContext';
import { Home } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-6 h-6 text-primary-400" />
              <h3 className="text-xl font-bold">EasyLease</h3>
            </div>
            <p className="text-neutral-400 mb-4">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.features')}
                </Link>
              </li>
              <li>
                <Link href="/listings" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-neutral-400">
            &copy; {currentYear} EasyLease. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}