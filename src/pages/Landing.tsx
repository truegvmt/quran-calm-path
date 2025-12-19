import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { TransparencySection } from '@/components/landing/TransparencySection'
import { CTASection } from '@/components/landing/CTASection'

export function Landing() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TransparencySection />
      <CTASection />
    </div>
  )
}