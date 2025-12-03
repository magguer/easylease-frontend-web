'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Smartphone, Wifi, Bell, Lock } from 'lucide-react';
import Image from 'next/image';

const features = [
    {
        icon: Smartphone,
        titleKey: 'mobileApp.feature1.title',
        descKey: 'mobileApp.feature1.description',
    },
    {
        icon: Wifi,
        titleKey: 'mobileApp.feature2.title',
        descKey: 'mobileApp.feature2.description',
    },
    {
        icon: Bell,
        titleKey: 'mobileApp.feature3.title',
        descKey: 'mobileApp.feature3.description',
    },
    {
        icon: Lock,
        titleKey: 'mobileApp.feature4.title',
        descKey: 'mobileApp.feature4.description',
    },
];

export function MobileAppSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary-100/50 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-6">
                            {t('mobileApp.title')}
                        </h2>
                        <p className="text-xl text-neutral-600 mb-8">
                            {t('mobileApp.subtitle')}
                        </p>

                        <div className="space-y-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-1">
                                                {t(feature.titleKey)}
                                            </h3>
                                            <p className="text-neutral-600">
                                                {t(feature.descKey)}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* App Store Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-wrap gap-4 mt-10"
                        >
                            <div className="px-6 py-3 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-2">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                </svg>
                                App Store
                            </div>
                            <div className="px-6 py-3 bg-neutral-900 text-white rounded-xl font-semibold hover:bg-neutral-800 transition-colors cursor-pointer flex items-center gap-2">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z" />
                                </svg>
                                Google Play
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right side - Phone mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative mx-auto w-full max-w-sm">
                            {/* Phone frame */}
                            <div className="relative bg-neutral-900 rounded-[3rem] p-3 shadow-2xl">
                                <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                                    {/* Status bar */}
                                    <div className="bg-primary-600 px-6 py-3 flex justify-between items-center text-white text-xs">
                                        <span className="font-semibold">9:41</span>
                                        <div className="flex gap-1">
                                            <div className="w-4 h-4 bg-white/30 rounded-sm" />
                                            <div className="w-4 h-4 bg-white/30 rounded-sm" />
                                            <div className="w-4 h-4 bg-white/30 rounded-sm" />
                                        </div>
                                    </div>

                                    {/* App content mockup */}
                                    <div className="p-6 bg-neutral-50">
                                        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-primary-100 rounded-full" />
                                                <div className="flex-1">
                                                    <div className="h-3 bg-neutral-200 rounded w-3/4 mb-2" />
                                                    <div className="h-2 bg-neutral-100 rounded w-1/2" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="h-16 bg-primary-50 rounded-lg" />
                                                <div className="h-16 bg-coral-50 rounded-lg" />
                                                <div className="h-16 bg-green-50 rounded-lg" />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="bg-white rounded-xl p-3 shadow-sm">
                                                <div className="h-2 bg-neutral-200 rounded w-full mb-2" />
                                                <div className="h-2 bg-neutral-100 rounded w-2/3" />
                                            </div>
                                            <div className="bg-white rounded-xl p-3 shadow-sm">
                                                <div className="h-2 bg-neutral-200 rounded w-full mb-2" />
                                                <div className="h-2 bg-neutral-100 rounded w-3/4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating badge */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -right-4 top-1/4 bg-coral-500 text-white px-4 py-2 rounded-full font-bold shadow-xl"
                            >
                                iOS & Android
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
