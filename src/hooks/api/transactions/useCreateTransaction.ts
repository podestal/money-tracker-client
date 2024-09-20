import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getTransactionService, { TransactionCreateUpdate, Transaction } from "../../../services/api/transactionsService";
import { Balance } from "../../../services/api/balanceService"
import { getTransactionsKey, BALANCE_CACHE_KEY } from "../../../lib/constants";
import getCurrentDate from "../../../utils/getCurrentDate";


// Interface for the data required to create a new transaction
export interface CreateTransactionData {
    access: string                 // The access token for authentication
    transaction: TransactionCreateUpdate // The transaction data to be sent to the API
}

// Custom hook to handle the creation of a new transaction
const useCreateTransaction = (): UseMutationResult<Transaction, Error, CreateTransactionData> => {

    const date = getCurrentDate()
    const TRANSACTIONS_CACHE_KEY = getTransactionsKey(date)

    // Get the transaction service without a specific transaction ID (used for creating new transactions)
    const transactionsService = getTransactionService({})
    
    // Initialize the query client to interact with the React Query cache
    const queryClient = useQueryClient()

    // Return a mutation hook to handle the creation of a new transaction
    return useMutation({
        // Define the mutation function that posts the transaction data to the API
        mutationFn: (data: CreateTransactionData) => 
            transactionsService.post(data.transaction, data.access),

        // Callback function executed on successful mutation
        onSuccess: res => {
            // Update the transactions cache locally by prepending the new transaction
            queryClient.setQueryData<Transaction[]>(TRANSACTIONS_CACHE_KEY, (prev) => 
                prev ? [res, ...prev] : [res] // If there are previous transactions, prepend the new one
            );

            // Update the balance cache locally
            queryClient.setQueryData<Balance>(BALANCE_CACHE_KEY, (prev) => {
                if (prev) {
                    return {
                        ...prev, // Create a new object with the previous properties
                        amount: res.transaction_type === 'IN' 
                            ? prev.amount + res.amount  // Increment amount for 'IN'
                            : prev.amount - res.amount  // Decrement amount for 'OUT'
                    };
                } else {
                    // If the previous value is undefined or null, invalidate queries to refetch data
                    queryClient.invalidateQueries({ queryKey: BALANCE_CACHE_KEY })
                    return prev // Return prev as a fallback, although it will be refetched
                }
            })
        },

        // Callback function executed when the mutation fails
        onError: err => {
            console.error('Error creating transaction:', err)
        },
    });
}

export default useCreateTransaction;
