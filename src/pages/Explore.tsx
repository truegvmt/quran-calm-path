import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Sample Surah data
const surahs = [
  { id: 1, name: 'Al-Fatiha', arabic: 'الفاتحة', verses: 7, type: 'Meccan' },
  { id: 2, name: 'Al-Baqarah', arabic: 'البقرة', verses: 286, type: 'Medinan' },
  { id: 3, name: 'Ali Imran', arabic: 'آل عمران', verses: 200, type: 'Medinan' },
  { id: 4, name: 'An-Nisa', arabic: 'النساء', verses: 176, type: 'Medinan' },
  { id: 5, name: 'Al-Ma\'idah', arabic: 'المائدة', verses: 120, type: 'Medinan' },
  { id: 6, name: 'Al-An\'am', arabic: 'الأنعام', verses: 165, type: 'Meccan' },
  { id: 7, name: 'Al-A\'raf', arabic: 'الأعراف', verses: 206, type: 'Meccan' },
  { id: 8, name: 'Al-Anfal', arabic: 'الأنفال', verses: 75, type: 'Medinan' },
  { id: 9, name: 'At-Tawbah', arabic: 'التوبة', verses: 129, type: 'Medinan' },
  { id: 10, name: 'Yunus', arabic: 'يونس', verses: 109, type: 'Meccan' },
  { id: 11, name: 'Hud', arabic: 'هود', verses: 123, type: 'Meccan' },
  { id: 12, name: 'Yusuf', arabic: 'يوسف', verses: 111, type: 'Meccan' },
]

export function Explore() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSurahs = surahs.filter(
    surah =>
      surah.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.arabic.includes(searchQuery)
  )

  return (
    <div className="min-h-[calc(100vh-80px)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('explore.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('explore.subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('explore.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-12 pe-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.id}
              to={`/surah/${surah.id}`}
              className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-semibold">{surah.id}</span>
                </div>
                <span className="text-2xl font-arabic text-foreground">{surah.arabic}</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{surah.name}</h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{surah.verses} {t('explore.verses')}</span>
                <span>{surah.type === 'Meccan' ? t('explore.meccan') : t('explore.medinan')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}