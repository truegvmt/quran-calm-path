const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    return response.json()
  }

  // Health check
  async health() {
    return this.request('/health')
  }

  // User profile (requires auth)
  async getUserProfile() {
    return this.request('/user/profile')
  }

  // Surahs (public)
  async getSurahs() {
    return this.request('/surahs')
  }

  // Insights (requires auth)
  async generateInsight(data: any) {
    return this.request('/insights/generate', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
}

export const apiClient = new ApiClient()
