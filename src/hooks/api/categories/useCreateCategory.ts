import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getCategoryService, {Category, CategoryCreateUpdate} from "../../../services/api/categoriesService"
import { CATEGORIES_CACHE_KEY } from "../../../lib/constants"

export interface CreateCategoryData {
    access: string
    category: CategoryCreateUpdate
}

const useCreateCategory = (): UseMutationResult<Category, Error, CreateCategoryData> => {
    const categoryService = getCategoryService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateCategoryData) => categoryService.post(data.category, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: CATEGORIES_CACHE_KEY})
        },
        onError: err => {
            console.log(err)
        }
    })
}

export default useCreateCategory