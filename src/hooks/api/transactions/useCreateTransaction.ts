import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import getTransactionService, { TransactionCreateUpdate, Transaction } from "../../../services/api/transactionsService";
import { TRANSACTIONS_CACHE_KEY, BALANCE_CACHE_KEY } from "../../../lib/constants";

// Interface for the data required to create a new transaction
export interface CreateTransactionData {
    access: string;                 // The access token for authentication
    transaction: TransactionCreateUpdate; // The transaction data to be sent to the API
}

// Custom hook to handle the creation of a new transaction
const useCreateTransaction = (): UseMutationResult<Transaction, Error, CreateTransactionData> => {

    // Get transactions service without transaction ID
    const transactionsService = getTransactionService()
    // Initialize the query client to interact with the React Query cache
    const queryClient = useQueryClient();

    // Return a useMutation hook from React Query
    return useMutation({
        // Define the function to be called when the mutation is triggered
        mutationFn: (data: CreateTransactionData) => 
            transactionsService.post(data.transaction, data.access), // Call the service's post method with transaction data and access token

        // Define a callback function to run when the mutation is successful
        onSuccess: res => {
            // Invalidate the queries for transactions and balance to ensure fresh data is fetched
            queryClient.invalidateQueries({ queryKey: TRANSACTIONS_CACHE_KEY });
            queryClient.invalidateQueries({ queryKey: BALANCE_CACHE_KEY });

            // Log the response to the console for debugging purposes
            console.log('res:', res);
        },

        // Define a callback function to run when the mutation fails
        onError: err => console.log(err), // Log the error to the console
    });
}

export default useCreateTransaction;
