import { Category } from "../../services/api/categoriesService"

interface Props {
    category: Category
}

const Category = ({ category }: Props) => {
  return (
    <div>{category.name}</div>
  )
}

export default Category