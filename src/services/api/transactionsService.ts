import APIClient from "./apiClient"

export interface Transaction {
    id: number            // Unique identifier for the transaction
    transaction_type: string  // Type of transaction (e.g., deposit, withdrawal)
    amount: number        // Amount of the transaction
    created_at: Date      // Timestamp of when the transaction was created
    updated_at: Date      // Timestamp of when the transaction was last updated
    description?: string   // Description of the transaction
    user: number          // ID of the user associated with the transaction
    category: number      // ID of the category associated with the transaction
}

// Type for creating a transaction, excluding automatically handled fields
export type TransactionCreate = Omit<Transaction, 'id' | 'created_at' | 'updated_at' | 'user'>;

const URL = 'transactions/'

export default new APIClient<Transaction, TransactionCreate>(URL) // Create a new APIClient instance for transactions