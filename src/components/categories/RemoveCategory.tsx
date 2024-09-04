import { RiDeleteBin2Fill } from "@remixicon/react" 
import useRemoveCategory from "../../hooks/api/categories/useRemoveCategory"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Category } from "../../services/api/categoriesService"

interface Props {
    category: Category
}

const RemoveCategory = ({ category }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const removeCategory = useRemoveCategory(category.id)

    const handleRemoveCategory = () => {        
        removeCategory.mutate({access})
    }

  return (
    <div>
        <RiDeleteBin2Fill 
            className="text-red-500 hover:text-red-600 cursor-pointer"
            onClick={handleRemoveCategory}
        />
    </div>
  )
}

export default RemoveCategory