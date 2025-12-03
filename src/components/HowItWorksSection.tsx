'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Upload, FileCheck, BarChart3 } from 'lucide-react';

const steps = [
    {
        icon: Upload,
        titleKey: 'howItWorks.step1.title',
        descKey: 'howItWorks.step1.description',
        color: 'primary',
    },
    {
        icon: FileCheck,
        titleKey: 'howItWorks.step2.title',
        descKey: 'howItWorks.step2.description',
        color: 'coral',
    },
    {
        icon: BarChart3,
        titleKey: 'howItWorks.step3.title',
        descKey: 'howItWorks.step3.description',
        color: 'green',
    },
];

export function HowItWorksSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-50" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-4">
                        {t('howItWorks.title')}
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        {t('howItWorks.subtitle')}
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connection line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-coral-200 to-green-200 transform -translate-y-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const colorClasses = {
                                primary: 'from-primary-500 to-primary-700',
                                coral: 'from-coral-500 to-coral-700',
                                green: 'from-green-500 to-green-700',
                            };

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="relative"
                                >
                                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-100 relative z-10">
                                        {/* Step number */}
                                        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                            {index + 1}
                                        </div>

                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses]} flex items-center justify-center mb-6 mx-auto`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
                                            {t(step.titleKey)}
                                        </h3>

                                        <p className="text-neutral-600 leading-relaxed text-center">
                                            {t(step.descKey)}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
