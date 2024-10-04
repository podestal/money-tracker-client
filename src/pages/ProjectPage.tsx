import { useLocation } from "react-router-dom"
import { Project } from "../services/api/projectsService"

const ProjectPage = () => {

  const location = useLocation()
  const project:Project = location.state

  return (
    <div className="text-slate-50 min-h-screen xl:max-w-[1060px] mx-auto">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  )
}

export default ProjectPage