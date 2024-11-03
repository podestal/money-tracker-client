import { RiPencilFill } from "@remixicon/react"
import { useState } from "react"
import { Input } from "../ui/InputText"
import { Button } from "../ui/Button"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"
import { Project } from "../../services/api/projectsService"
import useNotificationStore from "../../hooks/store/useNotificationStore"

interface Props {
    project: Project
}

const ProjectName = ({ project}: Props) => {

    const [updateMode, setUpdateMode] = useState(false)
    const [name, setName] = useState(project.name)
    const access = useAuthStore(s => s.access) || ''
    const userId = useAuthStore(s => s.userId)
    const updateProject = useUpdateProject({ projectId: project.id })
    const { setMessage, setShow, setType } = useNotificationStore()

    const handleClick = () => {
        updateProject.mutate(
            {updates: {name, is_active: project.is_active}, access},
            {
                onSuccess: () => {
                    setUpdateMode(false)
                    setShow(true)
                    setType('success')
                    setMessage('Name updated successfully')
                },
                onError: err => {
                    setShow(true)
                    setType('error')
                    setMessage(`Error: ${err.message}`)
                }
            }
        )
    }

  return (
    <div className="w-full flex justify-start items-center gap-6 col-span-3">
    {
        updateMode 
        ? 
        <>
            <Input 
                className="text-xl font-bold"
                value={name}
                onChange={e => setName(e.target.value)}
            /> 
            <Button onClick={handleClick}>Save</Button>
            <Button onClick={() => setUpdateMode(false)}>Cancel</Button>
        </>
        : 
        <>
            {userId === project.user && <RiPencilFill onClick={() => setUpdateMode(true)} className="text-blue-600 hover:cursor-pointer" size={20}/>}
            <h2 className="text-4xl  font-bold">{project.name}</h2>
        </>
    }

    </div>
  )
}

export default ProjectName