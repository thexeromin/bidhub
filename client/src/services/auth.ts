import { apiClient } from '@/lib/api-client'
import { LoginResponse, TokenResponse } from '@/types/auth'
import { SignupInput, SigninInput } from '@/lib/validations/auth'

export const authService = {
  /**
   * Logs in the user
   * Endpoint: POST /auth/local/signin
   */
  async login(credentials: SigninInput): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>(
      '/auth/local/signin',
      credentials,
    )
    return data
  },

  /**
   * Registers a new user
   * Endpoint: POST /auth/local/signup
   * Note: Returns only tokens. You might need to fetch User Profile separately
   * or redirect to login if your flow requires it.
   */
  async register(userData: SignupInput): Promise<TokenResponse> {
    const { data } = await apiClient.post<TokenResponse>(
      '/auth/local/signup',
      userData,
    )
    return data
  },

  /**
   * Logs out the user
   * Endpoint: POST /auth/local/signout
   */
  async logout(): Promise<boolean> {
    try {
      // We try to notify the server, but even if it fails,
      // the client will delete tokens in the store.
      const { data } = await apiClient.post<boolean>('/auth/local/signout')
      return data
    } catch (error) {
      console.error('Logout failed on server:', error)
      return false
    }
  },

  /**
   * Refreshes the access token
   * Endpoint: POST /auth/local/refresh
   * (Usually handled automatically by api-client interceptors,
   * but exposed here if needed manually)
   */
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const { data } = await apiClient.post<TokenResponse>(
      '/auth/local/refresh',
      {
        refreshToken,
      },
    )
    return data
  },
}
