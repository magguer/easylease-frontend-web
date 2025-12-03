'use client';

import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { MobileAppSection } from '@/components/MobileAppSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { RegistrationForm } from '@/components/RegistrationForm';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MobileAppSection />
      <BenefitsSection />
      <RegistrationForm />
      <CTASection />
    </div>
  );
}
