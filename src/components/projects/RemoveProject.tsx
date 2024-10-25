import { RiDeleteBin2Fill } from "@remixicon/react"
import useRemoveProject from "../../hooks/api/projects/useRemoveProject"
import useAuthStore from "../../hooks/store/useAuthStore"
import { useNavigate } from "react-router-dom"
import Modal from "../ui/Modal"
import { useState } from "react"

interface Props {
    projectId: number
}

const RemoveProject = ({ projectId }: Props) => {

    const removeProject = useRemoveProject(projectId)
    const access = useAuthStore(s => s.access) || ''
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleRemoveProject = () => {
        // removeProject.mutate(
        //     { access }, 
        //     {onSuccess: () => navigate('/projects')}
        // )
        setOpen(false)
    }

  return (
    <div className="flex justify-center items-center">
        <RiDeleteBin2Fill onClick={() => setOpen(true)} className="text-red-500 hover:text-red-700 cursor-pointer"/>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <h2 className="text-lg font-semibold">Hello, Modal!</h2>
            <p className="mt-2">This is a dialog box with a fade and zoom effect.</p>
            <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={() => () => setOpen(false)}
            >
            Close Modal
            </button>
      </Modal>
    </div>
  )
}

export default RemoveProject