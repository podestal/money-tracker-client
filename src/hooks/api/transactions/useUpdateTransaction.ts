import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query" // Importing React Query hooks and types
import getTransactionService, { Transaction, TransactionCreateUpdate } from "../../../services/api/transactionsService" // Importing the service and types for transactions
import { getTransactionsKey, BALANCE_CACHE_KEY } from "../../../lib/constants" // Importing constants for cache keys

// Interface defining the shape of the data needed to update a transaction
export interface UpdateTransactionData {
    access: string, // User access token
    updates: TransactionCreateUpdate // Object containing the transaction data to be updated
}

// Custom hook for updating a transaction
const useUpdateTransaction = (transactionId: number, date: string): UseMutationResult<Transaction, Error, UpdateTransactionData> => {
    const queryClient = useQueryClient() // Get the query client instance to manage cache
    const transactionService = getTransactionService({transactionId}) // Get the transaction service instance for the specific transaction
    const TRANSACTIONS_CACHE_KEY = getTransactionsKey(date)
    // Return a mutation hook that allows updating the transaction
    return useMutation({
        // Function that performs the mutation by calling the service's update method
        mutationFn: (data: UpdateTransactionData) => transactionService.update(data.updates, data.access),
        
        // Callback function executed on successful mutation
        onSuccess: res => {
            console.log(res) // Log the response for debugging purposes
            
            // Invalidate the relevant queries to ensure fresh data is fetched from the server
            queryClient.invalidateQueries({ queryKey: TRANSACTIONS_CACHE_KEY })
            queryClient.invalidateQueries({ queryKey: BALANCE_CACHE_KEY })
        },
        
        // Callback function executed on mutation error
        onError: err => console.log(err) // Log the error for debugging purposes
    })
}

export default useUpdateTransaction // Exporting the custom hook for use in other parts of the app
