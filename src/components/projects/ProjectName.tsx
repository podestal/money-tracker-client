import { RiPencilFill } from "@remixicon/react"
import { useState } from "react"
import { Input } from "../ui/InputText"
import { Button } from "../ui/Button"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"

interface Props {
    projectName: string
    projectId: number
    projectActive: boolean
}

const ProjectName = ({projectName, projectId, projectActive}: Props) => {

    const [updateMode, setUpdateMode] = useState(false)
    const [name, setName] = useState(projectName)
    const access = useAuthStore(s => s.access) || ''
    const updateProject = useUpdateProject({ projectId })

    const handleClick = () => {
        setUpdateMode(false)
        updateProject.mutate({updates: {name, is_active: projectActive}, access})
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
            <h2 className="text-4xl text-blue-500 font-bold">{projectName} {projectId}</h2>
        </>
    }

    </>
  )
}

export default ProjectName