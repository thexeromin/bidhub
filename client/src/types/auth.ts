export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
  email: string
  phone: string
  firstName?: string
  lastName?: string
  createdAt: string
}

// Response for /auth/local/signin
export interface LoginResponse extends User {
  token: Tokens
}

// Response for /auth/local/signup and /auth/local/refresh
export interface TokenResponse extends Tokens {}

// Generic API Error Interface
export interface ApiError {
  message: string
  error?: string
  statusCode?: number
}
