import { RiPencilFill } from "@remixicon/react"
import { useState } from "react"
import { Input } from "../ui/InputText"
import { Button } from "../ui/Button"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"
import { Project } from "../../services/api/projectsService"

interface Props {
    project: Project
    setErrorMessage: (value: string) => void
}

const ProjectName = ({ project, setErrorMessage}: Props) => {

    const [updateMode, setUpdateMode] = useState(false)
    const [name, setName] = useState(project.name)
    const access = useAuthStore(s => s.access) || ''
    const updateProject = useUpdateProject({ projectId: project.id })

    const handleClick = () => {
        updateProject.mutate(
            {updates: {name, is_active: project.is_active}, access},
            {
                onSuccess: () => setUpdateMode(false),
                onError: err => {
                    setErrorMessage(`Error: ${err.message}`)
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 4000)
                }
            
            }
        )
    }

  return (
    <>
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
            <RiPencilFill onClick={() => setUpdateMode(true)} className="text-blue-600 hover:cursor-pointer" size={20}/>
            <h2 className="text-4xl text-blue-500 font-bold">{project.name}</h2>
        </>
    }

    </>
  )
}

export default ProjectName