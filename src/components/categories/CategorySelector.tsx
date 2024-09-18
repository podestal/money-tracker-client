import useGetCategories from "../../hooks/api/categories/useGetCategories" // Custom hook to fetch categories
import useAuthStore from "../../hooks/store/useAuthStore" // Custom hook to manage authentication state
import Selector from "../ui/Selector"

// Define the type for the props accepted by CategorySelector component
interface Props {
    setSelectedCategory: (categoryId: number) => void // Function to set the selected category ID
    categoryId: number | undefined
}

// CategorySelector component allows the user to select a category from a dropdown
const CategorySelector = ({ setSelectedCategory, categoryId }: Props) => {

    const defaultValue = categoryId || 0
    const access = useAuthStore(s => s.access) || '' // Get the access token from the auth store
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories(access) // Fetch categories using a custom hook

    // Display loading message while fetching data
    if (isLoading) return <p>Loading ...</p>

    // Display error message if fetching data fails
    if (isError) return <p>Error: {error.message}</p>

    // Display the dropdown selector once data is successfully fetched
    if (isSuccess)
        return (
            <Selector 
                defaultValue={defaultValue}
                values={categories}
                setter={setSelectedCategory}
            />
        )

    return null // Fallback in case no state matches
}

export default CategorySelector // Export the component for use in other parts of the application
