import { RiDeleteBin2Fill } from "@remixicon/react" 
import useRemoveCategory from "../../hooks/api/categories/useRemoveCategory"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Category } from "../../services/api/categoriesService"

// Component to remove a category
interface Props {
    category: Category
}

const RemoveCategory = ({ category }: Props) => {
    // Get the access token from the authentication store
    const access = useAuthStore(s => s.access) || ''

    // Hook to handle removing a category via API call
    const removeCategory = useRemoveCategory(category.id)

    // Function to handle category removal
    const handleRemoveCategory = () => {        
        // Call the API to remove the category with the access token
        removeCategory.mutate({ access })
    }

  return (
    <div>
        {/* Delete icon which triggers the remove category function on click */}
        <RiDeleteBin2Fill 
            className="text-red-500 hover:text-red-600 cursor-pointer"
            onClick={handleRemoveCategory}
        />
    </div>
  )
}

export default RemoveCategory
