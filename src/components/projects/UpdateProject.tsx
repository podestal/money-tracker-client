import { useState } from "react"
import Switch from "../ui/Switch"
import { Project } from "../../services/api/projectsService"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"

interface Props {
    project: Project
    setErrorMessage: (value: string) => void
}

const UpdateProject = ({ project, setErrorMessage }: Props) => {

    const [isActive, setIsActive] = useState(project.is_active)
    const access = useAuthStore(s => s.access) || ''
    const updateProject = useUpdateProject({projectId: project.id})

  return (
    <Switch 
        value={isActive}
        setter={setIsActive}
        access={access}
        mutation={updateProject}
        project={project}
        setErrorMessage={setErrorMessage}
    />
  )
}

export default UpdateProject