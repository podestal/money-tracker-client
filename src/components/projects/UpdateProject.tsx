import { useState } from "react"
import Switch from "../ui/Switch"
import { Project } from "../../services/api/projectsService"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"

interface Props {
    project: Project
}

const UpdateProject = ({ project }: Props) => {

    const [isActive, setIsActive] = useState(project.is_active)
    const access = useAuthStore(s => s.access) || ''
    const updateProject = useUpdateProject({projectId: project.id})
    const userId = useAuthStore(s => s.userId)

  return (
    <div className="w-full flex justify-center items-center gap-10">
      <p className={`${project.is_active ? 'text-blue-600' : 'text-slate-500'} font-bold text-lg`}>{project.is_active ? 'Active' : 'Inactive'}</p>
      {userId ===  project.user &&  
      <Switch 
          value={isActive}
          setter={setIsActive}
          access={access}
          mutation={updateProject}
          project={project}
      />}
    </div>

  )
}

export default UpdateProject