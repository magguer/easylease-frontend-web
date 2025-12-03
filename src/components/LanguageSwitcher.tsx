'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 transition-all duration-300 text-white border border-primary-700 hover:border-primary-800 shadow-sm"
            aria-label="Switch language"
        >
            <Globe className="w-4 h-4" />
            <span className="font-medium uppercase text-sm">
                {language === 'en' ? 'ES' : 'EN'}
            </span>
        </button>
    );
}
