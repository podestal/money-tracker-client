import { useState } from "react"
import { Category } from "../../services/api/categoriesService"
import RemoveCategory from "./RemoveCategory"
import UpdateCategory from "./UpdateCategory"
import { motion } from "framer-motion"

// Define the interface for the expected props.
// This component will receive a 'category' object of type 'Category' as a prop.
interface Props {
    category: Category
}

// CategoryCard functional component.
// This component displays a category's name along with buttons to remove or update it.
const CategoryCard = ({ category }: Props) => {

    // State to control whether the category is being updated
    const [onUpdate, setOnUpdate] = useState(false)

    return (
        <motion.div 
            layout
            className={`${onUpdate ? 'flex' : 'grid grid-cols-5'} w-full my-4 hover:bg-slate-800 py-2 px-4 rounded-3xl`}>
            {/* Conditionally render the category name and remove button when not updating */}
            {!onUpdate && 
                <>
                    {/* Display the category name */}
                    <p className="text-xl text-slate-50 col-span-3">{category.name}</p>
                    {/* Component to remove the category. Pass the current category as a prop */}
                    <RemoveCategory 
                        category={category}
                    />
                </>
            } 
            {/* UpdateCategory component allows category updates */}
            <UpdateCategory 
                onUpdate={onUpdate}
                setOnUpdate={setOnUpdate}
                category={category}
            /> 
        </motion.div>
    )
}

export default CategoryCard
