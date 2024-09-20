import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTransactionService, { Transaction } from "../../../services/api/transactionsService"
import { getTransactionsKey, BALANCE_CACHE_KEY } from "../../../lib/constants"
import { Balance } from "../../../services/api/balanceService"
import useTransactionsDateStore from "../../store/useTransactionsDateStore"

// Interface representing the data required to delete a transaction
interface DeleteTransactionData {
    access: string // User access token for authorization
}

// Props interface defining the properties required for the remove transaction hook
interface Props {
    transactionId: number // ID of the transaction to delete
    transactionType: string // Type of the transaction ('IN' or 'OUT')
    transactionAmount: number // Amount of the transaction
}

// Custom hook for deleting a transaction
const useRemoveTransaction = ({ transactionId, transactionType, transactionAmount}: Props): UseMutationResult<Transaction, Error, DeleteTransactionData> => {
    const date = useTransactionsDateStore(s => s.date)
    const TRANSACTIONS_CACHE_KEY = getTransactionsKey(date) 

    // Get the specific transaction service instance for the provided transaction ID
    const transactionService = getTransactionService({transactionId})
    
    // Get the QueryClient instance to manage cache and invalidate queries
    const queryClient = useQueryClient()

    // Mutation hook to handle transaction deletion
    return useMutation({
        // Function to perform the delete mutation
        mutationFn: (data: DeleteTransactionData) => transactionService.delete(data.access),
        
        // Success callback: Invalidate relevant cache keys to ensure fresh data
        onSuccess: (res) => {
            console.log('Transaction successfully deleted:', res)

            // Update the transactions cache by filtering out the deleted transaction
            queryClient.setQueryData<Transaction[]>(TRANSACTIONS_CACHE_KEY, prev => 
                prev?.filter(transaction => transaction.id !== transactionId))

            // Update the balance cache based on the transaction type
            queryClient.setQueryData<Balance>(BALANCE_CACHE_KEY, prev => {
                if (prev) {
                    return {
                        ...prev,
                        amount: transactionType === 'IN'
                            ? prev.amount - transactionAmount // Deduct for 'IN' transaction
                            : prev.amount + transactionAmount // Add for 'OUT' transaction
                    }
                } else {
                    // Invalidate the balance query if no previous data is found
                    queryClient.invalidateQueries({ queryKey: BALANCE_CACHE_KEY })
                    return prev
                }
            })
        },
        
        // Error callback: Log errors to the console
        onError: (err) => {
            console.error('Error deleting transaction:', err)
        }
    })
}

export default useRemoveTransaction // Export the hook for use in other parts of the app
