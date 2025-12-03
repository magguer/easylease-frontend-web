'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Smile, FolderKanban, Shield, Smartphone } from 'lucide-react';

const benefits = [
    {
        icon: Smile,
        titleKey: 'benefits.simple.title',
        descKey: 'benefits.simple.description',
    },
    {
        icon: FolderKanban,
        titleKey: 'benefits.organized.title',
        descKey: 'benefits.organized.description',
    },
    {
        icon: Shield,
        titleKey: 'benefits.secure.title',
        descKey: 'benefits.secure.description',
    },
    {
        icon: Smartphone,
        titleKey: 'benefits.accessible.title',
        descKey: 'benefits.accessible.description',
    },
];

export function BenefitsSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coral-500/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.3, 1, 1.3],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        {t('benefits.title')}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="text-center group"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-coral-500 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                    <Icon className="w-10 h-10 text-white" />
                                </div>

                                <h3 className="text-xl font-bold mb-3">
                                    {t(benefit.titleKey)}
                                </h3>

                                <p className="text-neutral-300 leading-relaxed">
                                    {t(benefit.descKey)}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
