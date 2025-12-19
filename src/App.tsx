import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Landing } from './pages/Landing'
import { Onboarding } from './pages/Onboarding'
import { Explore } from './pages/Explore'
import { Library } from './pages/Library'
import { SurahDetail } from './pages/SurahDetail'
import { Auth } from './pages/Auth'
import { useLanguage } from './contexts/LanguageContext'

function App() {
  const { direction } = useLanguage()

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/library" element={<Library />} />
          <Route path="/surah/:id" element={<SurahDetail />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App