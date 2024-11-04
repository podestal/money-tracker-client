import { Button } from "../ui/Button"
import useGetCategories from "../../hooks/api/categories/useGetCategories"
import useAuthStore from "../../hooks/store/useAuthStore"
import CategoryCard from "./CategoryCard";
import CreateCategory from "./CreateCategory";
import Skeleton from "react-loading-skeleton";
import Modal from "../ui/Modal";
import { useState } from "react";

// Main component to display and manage categories
const Categories = () => {
    // Get the access token from the authentication store
    const access = useAuthStore(s => s.access) || ''
    const [open, setOpen] = useState(false)
    
    // Fetch categories from API using a custom hook. 
    // Returns data, loading status, error status, and success status.
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories(access)

    const handleClose = () => {
        setOpen(false)
    }

    // While categories are loading, display a loading message.
    if (isLoading) return (
        <div className='text-7xl font-bold mb-6 text-center'>
            <Skeleton width={120} style={{marginTop: '10px'}} baseColor='#64748b'/>
        </div>
    ) 
    

    // If there is an error fetching categories, display an error message.
    if (isError) return <p>Error: {error.message}</p>

    // When data is successfully fetched, display the dialog with the list of categories.
    if (isSuccess)
      return (
        <>
            <Button onClick={() => setOpen(true)}>Categories</Button>
            <Modal
                isOpen={open}
                onClose={handleClose}
                title="Categories"
            >
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category}/>
                ))}
                <CreateCategory />
            </Modal>
        </>
      )
}

export default Categories
