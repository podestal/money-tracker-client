import { Button } from "../ui/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";

const Logout = () => {
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
            <div className="flex justify-center items-center gap-12 mt-8">
                <DialogClose asChild>
                    <Button>No</Button>
                </DialogClose>
                <Button variant="destructive">Yes</Button>
            </div>
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