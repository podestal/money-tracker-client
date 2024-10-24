import { useLocation } from "react-router-dom"
import Tasks from "../components/tasks/Tasks"
import UpdateProject from "../components/projects/UpdateProject"
import useAuthStore from "../hooks/store/useAuthStore"
import useRetrieveProject from "../hooks/api/projects/useRetrieveProject"
import ProjectName from "../components/projects/ProjectName"
import ProjectDescription from "../components/projects/ProjectDescription"
import ProjectDueDate from "../components/projects/ProjectDueDate"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"

const ProjectPage = () => {

  const location = useLocation()
  const projectId = location.state.id
  const access = useAuthStore(s => s.access) || ''
  const {data: project, isLoading, isError, error, isSuccess} = useRetrieveProject({access, projectId})
  const [errorMessage, setErrorMessage] = useState('')

  if (isLoading) return (
    <div className="min-h-screen xl:w-[1060px] mx-auto pt-10">
      <div className="flex justify-between items-center gap-4 mb-6">
        <Skeleton height={40} width={220} style={{marginTop: '2px'}} baseColor='#64748b'/>
        <Skeleton height={20} width={140} style={{marginTop: '2px'}} baseColor='#64748b'/>
        <Skeleton height={20} width={100} style={{marginTop: '2px'}} baseColor='#64748b'/>
        <Skeleton height={20} width={180} style={{marginTop: '2px'}} baseColor='#64748b'/>
      </div>
      <div className="flex justify-start items-center gap-4 w-full">
        <Skeleton height={100} width={1060} style={{marginTop: '2px'}} baseColor='#64748b'/>
      </div>
      <div className="grid grid-cols-5 gap-6 mt-10 text-center">
        <Skeleton height={300} style={{marginTop: '2px'}} baseColor='#64748b'/>
        <Skeleton height={400} style={{marginTop: '2px'}} baseColor='#64748b'/>
        <Skeleton height={270} style={{marginTop: '2px'}} baseColor='#64748b'/>
        <Skeleton height={360} style={{marginTop: '2px'}} baseColor='#64748b'/>
        <Skeleton height={140} width={140} style={{marginTop: '2px'}} baseColor='#64748b'/>
      </div>
    </div>
  )

  if (isError) return <p>Error: {error.message}</p>

  if (isSuccess)

  return (
    <div className="min-h-screen xl:w-[1060px] mx-auto pt-10">
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <div className="flex flex-col gap-6 mb-4">
        <div className="w-full grid grid-cols-6  gap-6">
          <ProjectName 
            project={project}
            setErrorMessage={setErrorMessage}
          />
          <UpdateProject 
            project={project}
            setErrorMessage={setErrorMessage}
          />
          <ProjectDueDate 
            project={project}
            setErrorMessage={setErrorMessage}
          />
        </div>
      <ProjectDescription 
        project={project}
        setErrorMessage={setErrorMessage}
      />
      </div>
      <Tasks 
        projectId={projectId}
      />
    </div>
  )
}

export default ProjectPage