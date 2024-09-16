import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getCategoryService, { Category, CategoryCreateUpdate } from "../../../services/api/categoriesService"
import { CATEGORIES_CACHE_KEY } from "../../../lib/constants"

// Define an interface for the data required to update a category
export interface UpdateCategoryData {
    access: string; // The access token for authentication
    updates: CategoryCreateUpdate; // The data with updates for the category
}

// A custom hook to handle category updates
const useUpdateCategory = (categoryId: number): UseMutationResult<Category, Error, UpdateCategoryData> => {
    const categoryService = getCategoryService(categoryId) // Initialize the category service for the given categoryId
    const queryClient = useQueryClient() // Get the query client instance to interact with React Query's cache

    // Use the useMutation hook from React Query for handling mutation (update) operations
    return useMutation({
        // The function that performs the actual category update (API call)
        mutationFn: (data: UpdateCategoryData) => 
            categoryService.update(data.updates, data.access), // Update the category using the service's update method

        // A callback to handle what happens after a successful mutation
        onSuccess: res => {
            console.log(res) // Log the response for debugging purposes

            // Invalidate the category queries so React Query will refetch the updated data
            queryClient.invalidateQueries({ queryKey: CATEGORIES_CACHE_KEY })
        },

        // A callback to handle what happens when the mutation fails
        onError: err => console.log(err) // Log the error in case the mutation fails
    })
}

export default useUpdateCategory
