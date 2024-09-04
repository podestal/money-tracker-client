import useCreateCategory from "../../hooks/api/categories/useCreateCategory"
import useAuthStore from "../../hooks/store/useAuthStore"
import CategoriesForm from "./CategoriesForm"

const CreateCategory = () => {

    const access = useAuthStore(s => s.access) || ''
    const createCategory = useCreateCategory()

  return (
    <CategoriesForm 
        access={access}
        createCategory={createCategory}
    />
  )
}

export default CreateCategory