export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Quranic Insight Platform API
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Backend API is running successfully
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">Available Endpoints</h2>
          <ul className="text-left space-y-2 text-sm">
            <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/health</code> - Health check</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/surahs</code> - List all surahs</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/insights/generate</code> - Generate insights</li>
            <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/library</code> - User library</li>
          </ul>
        </div>
      </div>
    </div>
  )
}