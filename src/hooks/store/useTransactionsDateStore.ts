import { create } from "zustand" // Zustand library for state management
import getCurrentDate from "../../utils/getCurrentDate" // Utility function to get the current date

// Define the interface for the store's state and actions
interface TransactionsDateState {
    date: string // The date state, which will store the selected date
    setDate: (value: string) => void // Function to update the date
}

// Create a zustand store to manage the transaction date state
const useTransactionsDateStore = create<TransactionsDateState>((set) => ({
    date: getCurrentDate(), // Initialize the store with the current date
    setDate: (date) => {
        set({ date }) // Function to update the date in the store
    }
}))

export default useTransactionsDateStore
