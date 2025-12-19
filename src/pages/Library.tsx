import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Lightbulb, Folder, Star, Clock } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Mock saved items
const savedVerses = [
  { id: 1, surah: 'Al-Fatiha', verse: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.' },
  { id: 2, surah: 'Al-Baqarah', verse: 255, arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.' },
]

const savedInsights = [
  { id: 1, title: 'The importance of gratitude', surah: 'Al-Fatiha', date: '2024-01-15' },
  { id: 2, title: 'Patience in adversity', surah: 'Al-Baqarah', date: '2024-01-14' },
]

export function Library() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'verses' | 'insights' | 'folders'>('verses')
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'favorites'>('all')

  const hasItems = savedVerses.length > 0 || savedInsights.length > 0

  if (!hasItems) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {t('library.empty')}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t('library.emptyDesc')}
          </p>
          <Link to="/explore" className="btn-primary">
            {t('library.startExploring')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-80px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('library.title')}
          </h1>
          <p className="text-muted-foreground">{t('library.subtitle')}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('verses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'verses' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            {t('library.savedVerses')}
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'insights' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Lightbulb className="h-4 w-4" />
            {t('library.savedInsights')}
          </button>
          <button
            onClick={() => setActiveTab('folders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'folders' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Folder className="h-4 w-4" />
            {t('library.folders')}
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'all' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('library.all')}
          </button>
          <button
            onClick={() => setActiveFilter('recent')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'recent' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Clock className="h-3 w-3" />
            {t('library.recent')}
          </button>
          <button
            onClick={() => setActiveFilter('favorites')}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors ${
              activeFilter === 'favorites' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Star className="h-3 w-3" />
            {t('library.favorites')}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'verses' && (
          <div className="grid gap-4">
            {savedVerses.map((verse) => (
              <div key={verse.id} className="bg-card rounded-xl border border-border p-6">
                <p className="text-2xl font-arabic text-foreground mb-4 leading-loose" dir="rtl">
                  {verse.arabic}
                </p>
                <p className="text-muted-foreground mb-4">{verse.translation}</p>
                <p className="text-sm text-primary">{verse.surah} : {verse.verse}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="grid gap-4">
            {savedInsights.map((insight) => (
              <div key={insight.id} className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-2">{insight.title}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{insight.surah}</span>
                  <span>{insight.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'folders' && (
          <div className="text-center py-12 text-muted-foreground">
            {t('library.folders')} - Coming soon
          </div>
        )}
      </div>
    </div>
  )
}