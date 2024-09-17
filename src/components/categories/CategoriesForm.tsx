import { Input } from "../ui/InputText" // Import the custom Input component
import { Category } from "../../services/api/categoriesService" // Import Category type from the API service
import { UseMutationResult } from "@tanstack/react-query" // Import type definitions from React Query
import { CreateCategoryData } from "../../hooks/api/categories/useCreateCategory" // Import type for create category data
import { Button } from "../ui/Button" // Import the custom Button component
import { useEffect, useRef, useState } from "react" // Import React hooks
import { UpdateCategoryData } from "../../hooks/api/categories/useUpdateCategory"

// Define the type for the props accepted by CategoriesForm component
interface Props {
    access: string // User access token
    category?: Category // Category object
    createCategory?: UseMutationResult<Category, Error, CreateCategoryData> // Mutation hook to create a category
    updateCategory?: UseMutationResult<Category, Error, UpdateCategoryData> // Mutation hook to update a category
    onUpdate?: boolean
    setOnUpdate?: (value: boolean) => void
}

// CategoriesForm component to handle the creation of new categories
const CategoriesForm = ({ access, category, createCategory, updateCategory, onUpdate, setOnUpdate }: Props) => {

    const nameRef = useRef<HTMLInputElement>(null) // Reference to the input element for the category name

    const [success, setSuccess] = useState("") // State for handling success messages
    const [error, setError] = useState("") // State for handling error messages

    useEffect(() => {
        if (nameRef.current && category) nameRef.current.value = category.name
    }, [category])

    // Handler function for form submission
    const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent default form submission behavior

        setSuccess('') // Reset success message state
        setError('') // Reset error message state

        const name = nameRef.current?.value // Get the value of the input field

        // Validate input - check if the category name is provided
        if (!name) {
            setError('Must write a name for the category') // Set error message if validation fails
            return
        }

        // Call the create category mutation
        createCategory && createCategory.mutate(
            { category: { name }, access }, // Pass the category name and access token to the mutation
            {
                onSuccess: () => { // Handle successful mutation
                    if (nameRef.current) nameRef.current.value = '' // Clear the input field
                    setTimeout(() => {
                        setSuccess('Categoría creada') // Set success message after 2 seconds
                    }, 2000)
                },
                onError: (err) => { // Handle mutation error
                    setError(`Error: ${err.message}`) // Set error message
                }
            }
        )
        updateCategory && updateCategory.mutate(
            { updates: { name }, access }
        )
    }

    return (
        <div
            className="w-full flex items-center justify-center mt-6 gap-6"
        >
        <form onSubmit={handleCreateCategory}> {/* Form submission handler */}
            {success && <p className="text-green-500 text-center">{success}</p>} {/* Display success message */}
            {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
            <div className="flex justify-center items-center gap-10"> {/* Form input and button layout */}
                <Input 
                    placeholder="Category name ..." // Placeholder for the input field
                    ref={nameRef} // Attach the input reference to the ref hook
                />
                <Button>{onUpdate ? 'Update' : 'Add'}</Button> {/* Button to trigger form submission */}
            </div>
        </form>
        {onUpdate && <Button onClick={() => setOnUpdate && setOnUpdate(false)} variant="destructive">Cancel</Button>} {/* Button to trigger form cancel updating */}
        </div>
    )
}

export default CategoriesForm // Export the component for use in other parts of the application
