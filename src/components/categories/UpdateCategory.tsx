import { RiPencilFill } from "@remixicon/react"
import CategoriesForm from "./CategoriesForm"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Category } from "../../services/api/categoriesService"
import useUpdateCategory from "../../hooks/api/categories/useUpdateCategory"
import { Button } from "../ui/Button"

interface Props {
    onUpdate: boolean
    setOnUpdate: (value: boolean) => void
    category: Category
}

const UpdateCategory = ({ onUpdate, setOnUpdate, category }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateCategory = useUpdateCategory(category.id)

  return (
    <div>
        {onUpdate 
        ? 
            <div className="w-full text-center">
                <CategoriesForm 
                    access={access}
                    category={category}    
                    updateCategory={updateCategory}
                />
                <Button 
                    variant="destructive"
                    onClick={() => setOnUpdate(false)}
                >
                Cancel</Button>
            </div>
        :
        <RiPencilFill 
            className="text-blue-500 cursor-pointer hover:text-blue-600"
            onClick={() => setOnUpdate(true)}
        />
        }
    </div>
  )
}

export default UpdateCategory