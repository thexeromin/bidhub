import { create } from 'zustand'
import { User, Tokens } from '@/types/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setAuth: (user: User, tokens: Tokens) => void
  updateUser: (user: Partial<User>) => void
  logout: () => void
  initialize: () => void // Call this on app mount
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start loading to check localStorage

  setAuth: (user, tokens) => {
    // 1. Save to LocalStorage (for persistence & api-client)
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)
      localStorage.setItem('user', JSON.stringify(user))
    }

    // 2. Update State
    set({ user, isAuthenticated: true, isLoading: false })
  },

  updateUser: (updates) => {
    set((state) => {
      const updatedUser = state.user ? { ...state.user, ...updates } : null

      if (updatedUser && typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }

      return { user: updatedUser }
    })
  },

  logout: () => {
    // 1. Clear LocalStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }

    // 2. Reset State
    set({ user: null, isAuthenticated: false, isLoading: false })
  },

  initialize: () => {
    // If running on server, do nothing (keep loading true to prevent hydration mismatch)
    if (typeof window === 'undefined') return

    try {
      const accessToken = localStorage.getItem('accessToken')
      const userStr = localStorage.getItem('user')

      if (accessToken && userStr) {
        set({
          user: JSON.parse(userStr),
          isAuthenticated: true,
          isLoading: false, // Stop loading on success
        })
      } else {
        // 🔴 CRITICAL: Stop loading even if no user found!
        set({ user: null, isAuthenticated: false, isLoading: false })
      }
    } catch (error) {
      localStorage.clear()
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },
}))
