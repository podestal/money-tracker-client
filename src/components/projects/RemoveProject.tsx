import { RiDeleteBin2Fill } from "@remixicon/react"
import useRemoveProject from "../../hooks/api/projects/useRemoveProject"
import useAuthStore from "../../hooks/store/useAuthStore"
import { useNavigate } from "react-router-dom"
import Modal from "../ui/Modal"
import { useState } from "react"
import { Button } from "../ui/Button"
import useNotificationStore from "../../hooks/store/useNotificationStore"

interface Props {
    projectId: number
}

const RemoveProject = ({ projectId }: Props) => {

    const removeProject = useRemoveProject(projectId)
    const access = useAuthStore(s => s.access) || ''
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { setMessage, setShow, setType} = useNotificationStore()

    const handleRemoveProject = () => {
        removeProject.mutate(
            { access }, 
            {onSuccess: () => {
                navigate('/projects')
                setShow(true)
                setType('success')
                setMessage('Project removed successfully')
            },
            onError: error => {
                setShow(true)
                setType('error')
                setMessage(`Error: ${error.message}`)
            }
        }
        )
    }

  return (
    <div className="flex justify-center items-center">
        <RiDeleteBin2Fill onClick={() => setOpen(true)} className="text-red-500 hover:text-red-700 cursor-pointer"/>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <h2 className="text-center text-xl font-semibold">Are you sure</h2>
            <div className="w-full flex justify-center items-center gap-12 mt-8">
                <Button onClick={handleRemoveProject} variant="destructive">Yes</Button>
                <Button>Cancel</Button>
            </div>
      </Modal>
    </div>
  )
}

export default RemoveProject