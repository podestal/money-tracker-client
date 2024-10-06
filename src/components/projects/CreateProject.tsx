import { RiAddCircleFill } from "@remixicon/react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";
import { Button } from "../ui/Button"
import ProjectForm from "./ProjectForm"
import useCreateProject from "../../hooks/api/projects/useCreateProject";

const CreateProject = () => {

    const createProject = useCreateProject()

  return (
    <Dialog>
        {/* Button to trigger the dialog */}
        <DialogTrigger asChild>
            <div>
                <RiAddCircleFill 
                    className="cursor-pointer"
                    color="blue"
                    size={40}
                />
            </div>
        </DialogTrigger>

        {/* Dialog content for creating a new transaction */}
        <DialogContent>
        <DialogHeader>
            <DialogTitle className="text-3xl text-center my-6">New Project</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
            <ProjectForm 
                createProject={createProject}
            />
            {/* Form component to create a new transaction */}
            {/* <TransactionForm createTransaction={createTransaction} access={access} /> */}
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

export default CreateProject