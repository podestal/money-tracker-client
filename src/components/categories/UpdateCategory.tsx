import { RiPencilFill } from "@remixicon/react"
import CategoriesForm from "./CategoriesForm"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Category } from "../../services/api/categoriesService"
import useUpdateCategory from "../../hooks/api/categories/useUpdateCategory"

interface Props {
    onUpdate: boolean
    setOnUpdate: (value: boolean) => void
    category: Category
}

const UpdateCategory = ({ onUpdate, setOnUpdate, category }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateCategory = useUpdateCategory(category.id)

  return (
    <>
        {onUpdate 
        ? 
        <CategoriesForm 
            access={access}
            category={category}    
            updateCategory={updateCategory}
            onUpdate={onUpdate}
            setOnUpdate={setOnUpdate}
        />
        :
        <RiPencilFill 
            className="text-blue-500 cursor-pointer hover:text-blue-600"
            onClick={() => setOnUpdate(true)}
        />
        }
    </>
  )
}

export default UpdateCategory