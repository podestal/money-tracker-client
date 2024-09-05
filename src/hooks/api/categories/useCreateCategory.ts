import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query" // Import react-query hooks and types
import getCategoryService, { Category, CategoryCreateUpdate } from "../../../services/api/categoriesService" // Import the category service and type definitions
import { CATEGORIES_CACHE_KEY } from "../../../lib/constants" // Import cache key constant

// Interface defining the data structure needed to create a new category
export interface CreateCategoryData {
    access: string // User access token
    category: CategoryCreateUpdate // Data for creating or updating a category
}

// Custom hook to create a new category using React Query
const useCreateCategory = (): UseMutationResult<Category, Error, CreateCategoryData> => {
    const categoryService = getCategoryService() // Initialize the category service
    const queryClient = useQueryClient() // Get the query client instance for cache management

    // Use React Query's useMutation hook to handle the mutation logic for creating a category
    return useMutation({
        mutationFn: (data: CreateCategoryData) => categoryService.post(data.category, data.access), // Function to create a new category via API
        onSuccess: (res) => {
            console.log(res) // Log the successful response for debugging
            queryClient.invalidateQueries({ queryKey: CATEGORIES_CACHE_KEY }) // Invalidate the cache to refetch categories
        },
        onError: (err) => {
            console.log(err) // Log the error for debugging
        }
    })
}

export default useCreateCategory // Export the custom hook for use in other parts of the application
