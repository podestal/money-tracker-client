import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getTransactionService, { TransactionCreateUpdate, Transaction } from "../../../services/api/transactionsService";
import { Balance } from "../../../services/api/balanceService"
import { TRANSACTIONS_CACHE_KEY, BALANCE_CACHE_KEY } from "../../../lib/constants";

// Interface for the data required to create a new transaction
export interface CreateTransactionData {
    access: string                 // The access token for authentication
    transaction: TransactionCreateUpdate // The transaction data to be sent to the API
}

// Custom hook to handle the creation of a new transaction
const useCreateTransaction = (): UseMutationResult<Transaction, Error, CreateTransactionData> => {
    // Get the transaction service without a specific transaction ID (used for creating new transactions)
    const transactionsService = getTransactionService()
    
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
            console.log('Transaction created successfully:', res)

            // Update the balance cache locally, without refetching from the server
            queryClient.setQueryData<Balance>(BALANCE_CACHE_KEY, (prev) => {
                // If the balance data is available, modify it locally
                if (prev) {
                    console.log('Locally updating balance')
                    
                    // If the transaction is an income, add the amount; otherwise, subtract it
                    if (res.transaction_type === 'IN') {
                        prev.amount += res.amount
                    } else {
                        prev.amount -= res.amount
                    }
                } else {
                    // If the balance data isn't available, refetch from the server
                    console.log('Balance not found, refetching from server')
                    queryClient.invalidateQueries({ queryKey: BALANCE_CACHE_KEY })
                }
                return prev; // Return the updated balance
            });
        },

        // Callback function executed when the mutation fails
        onError: err => {
            console.error('Error creating transaction:', err)
        },
    });
}

export default useCreateTransaction;
