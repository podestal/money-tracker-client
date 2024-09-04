import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getCategoryService, { Category } from "../../../services/api/categoriesService"
import { CATEGORIES_CACHE_KEY } from "../../../lib/constants"

interface DeleteCategoryData {
    access: string
}

const useRemoveCategory = (categoryId: number): UseMutationResult<Category, Error, DeleteCategoryData> => {
    const categoryService = getCategoryService(categoryId)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: DeleteCategoryData) => categoryService.delete(data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({ queryKey: CATEGORIES_CACHE_KEY })
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useRemoveCategory