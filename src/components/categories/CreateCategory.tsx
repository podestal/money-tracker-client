import useCreateCategory from "../../hooks/api/categories/useCreateCategory"
import useAuthStore from "../../hooks/store/useAuthStore"
import CategoriesForm from "./CategoriesForm"

// Component to create a new category
const CreateCategory = () => {
    // Get the access token from the authentication store
    const access = useAuthStore(s => s.access) || ''

    // Hook to handle category creation via API call
    const createCategory = useCreateCategory()

  return (
    // Render the CategoriesForm component, passing in the access token and category creation function
    <CategoriesForm 
        access={access}
        createCategory={createCategory}
    />
  )
}

export default CreateCategory
