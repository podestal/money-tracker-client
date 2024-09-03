import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import getTransactionService, { Transaction } from "../../../services/api/transactionsService";
import { TRANSACTIONS_CACHE_KEY, BALANCE_CACHE_KEY } from "../../../lib/constants";

// Interface representing the data required to delete a transaction
interface DeleteTransactionData {
  access: string // User access token for authorization
}

// Custom hook for deleting a transaction
const useRemoveTransaction = (transactionId: number): UseMutationResult<Transaction, Error, DeleteTransactionData> => {
  // Get the specific transaction service instance for the provided transaction ID
  const transactionService = getTransactionService(transactionId)
  
  // Get the QueryClient instance to manage cache and invalidate queries
  const queryClient = useQueryClient()

  // Mutation hook to handle transaction deletion
  return useMutation({
    // Function to perform the delete mutation
    mutationFn: (data: DeleteTransactionData) => transactionService.delete(data.access),
    
    // Success callback: Invalidate relevant cache keys to ensure fresh data
    onSuccess: (res) => {
      console.log('Transaction successfully deleted:', res)
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_CACHE_KEY })
      queryClient.invalidateQueries({ queryKey: BALANCE_CACHE_KEY })
    },
    
    // Error callback: Log errors to the console
    onError: (err) => {
      console.error('Error deleting transaction:', err)
    }
  });
};

export default useRemoveTransaction
