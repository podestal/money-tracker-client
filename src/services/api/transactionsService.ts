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

const getTransactionService = (transactionId?: number) => {

    // Conditionally URL that depends on the existence of transactionId
    const URL = transactionId ? `transactions/${transactionId}/` : 'transactions/'
    // Create a new instance of the APIClient for Transaction objects, using the specified endpoint
    return new APIClient<Transaction, TransactionCreate>(URL)
}

// Export the function that creates a transaction service
export default getTransactionService
