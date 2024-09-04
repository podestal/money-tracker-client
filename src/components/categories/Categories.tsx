import { Button } from "../ui/Button"
import useGetCategories from "../../hooks/api/categories/useGetCategories"
import useAuthStore from "../../hooks/store/useAuthStore"

const Categories = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data} = useGetCategories(access)

  return (
    <div>
        <>{console.log('cats:', data)}</>
        <Button>Categories</Button>
    </div>
  )
}

export default Categories