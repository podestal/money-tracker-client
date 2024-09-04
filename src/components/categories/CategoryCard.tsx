import { Category } from "../../services/api/categoriesService"

interface Props {
    category: Category
}

const CategoryCard = ({ category }: Props) => {
  return (
    <div>{category.name}</div>
  )
}

export default CategoryCard