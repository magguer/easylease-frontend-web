'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Building2, Users, FileText, DollarSign, Home, Globe2 } from 'lucide-react';

const features = [
    {
        icon: Building2,
        titleKey: 'features.properties.title',
        descKey: 'features.properties.description',
        color: 'from-primary-500 to-primary-700',
    },
    {
        icon: Users,
        titleKey: 'features.tenants.title',
        descKey: 'features.tenants.description',
        color: 'from-coral-500 to-coral-700',
    },
    {
        icon: FileText,
        titleKey: 'features.contracts.title',
        descKey: 'features.contracts.description',
        color: 'from-green-500 to-green-700',
    },
    {
        icon: DollarSign,
        titleKey: 'features.payments.title',
        descKey: 'features.payments.description',
        color: 'from-primary-600 to-primary-800',
    },
    {
        icon: Home,
        titleKey: 'features.owners.title',
        descKey: 'features.owners.description',
        color: 'from-coral-600 to-coral-800',
    },
    {
        icon: Globe2,
        titleKey: 'features.multilingual.title',
        descKey: 'features.multilingual.description',
        color: 'from-green-600 to-green-800',
    },
];

export function FeaturesSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-4">
                        {t('features.title')}
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        {t('features.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100"
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                                        {t(feature.titleKey)}
                                    </h3>

                                    <p className="text-neutral-600 leading-relaxed">
                                        {t(feature.descKey)}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
