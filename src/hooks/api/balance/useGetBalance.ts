import { UseQueryResult, useQuery } from "@tanstack/react-query"; // Import react-query hooks and types for data fetching
import balanceService, { Balance } from "../../../services/api/balanceService"; // Import balance service and Balance type
import { BALANCE_CACHE_KEY } from "../../../lib/constants"; // Import the cache key constant for balance

// Custom hook to fetch balance data using react-query
const useGetBalance = (access: string): UseQueryResult<Balance, Error> => {
    return useQuery({
        queryKey: BALANCE_CACHE_KEY, // Unique key for caching the balance data
        queryFn: () => balanceService.get(access), // Function to fetch balance data from the API
        staleTime: 1 * 60 * 1000, // Time (in milliseconds) for which the data is considered fresh (1 minute)
    });
}

export default useGetBalance; // Export the custom hook for use in other parts of the application
