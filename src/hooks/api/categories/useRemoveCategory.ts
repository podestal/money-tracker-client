import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query" // Import react-query hooks and types
import getCategoryService, { Category } from "../../../services/api/categoriesService" // Import the category service and type definitions
import { CATEGORIES_CACHE_KEY } from "../../../lib/constants" // Import cache key constant

// Interface defining the data structure needed to delete a category
interface DeleteCategoryData {
    access: string // User access token
}

// Custom hook to remove (delete) a category using React Query
const useRemoveCategory = (categoryId: number): UseMutationResult<Category, Error, DeleteCategoryData> => {
    const categoryService = getCategoryService(categoryId) // Initialize the category service with the specific category ID
    const queryClient = useQueryClient() // Get the query client instance for cache management

    // Use React Query's useMutation hook to handle the mutation logic for deleting a category
    return useMutation({
        mutationFn: (data: DeleteCategoryData) => categoryService.delete(data.access), // Function to delete a category via API
        onSuccess: (res) => {
            console.log(res) // Log the successful response for debugging
            queryClient.invalidateQueries({ queryKey: CATEGORIES_CACHE_KEY }) // Invalidate the cache to refetch categories
        },
        onError: (err) => {
            console.log(err) // Log the error for debugging
        }
    })
}

export default useRemoveCategory // Export the custom hook for use in other parts of the application
