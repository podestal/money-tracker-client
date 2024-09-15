import { Button } from "../ui/Button"
import useGetCategories from "../../hooks/api/categories/useGetCategories"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";
import CategoryCard from "./CategoryCard";
import CreateCategory from "./CreateCategory";

// Main component to display and manage categories
const Categories = () => {
    // Get the access token from the authentication store
    const access = useAuthStore(s => s.access) || ''
    
    // Fetch categories from API using a custom hook. 
    // Returns data, loading status, error status, and success status.
    const { data: categories, isLoading, isError, error, isSuccess } = useGetCategories(access)

    // While categories are loading, display a loading message.
    if (isLoading) return <p>Loading ...</p>

    // If there is an error fetching categories, display an error message.
    if (isError) return <p>Error: {error.message}</p>

    // When data is successfully fetched, display the dialog with the list of categories.
    if (isSuccess)
      return (
        <Dialog>
            {/* DialogTrigger wraps the Button component to trigger the dialog. */}
            <DialogTrigger asChild>
                <Button>Categories</Button>
            </DialogTrigger>
            
            {/* Main content of the dialog with category list and create category form */}
            <DialogContent>
                <DialogHeader>
                    {/* Title for the dialog */}
                    <DialogTitle className="text-3xl text-center my-4">Categories</DialogTitle>
                </DialogHeader>
                
                {/* Body of the dialog containing category list and create category form */}
                <DialogDescription asChild>
                    <div>
                        {/* Map through the categories and render CategoryCard for each */}
                        {categories.map(category => (
                          <CategoryCard key={category.id} category={category}/>
                        ))}
                        
                        {/* Form to create a new category */}
                        <CreateCategory />
                    </div>
                </DialogDescription>
                
                {/* Dialog footer with a close button */}
                <DialogFooter>
                    <DialogClose asChild>
                        <div className="w-full flex justify-center mt-6">
                            <Button variant="destructive">Close</Button>
                        </div>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )
}

export default Categories
