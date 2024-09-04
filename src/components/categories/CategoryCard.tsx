import { Category } from "../../services/api/categoriesService"
import RemoveCategory from "./RemoveCategory"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <div>
        <p>{category.name}</p>
        <RemoveCategory />
    </div>
  )
}

export default CategoryCard