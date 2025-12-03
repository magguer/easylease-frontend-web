'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-coral-600 relative overflow-hidden">
            {/* Animated circles */}
            <motion.div
                className="absolute top-10 right-10 w-64 h-64 border-4 border-white/20 rounded-full"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.div
                className="absolute bottom-10 left-10 w-48 h-48 border-4 border-white/20 rounded-full"
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                        {t('cta.title')}
                    </h2>
                    <p className="text-xl text-primary-100 mb-10">
                        {t('cta.subtitle')}
                    </p>

                    <Link
                        href="#register"
                        className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
                    >
                        {t('cta.button')}
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
