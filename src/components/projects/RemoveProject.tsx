import { RiDeleteBin2Fill } from "@remixicon/react"
import useRemoveProject from "../../hooks/api/projects/useRemoveProject"
import useAuthStore from "../../hooks/store/useAuthStore"
import { useNavigate } from "react-router-dom"

interface Props {
    projectId: number
}

const RemoveProject = ({ projectId }: Props) => {

    const removeProject = useRemoveProject(projectId)
    const access = useAuthStore(s => s.access) || ''
    const navigate = useNavigate()

    const handleRemoveProject = () => {
        removeProject.mutate({ access }, {onSuccess: () => navigate('/projects')})

    }

  return (
    <div className="flex justify-center items-center">
        <RiDeleteBin2Fill onClick={handleRemoveProject} className="text-red-500 hover:text-red-700 cursor-pointer"/>
    </div>
  )
}

export default RemoveProject