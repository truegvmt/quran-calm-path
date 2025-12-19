import { Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  ] as const

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 p-2 rounded-lg hover:bg-secondary transition-colors">
        <Globe className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
          {languages.find(l => l.code === language)?.nativeName}
        </span>
      </button>
      
      <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[140px] z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full px-4 py-2 text-sm text-start hover:bg-secondary transition-colors first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'text-primary font-medium' : 'text-foreground'
            }`}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  )
}