import useGetProjects from "../../hooks/api/projects/useGetProjects"
import useAuthStore from "../../hooks/store/useAuthStore"

const Projects = () => {

    const access = useAuthStore(s => s.access) || ""
    const {data: projects, isLoading, isError, error, isSuccess} = useGetProjects(access)

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <div>
        {projects.map(project => <p>{project.name}</p>)}
    </div>
  )
}

export default Projects