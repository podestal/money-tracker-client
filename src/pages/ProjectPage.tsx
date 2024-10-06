import { useLocation } from "react-router-dom"
import { Project } from "../services/api/projectsService"
import Tasks from "../components/tasks/Tasks"

const ProjectPage = () => {

  const location = useLocation()
  const project:Project = location.state

  return (
    <div className="text-slate-50 min-h-screen xl:max-w-[1060px] mx-auto py-10">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl text-blue-500 font-bold">{project.name}</h2>
        <p className="text-slate-400">{project.description}</p>
      </div>
      <Tasks 
        projectId={project.id}
      />
    </div>
  )
}

export default ProjectPage