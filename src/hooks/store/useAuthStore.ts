import { jwtDecode } from 'jwt-decode'
import { create } from 'zustand'

interface DecodedToken {
    user_id: number;
}

// Define the state and methods for the authentication store
interface AuthState {
    access: string | null // JWT access token
    refresh: string | null // JWT refresh token
    userId: number
    setUserId: (id: number) => void
    setTokens: (access: string, refresh: string) => void // Method to set tokens
    clearTokens: () => void // Method to clear tokens
}

// Create Zustand store to manage authentication state
const useAuthStore = create<AuthState>(set => ({
    // Initialize access and refresh tokens from local storage
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    // userId: jwtDecode<DecodedToken>(localStorage.getItem('access') || '').user_id,
    userId: localStorage.getItem('access') ? jwtDecode<DecodedToken>(localStorage.getItem('access') || '').user_id : 0,
    // Method to store tokens in local storage and update the state
    setTokens: (access, refresh) => {
        localStorage.setItem('access', access) // Save access token
        localStorage.setItem('refresh', refresh) // Save refresh token
        set({ access, refresh }) // Update state with new tokens
    },

    // Method to clear tokens from local storage and update the state
    clearTokens: () => {
        localStorage.removeItem('access') // Remove access token
        localStorage.removeItem('refresh') // Remove refresh token
        set({ access: '', refresh: '', userId: 0 }) // Reset state tokens to empty strings
    },

    setUserId: (id) => {
        set({ userId: id })
    }
}))

export default useAuthStore
