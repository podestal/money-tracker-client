import { Input } from "../ui/InputText"
import { Category } from "../../services/api/categoriesService"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateCategoryData } from "../../hooks/api/categories/useCreateCategory"
import { Button } from "../ui/Button"

interface Props {
    access: string,
    createCategory: UseMutationResult<Category, Error, CreateCategoryData>
}

const CategoriesForm = ({ access, createCategory }: Props) => {

    const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createCategory.mutate({category: {name: 'new one'}, access})
    }

  return (
    <form onSubmit={handleCreateCategory} className="flex justify-center items-center gap-10">
        <Input 
            placeholder="Category name ..."
        />
        <Button>Add</Button>
    </form>
  )
}

export default CategoriesForm