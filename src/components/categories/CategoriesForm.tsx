import { Input } from "../ui/InputText" // Import the custom Input component
import { Category } from "../../services/api/categoriesService" // Import Category type from the API service
import { UseMutationResult } from "@tanstack/react-query" // Import type definitions from React Query
import { CreateCategoryData } from "../../hooks/api/categories/useCreateCategory" // Import type for create category data
import { Button } from "../ui/Button" // Import the custom Button component
import { useEffect, useRef, useState } from "react" // Import React hooks
import { UpdateCategoryData } from "../../hooks/api/categories/useUpdateCategory" // Import type for updating category data
import useNotificationStore from "../../hooks/store/useNotificationStore"

// Define the type for the props accepted by CategoriesForm component
interface Props {
    access: string // User access token
    category?: Category // Category object (optional)
    createCategory?: UseMutationResult<Category, Error, CreateCategoryData> // Mutation hook to create a category (optional)
    updateCategory?: UseMutationResult<Category, Error, UpdateCategoryData> // Mutation hook to update a category (optional)
    onUpdate?: boolean // Boolean indicating if the category is being updated
    setOnUpdate?: (value: boolean) => void // Function to set the 'onUpdate' state
}

// CategoriesForm component to handle the creation and updating of categories
const CategoriesForm = ({ access, category, createCategory, updateCategory, onUpdate, setOnUpdate }: Props) => {

    // Reference to the input element for the category name
    const nameRef = useRef<HTMLInputElement>(null)

    // State for handling error messages
    const [error, setError] = useState("")

    const { setMessage, setShow, setType } = useNotificationStore()

    // Effect to set the category name in the input field if an existing category is passed
    useEffect(() => {
        if (nameRef.current && category) nameRef.current.value = category.name
    }, [category])

    // Handler function for form submission
    const handleCreateCategory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent default form submission behavior

        setError('') // Reset error message state

        const name = nameRef.current?.value // Get the value of the input field

        // Validate input - check if the category name is provided
        if (!name) {
            setError('Must write a name for the category') // Set error message if validation fails
            return
        }

        // Call the create category mutation if available
        createCategory && createCategory.mutate(
            { category: { name }, access }, // Pass the category name and access token to the mutation
            {
                onSuccess: () => { // Handle successful mutation
                    if (nameRef.current) nameRef.current.value = '' // Clear the input field
                    setShow(true)
                    setType('success')
                    setMessage(`Category successfully created`)
                },
                onError: (err) => { // Handle mutation error
                    setShow(true)
                    setType('error')
                    setMessage(`Error: ${err.message}`) // Set error message
                }
            }
        )

        // Call the update category mutation if available
        updateCategory && updateCategory.mutate(
            { updates: { name }, access },
            {
                onSuccess: () => { // Handle successful mutation
                    setOnUpdate && setOnUpdate(false)
                    setShow(true)
                    setType('error')
                    setMessage(`Category updated`)
                },
                onError: (err) => { // Handle mutation error
                    setShow(true)
                    setType('error')
                    setMessage(`Error: ${err.message}`) // Set error message
                }
            }
        )
    }

    return (
        <div
            className="w-full flex items-center justify-center gap-6 mt-8 mb-4"
        >
            <form onSubmit={handleCreateCategory}> {/* Form submission handler */}
                {error && <p className="text-red-500 text-center my-2">{error}</p>} {/* Display error message */}
                <div className="flex justify-center items-center gap-10"> {/* Form input and button layout */}
                    <Input 
                        placeholder="Category name ..." // Placeholder for the input field
                        ref={nameRef} // Attach the input reference to the ref hook
                    />
                    <Button>{onUpdate ? 'Update' : 'Add'}</Button> {/* Button to trigger form submission */}
                </div>
            </form>
            {/* Cancel button shown only when updating */}
            {onUpdate && <Button onClick={() => setOnUpdate && setOnUpdate(false)} variant="destructive">Cancel</Button>}
        </div>
    )
}

export default CategoriesForm // Export the component for use in other parts of the application
