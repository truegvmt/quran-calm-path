import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Sun, Moon, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useTheme } from '@/contexts/ThemeContext'
import { LanguageSelector } from './LanguageSelector'

export function Header() {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Quranic Insights</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/explore"
              className={`text-sm font-medium transition-colors ${
                isActive('/explore') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('nav.explore')}
            </Link>
            <Link
              to="/library"
              className={`text-sm font-medium transition-colors ${
                isActive('/library') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('nav.library')}
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-2">
              <Link to="/auth" className="btn-secondary text-sm">
                {t('nav.signIn')}
              </Link>
              <Link to="/onboarding" className="btn-primary text-sm">
                {t('nav.getStarted')}
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/explore"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${isActive('/explore') ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {t('nav.explore')}
              </Link>
              <Link
                to="/library"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${isActive('/library') ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {t('nav.library')}
              </Link>
              <div className="flex gap-2 pt-4 border-t border-border">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="btn-secondary text-sm flex-1 text-center">
                  {t('nav.signIn')}
                </Link>
                <Link to="/onboarding" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-sm flex-1 text-center">
                  {t('nav.getStarted')}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}