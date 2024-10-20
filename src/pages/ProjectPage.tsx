import { useLocation } from "react-router-dom"
import Tasks from "../components/tasks/Tasks"
import UpdateProject from "../components/projects/UpdateProject"
import useAuthStore from "../hooks/store/useAuthStore"
import useRetrieveProject from "../hooks/api/projects/useRetrieveProject"
import ProjectName from "../components/projects/ProjectName"
import ProjectDescription from "../components/projects/ProjectDescription"
import { useState } from "react"

const ProjectPage = () => {

  const location = useLocation()
  const projectId = location.state.id
  const access = useAuthStore(s => s.access) || ''
  const {data: project, isLoading, isError, error, isSuccess} = useRetrieveProject({access, projectId})
  const [errorMessage, setErrorMessage] = useState('')

  if (isLoading) return <p>Loading ...</p>

  if (isError) return <p>Error: {error.message}</p>

  if (isSuccess)

  return (
    <div className="text-slate-50 min-h-screen xl:w-[1060px] mx-auto pt-10">
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <div className="flex flex-col gap-6 mb-4">
        <div className="w-full flex justify-start items-center gap-6">
          <ProjectName 
            project={project}
            setErrorMessage={setErrorMessage}
          />
          <UpdateProject 
            project={project}
            setErrorMessage={setErrorMessage}
          />
        </div>
      <div className="w-full flex justify-start items-center gap-6">
        <ProjectDescription 
          project={project}
          setErrorMessage={setErrorMessage}
        />
      </div>
      </div>
      <Tasks 
        projectId={projectId}
      />
    </div>
  )
}

export default ProjectPage