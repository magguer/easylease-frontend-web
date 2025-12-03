'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Building2, Home, Check } from 'lucide-react';

type UserRole = 'manager' | 'owner' | 'tenant';

export function RegistrationForm() {
    const { t } = useLanguage();
    const [selectedRole, setSelectedRole] = useState<UserRole>('manager');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        // Manager specific
        companyName: '',
        licenseNumber: '',
        // Owner specific
        propertyCount: '',
        bankDetails: '',
        // Tenant specific
        emergencyContact: '',
        emergencyPhone: '',
        currentAddress: '',
        employmentStatus: '',
        termsAccepted: false,
    });

    const roles: { value: UserRole; icon: any; labelKey: string }[] = [
        { value: 'manager', icon: Building2, labelKey: 'register.role.manager' },
        { value: 'owner', icon: Home, labelKey: 'register.role.owner' },
        { value: 'tenant', icon: User, labelKey: 'register.role.tenant' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement registration logic
        console.log('Form submitted:', { role: selectedRole, ...formData });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <section id="register" className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 mb-4">
                        {t('register.title')}
                    </h2>
                    <p className="text-xl text-neutral-600">
                        {t('register.subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-neutral-50 rounded-2xl p-8 shadow-xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-3">
                                {t('register.role.label')}
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    const isSelected = selectedRole === role.value;
                                    return (
                                        <button
                                            key={role.value}
                                            type="button"
                                            onClick={() => setSelectedRole(role.value)}
                                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${isSelected
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                                }`}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary-600' : 'bg-neutral-200'
                                                    }`}>
                                                    <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-neutral-600'}`} />
                                                </div>
                                                <span className={`font-semibold text-sm ${isSelected ? 'text-primary-700' : 'text-neutral-700'
                                                    }`}>
                                                    {t(role.labelKey)}
                                                </span>
                                            </div>
                                            {isSelected && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Common Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                                    {t('register.name')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                                    {t('register.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                                    {t('register.phone')}
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-2">
                                    {t('register.password')}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Role-specific Fields */}
                        {selectedRole === 'manager' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200"
                            >
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.companyName')}
                                    </label>
                                    <input
                                        type="text"
                                        id="companyName"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="licenseNumber" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.licenseNumber')}
                                    </label>
                                    <input
                                        type="text"
                                        id="licenseNumber"
                                        name="licenseNumber"
                                        value={formData.licenseNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {selectedRole === 'owner' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200"
                            >
                                <div>
                                    <label htmlFor="propertyCount" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.propertyCount')}
                                    </label>
                                    <input
                                        type="number"
                                        id="propertyCount"
                                        name="propertyCount"
                                        value={formData.propertyCount}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="bankDetails" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.bankDetails')}
                                    </label>
                                    <input
                                        type="text"
                                        id="bankDetails"
                                        name="bankDetails"
                                        value={formData.bankDetails}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {selectedRole === 'tenant' && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-200"
                            >
                                <div>
                                    <label htmlFor="emergencyContact" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.emergencyContact')}
                                    </label>
                                    <input
                                        type="text"
                                        id="emergencyContact"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="emergencyPhone" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.emergencyPhone')}
                                    </label>
                                    <input
                                        type="tel"
                                        id="emergencyPhone"
                                        name="emergencyPhone"
                                        value={formData.emergencyPhone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="currentAddress" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.currentAddress')}
                                    </label>
                                    <input
                                        type="text"
                                        id="currentAddress"
                                        name="currentAddress"
                                        value={formData.currentAddress}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="employmentStatus" className="block text-sm font-semibold text-neutral-700 mb-2">
                                        {t('register.employmentStatus')}
                                    </label>
                                    <input
                                        type="text"
                                        id="employmentStatus"
                                        name="employmentStatus"
                                        value={formData.employmentStatus}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Terms and Submit */}
                        <div className="pt-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-2 focus:ring-primary-200"
                                />
                                <span className="text-sm text-neutral-600">
                                    {t('register.terms')}
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            {t('register.submit')}
                        </button>

                        <p className="text-center text-sm text-neutral-600">
                            {t('register.login')}
                        </p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
