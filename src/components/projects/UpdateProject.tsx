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
    <div className="w-full flex justify-center items-center gap-10">
      <p className={`${project.is_active ? 'text-green-500' : 'text-slate-500'} font-bold text-lg`}>{project.is_active ? 'Active' : 'Inactive'}</p>
      <Switch 
          value={isActive}
          setter={setIsActive}
          access={access}
          mutation={updateProject}
          project={project}
          setErrorMessage={setErrorMessage}
      />
    </div>

  )
}

export default UpdateProject