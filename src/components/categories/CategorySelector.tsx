import useGetCategories from "../../hooks/api/categories/useGetCategories" // Custom hook to fetch categories
import useAuthStore from "../../hooks/store/useAuthStore" // Custom hook to manage authentication state
import Selector from "../ui/Selector" // Import the reusable Selector component

// Define the props interface for CategorySelector
interface Props {
    setSelectedCategory: (categoryId: number) => void // Function to set the selected category ID
    categoryId?: number // Optional category ID, used for the default selection
    all?: boolean // Optional boolean to allow selecting "all" categories
}

// CategorySelector component allows selecting a category from the dropdown
const CategorySelector = ({ setSelectedCategory, categoryId, all }: Props) => {

    const defaultValue = categoryId || 0 // Set default value to categoryId, or 0 if not provided
    const access = useAuthStore(s => s.access) || '' // Get the access token from the auth store
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories(access) // Fetch categories using custom hook

    // Show loading text while fetching categories
    if (isLoading) return <p>Loading ...</p>

    // Show error message if there's an error while fetching categories
    if (isError) return <p>Error: {error.message}</p>

    // Show the category selector once categories have been successfully fetched
    if (isSuccess)
        return (
            <Selector 
                defaultValue={defaultValue} // Pass the default value to the Selector
                values={categories} // Pass the list of categories as options
                setter={setSelectedCategory} // Setter function for setting the selected category
                label="Categories" // Label for the dropdown
                all={all} // Pass the "all categories" option
            />
        )

    return null // Return null if nothing to display
}

export default CategorySelector // Export the CategorySelector component
