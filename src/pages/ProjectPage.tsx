import { useLocation } from "react-router-dom"
import Tasks from "../components/tasks/Tasks"
import UpdateProject from "../components/projects/UpdateProject"
import useAuthStore from "../hooks/store/useAuthStore"
import useRetrieveProject from "../hooks/api/projects/useRetrieveProject"
import { RiPencilFill } from "@remixicon/react"
import ProjectName from "../components/projects/ProjectName"

const ProjectPage = () => {

  const location = useLocation()
  const projectId = location.state.id
  const access = useAuthStore(s => s.access) || ''
  const {data: project, isLoading, isError, error, isSuccess} = useRetrieveProject({access, projectId})

  if (isLoading) return <p>Loading ...</p>

  if (isError) return <p>Error: {error.message}</p>

  if (isSuccess)

  return (
    <div className="text-slate-50 min-h-screen xl:w-[1060px] mx-auto pt-10">
      <div className="flex flex-col gap-6 mb-4">
        <div className="w-full flex justify-start items-center gap-6">
          <ProjectName 
            projectName={project.name}
            projectId={project.id}
          />
          <UpdateProject 
            project={project}
          />
        </div>
      <div className="w-full flex justify-start items-center gap-6">
        <RiPencilFill className="text-blue-600 hover:cursor-pointer" size={20}/>
        <p className="text-slate-400">{project.description}</p>
      </div>
      </div>
      <Tasks 
        projectId={projectId}
      />
    </div>
  )
}

export default ProjectPage