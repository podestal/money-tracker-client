import { RiPencilFill } from "@remixicon/react"
import { Project } from "../../services/api/projectsService"
import { useState } from "react"
import { Button } from "../ui/Button"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"

interface Props {
    project: Project
}

const ProjectDescription = ({ project }: Props) => {

    const [updateMode, setUpdateMode] = useState(false)
    const [description, setDescription] = useState(project.description)
    const access = useAuthStore(s => s.access) || ''
    const updateProject = useUpdateProject({ projectId: project.id })

    const handleClick = () => {
        setUpdateMode(false)
        updateProject.mutate({ updates: { is_active: project.is_active, name: project.name, description }, access})
    }

  return (
    <>
        {updateMode 
        ?  
        <>
            <textarea 
                className="bg-gray-950 border-gray-800 rounded-lg w-full text-sm text-slate-50 h-[100px]"
                value={description}
                onChange={e => setDescription(e.target.value)}
            /> 
            <Button onClick={handleClick}>Save</Button>
            <Button onClick={() => setUpdateMode(false)}>Cancel</Button>
        </>
        : 
        <>
            <RiPencilFill onClick={() => setUpdateMode(true)} className="text-blue-600 hover:cursor-pointer" size={20}/>
            <p className="text-slate-400">{project.description}</p>
        </>
        }
    </>
  )
}

export default ProjectDescription


