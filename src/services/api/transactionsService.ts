import APIClient from "./apiClient"
import getCurrentDate from "../../utils/getCurrentDate"

export interface Transaction {
    id: number            // Unique identifier for the transaction
    transaction_type: string  // Type of transaction (e.g., deposit, withdrawal)
    amount: number        // Amount of the transaction
    created_at: string | Date      // Timestamp of when the transaction was created
    updated_at: Date      // Timestamp of when the transaction was last updated
    description?: string   // Description of the transaction
    user: number          // ID of the user associated with the transaction
    category: number      // ID of the category associated with the transaction
}

// Type for creating a transaction, excluding automatically handled fields
export type TransactionCreateUpdate = Omit<Transaction, 'id' | 'updated_at' | 'user'>

interface Props {
    transactionId?: number
    dateRange?: string
}

const getTransactionService = ({transactionId, dateRange} : Props) => {

    // Get the current date to use it as a default value in the params query
    const currentDate = getCurrentDate()
    // Conditionally URL that depends on the existence of transactionId
    const URL = transactionId ? `transactions/${transactionId}/` : `${dateRange ? `transactions/?created_at=${dateRange}` : `transactions/?created_at=${currentDate}`}`
    // Create a new instance of the APIClient for Transaction objects, using the specified endpoint
    
    return new APIClient<Transaction, TransactionCreateUpdate>(URL)
}

// Export the function that creates a transaction service
export default getTransactionService
