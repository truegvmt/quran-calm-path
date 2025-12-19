import { Shield, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function TransparencySection() {
  const { t } = useLanguage()

  const points = [
    t('transparency.point1'),
    t('transparency.point2'),
    t('transparency.point3'),
    t('transparency.point4'),
  ]

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t('transparency.title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              {t('transparency.subtitle')}
            </p>
            <ul className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="bg-primary/5 rounded-lg p-6 mb-6">
              <p className="text-2xl font-arabic leading-loose text-foreground text-center" dir="rtl">
                وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ
              </p>
            </div>
            <p className="text-muted-foreground text-center italic">
              "And We send down of the Quran that which is healing and mercy for the believers."
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              — Surah Al-Isra (17:82)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}