import axios from 'axios'

// Environment variable for API URL (fallback to localhost)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6000'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Helper to get tokens from LocalStorage (Avoiding store circular dependency)
const getAccessToken = () => localStorage.getItem('accessToken')
const getRefreshToken = () => localStorage.getItem('refreshToken')

// 1. Request Interceptor: Attach Token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 2. Response Interceptor: Handle Token Refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Check if error is 401 (Unauthorized) and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()

        // If no refresh token, force logout
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        // Call your refresh endpoint
        const { data } = await axios.post(`${API_URL}/auth/local/refresh`, {
          refreshToken,
        })

        // Store new tokens
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        // Update the header for the retry
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

        // Retry the original request
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed (token expired or invalid) -> Logout user
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')

        // Redirect to login (Client-side redirect)
        window.location.href = '/signin'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)
