import { create } from "zustand"
import getCurrentDate from "../../utils/getCurrentDate"

interface TransactionsDateState {
    date: string
    setDate: (value: string) => void
}

const useTransactionsDateStore = create<TransactionsDateState>(set => ({
    date: getCurrentDate(),
    setDate: (date) => {
        set({date})}
}))

export default useTransactionsDateStore

// import { create } from 'zustand'

// // Define the state and methods for the authentication store
// interface AuthState {
//     access: string | null // JWT access token
//     refresh: string | null // JWT refresh token
//     setTokens: (access: string, refresh: string) => void // Method to set tokens
//     clearTokens: () => void // Method to clear tokens
// }

// // Create Zustand store to manage authentication state
// const useAuthStore = create<AuthState>(set => ({
//     // Initialize access and refresh tokens from local storage
//     access: localStorage.getItem('access'),
//     refresh: localStorage.getItem('refresh'),

//     // Method to store tokens in local storage and update the state
//     setTokens: (access, refresh) => {
//         localStorage.setItem('access', access) // Save access token
//         localStorage.setItem('refresh', refresh) // Save refresh token
//         set({ access, refresh }) // Update state with new tokens
//     },

//     // Method to clear tokens from local storage and update the state
//     clearTokens: () => {
//         localStorage.removeItem('access') // Remove access token
//         localStorage.removeItem('refresh') // Remove refresh token
//         set({ access: '', refresh: '' }) // Reset state tokens to empty strings
//     },
// }))

// export default useAuthStore
