import { RiUserAddFill } from "@remixicon/react"
import Modal from "../ui/Modal"
import { useState } from "react"
import { Input } from "../ui/InputText"
import { Button } from "../ui/Button"

const TaskOwner = () => {

    const [open, setOpen] = useState(false)

  return (
    <>
        <RiUserAddFill onClick={() => setOpen(true)} size={18} className="text-neutral-500 hover:text-neutral-600 hover:cursor-pointer"/>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <h2 className="text-center text-xl font-semibold">Assign a user</h2>
            <form className="w-full flex justify-center items-center gap-6 my-6">
            <Input 
                placeholder="Search user ..."
            />
            <Button>Search</Button>
            </form>
        </Modal>
    </>
  )
}

export default TaskOwner