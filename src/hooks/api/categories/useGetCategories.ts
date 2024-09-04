import { UseQueryResult, useQuery } from "@tanstack/react-query" // Import react-query hooks and types
import getCategoryService, { Category } from "../../../services/api/categoriesService" // Import the category service and type definitions
import { CATEGORIES_CACHE_KEY } from "../../../lib/constants" // Import cache key constant

// Custom hook to fetch categories using React Query
const useGetCategories = (access: string): UseQueryResult<Category, Error> => {
    // Initialize the category service
    const categoryService = getCategoryService()

    // Use React Query's useQuery hook to fetch categories
    return useQuery({
        queryKey: CATEGORIES_CACHE_KEY, // Unique key to cache the categories
        queryFn: () => categoryService.get(access), // Function to fetch categories from the API
        staleTime: 1 * 60 * 1000, // Time in milliseconds before the cached data is considered stale (1 minute)
    })
}

export default useGetCategories // Export the custom hook for use in other parts of the application
