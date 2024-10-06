import { useLocation } from "react-router-dom"
import { Project } from "../services/api/projectsService"
import Tasks from "../components/tasks/Tasks"
import CreateTask from "../components/tasks/CreateTask"

const ProjectPage = () => {

  const location = useLocation()
  const project:Project = location.state

  return (
    <div className="text-slate-50 min-h-screen xl:max-w-[1060px] mx-auto py-10">
      <div className="flex flex-col gap-6 mb-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-4xl text-blue-500 font-bold">{project.name}</h2>
          <CreateTask 
            projectId={project.id}
          />
        </div>
        <p className="text-slate-400">{project.description}</p>
      </div>
      <div className="w-full grid grid-cols-4 gap-12 text-center my-10">
        <div>
          <h2 className="text-3xl ">Not started</h2>
          <Tasks 
            projectId={project.id}
            filter='N'
          />
        </div>
        <div>
          <h2 className="text-3xl ">In Progress</h2>
          <Tasks 
            projectId={project.id}
            filter='P'
          />
        </div>
        <div>
          <h2 className="text-3xl ">In Review</h2>
          <Tasks 
            projectId={project.id}
            filter='R'
          />
        </div>
        <div>
          <h2 className="text-3xl ">Done</h2>
          <Tasks 
            projectId={project.id}
            filter='C'
          />
        </div>
      </div>
    </div>
  )
}

export default ProjectPage