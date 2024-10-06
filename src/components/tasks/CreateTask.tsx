import { Button } from "../ui/Button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";
import TaskForm from "./TaskForm";

interface Props {
    projectId: number
}

const CreateTask = ({ projectId }: Props) => {
  return (
    <Dialog>
        {/* Button to trigger the dialog */}
        <DialogTrigger asChild>
            <Button>New Task</Button>
        </DialogTrigger>

        {/* Dialog content for creating a new transaction */}
        <DialogContent>
        <DialogHeader>
            <DialogTitle className="text-3xl text-center my-6">New Task</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
            <TaskForm 
                projectId={projectId}
            />
        </DialogDescription>
        <DialogFooter>
            <DialogClose asChild>
            <div className="w-full flex justify-center items-center">
                <Button variant="destructive">Close</Button>
            </div>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default CreateTask