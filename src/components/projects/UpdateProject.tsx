import { useState } from "react"
import Switch from "../ui/Switch"
import { Project } from "../../services/api/projectsService"

interface Props {
    project: Project
}

const UpdateProject = ({ project }: Props) => {

    const [isActive, setIsActive] = useState(project.is_active)

  return (
    <Switch 
        value={isActive}
        setter={setIsActive}
    />
  )
}

export default UpdateProject