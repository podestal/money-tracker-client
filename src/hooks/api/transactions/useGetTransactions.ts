import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTransactionService, { Transaction } from "../../../services/api/transactionsService"
import { getTransactionsKey } from "../../../lib/constants"

const useGetTransactions = (access: string, date: string): UseQueryResult<Transaction[], Error> => {
    // Get transactions service without transaction ID
    const transactionsService = getTransactionService({dateRange: date})
    // Get transactions cache key
    const TRANSACTIONS_CACHE_KEY = getTransactionsKey(date)
    // useQuery to fetch transactions data with the provided access token
    return useQuery({
        queryKey: TRANSACTIONS_CACHE_KEY, // Cache key for storing the query result
        queryFn: () => transactionsService.get(access), // Function to fetch transactions from the API
        staleTime: 1 * 60 * 1000, // Time in milliseconds before the data is considered stale (1 minute)
    })
}

export default useGetTransactions
