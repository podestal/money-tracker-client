import { useState } from "react"
import { Category } from "../../services/api/categoriesService"
import RemoveCategory from "./RemoveCategory"
import UpdateCategory from "./UpdateCategory"

// Define the interface for the expected props.
// This component will receive a 'category' object of type 'Category' as a prop.
interface Props {
    category: Category
}

// CategoryCard functional component.
// This component displays a category's name along with a button to remove it.
const CategoryCard = ({ category }: Props) => {

  const [onUpdate, setOnUpdate] = useState(false)

  return (
    <>
    {/* Main container for the category card. */}
    {/* Flexbox is used to align the category name and remove button. */}
    {/* Added hover effect, padding, and rounded corners for styling. */}
    <div className="w-full grid grid-cols-3 my-4 hover:bg-slate-800 py-2 px-4 rounded-3xl">
        {/* Display the category name in large text */}
        {!onUpdate && 
          <>
            <p className="text-xl text-slate-50">{category.name}</p>
            {/* Component to remove the category. Pass the current category as a prop */}
            <RemoveCategory 
                category={category}
            />
          </>
        } 
    </div>
    <UpdateCategory 
          onUpdate={onUpdate}
          setOnUpdate={setOnUpdate}
          category={category}
        /> 
    </>
  )
}

export default CategoryCard
