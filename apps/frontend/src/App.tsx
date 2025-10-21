import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Home, BookOpen, Library, User } from 'lucide-react'
import { ApiTest } from './components/ApiTest'

const queryClient = new QueryClient()

function Header() {
  const { isSignedIn, user } = useUser()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">
              Quranic Insight Platform
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                </span>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary">Sign In</button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function HomePage() {
  const { isSignedIn } = useUser()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to the Quranic Insight Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover meaningful insights from the Quran with AI-powered analysis
        </p>
        
        {isSignedIn && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-green-800">✅ You are authenticated and ready to explore!</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Explore Surahs</h3>
            <p className="text-gray-600">Browse through all 114 surahs of the Quran</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Library className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
            <p className="text-gray-600">Get personalized insights powered by AI</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <User className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Personal Library</h3>
            <p className="text-gray-600">Save and organize your favorite insights</p>
          </div>
        </div>
        
        <div className="mt-12">
          <ApiTest />
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/surahs" element={<div className="p-8">Surahs Page - Coming Soon</div>} />
            <Route path="/library" element={<div className="p-8">Library Page - Coming Soon</div>} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App