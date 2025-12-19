import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bookmark, Share2, Play, Sparkles, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Sample verse data
const surahData: Record<number, {
  name: string
  arabic: string
  verses: { id: number; arabic: string; translation: string }[]
}> = {
  1: {
    name: 'Al-Fatiha',
    arabic: 'الفاتحة',
    verses: [
      { id: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
      { id: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'All praise is due to Allah, Lord of the worlds.' },
      { id: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'The Entirely Merciful, the Especially Merciful.' },
      { id: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', translation: 'Sovereign of the Day of Recompense.' },
      { id: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', translation: 'It is You we worship and You we ask for help.' },
      { id: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', translation: 'Guide us to the straight path.' },
      { id: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', translation: 'The path of those upon whom You have bestowed favor, not of those who have earned anger or of those who are astray.' },
    ],
  },
}

export function SurahDetail() {
  const { t } = useLanguage()
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState<'verses' | 'insights'>('verses')
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null)

  const surah = surahData[Number(id)] || surahData[1]

  return (
    <div className="min-h-[calc(100vh-80px)] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('surah.back')}
        </Link>

        {/* Surah header */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-arabic text-foreground mb-2">{surah.arabic}</h1>
            <h2 className="text-2xl font-bold text-foreground mb-4">{surah.name}</h2>
            <div className="flex items-center justify-center gap-4">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title={t('surah.save')}>
                <Bookmark className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title={t('surah.share')}>
                <Share2 className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors" title={t('surah.play')}>
                <Play className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('verses')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'verses' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {t('surah.verses')}
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'insights' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            {t('surah.insights')}
          </button>
        </div>

        {/* Verses */}
        {activeTab === 'verses' && (
          <div className="space-y-6">
            {surah.verses.map((verse) => (
              <div
                key={verse.id}
                className={`bg-card rounded-xl border p-6 cursor-pointer transition-all ${
                  selectedVerse === verse.id ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedVerse(selectedVerse === verse.id ? null : verse.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">{verse.id}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-arabic text-foreground mb-4 leading-loose" dir="rtl">
                      {verse.arabic}
                    </p>
                    <p className="text-muted-foreground">{verse.translation}</p>
                    
                    {selectedVerse === verse.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <button className="btn-secondary text-sm flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          {t('surah.generateInsight')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Insights */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-xl border border-primary/20 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                {t('surah.aiDisclaimer')}
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">{t('surah.insights')}</h3>
              <p className="text-muted-foreground">
                Click on any verse and select "Generate Insight" to receive personalized AI-generated reflections based on your profile.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}