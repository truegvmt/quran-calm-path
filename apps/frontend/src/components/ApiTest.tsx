import { useState } from 'react'
import { apiClient } from '@/lib/api'

export function ApiTest() {
  const [status, setStatus] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testApi = async () => {
    setLoading(true)
    try {
      const health = await apiClient.health()
      const surahs = await apiClient.getSurahs()
      setStatus(`✅ API Health: ${JSON.stringify(health)}\n✅ Surahs: ${JSON.stringify(surahs)}`)
    } catch (error) {
      setStatus(`❌ API Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">API Connection Test</h3>
      <button 
        onClick={testApi}
        disabled={loading}
        className="btn-primary mb-4"
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      {status && (
        <div className="bg-gray-100 p-3 rounded text-sm">
          <pre>{status}</pre>
        </div>
      )}
    </div>
  )
}
