import { Sparkles, Library, Globe, Calendar } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Sparkles,
      title: t('features.personalized.title'),
      description: t('features.personalized.desc'),
    },
    {
      icon: Library,
      title: t('features.library.title'),
      description: t('features.library.desc'),
    },
    {
      icon: Globe,
      title: t('features.multilingual.title'),
      description: t('features.multilingual.desc'),
    },
    {
      icon: Calendar,
      title: t('features.daily.title'),
      description: t('features.daily.desc'),
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}