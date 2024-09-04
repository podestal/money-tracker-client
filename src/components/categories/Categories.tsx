import { Button } from "../ui/Button"
import useGetCategories from "../../hooks/api/categories/useGetCategories"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";
import CategoryCard from "./CategoryCard";
import CreateCategory from "./CreateCategory";

const Categories = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: categories, isLoading, isError, error, isSuccess} = useGetCategories(access)

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <Dialog>
        {/* Button to trigger the dialog */}
        <DialogTrigger asChild>
            <Button>Categories</Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
            <div>
                {categories.map( category => <CategoryCard key={category.id} category={category}/>)}
                <CreateCategory />
            </div>
        </DialogDescription>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="destructive">Close</Button>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default Categories