import { RiPencilFill } from "@remixicon/react" // Import pencil icon from Remixicon
import CategoriesForm from "./CategoriesForm" // Import CategoriesForm component
import useAuthStore from "../../hooks/store/useAuthStore" // Import custom auth store hook
import { Category } from "../../services/api/categoriesService" // Import Category type
import useUpdateCategory from "../../hooks/api/categories/useUpdateCategory" // Import the update category hook

// Define the type for props accepted by UpdateCategory component
interface Props {
    onUpdate: boolean // Boolean indicating if the category is being updated
    setOnUpdate: (value: boolean) => void // Function to set the 'onUpdate' state
    category: Category // Category object to be updated
}

// UpdateCategory functional component.
// This component displays an icon to trigger category update or the update form if 'onUpdate' is true.
const UpdateCategory = ({ onUpdate, setOnUpdate, category }: Props) => {

    // Get access token from the authentication store
    const access = useAuthStore(s => s.access) || ''

    // Initialize the update category mutation hook
    const updateCategory = useUpdateCategory(category.id)

    return (
        <>
            {/* Conditionally render the update form or the edit icon based on 'onUpdate' state */}
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
                    className="text-blue-500 cursor-pointer hover:text-blue-600" // Pencil icon styles
                    onClick={() => setOnUpdate(true)} // Show the form when clicked
                />
            }
        </>
    )
}

export default UpdateCategory
