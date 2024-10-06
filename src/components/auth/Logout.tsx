import useAuthStore from "../../hooks/store/useAuthStore";
import { Button } from "../ui/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";

const Logout = () => {

    const clearTokens = useAuthStore(s => s.clearTokens)

    const handleLogout = () => {
        clearTokens()
    }

  return (
    <Dialog>
        {/* Button to trigger the dialog */}
        <DialogTrigger asChild>
            <Button className="m-auto" variant="destructive">Logout</Button>
        </DialogTrigger>

        {/* Dialog content for creating a new transaction */}
        <DialogContent>
        <DialogHeader>
            <DialogTitle className="text-3xl text-center my-6">Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
                <DialogClose asChild>
                    <div className="flex justify-center items-center gap-12 mt-8">
                        <Button>No</Button>
                        <Button onClick={handleLogout} variant="destructive">Yes</Button>
                    </div>
                </DialogClose>
        </DialogDescription>
        <DialogFooter>
            <DialogClose asChild>
            <div className="w-full flex justify-center items-center">
                
            </div>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default Logout