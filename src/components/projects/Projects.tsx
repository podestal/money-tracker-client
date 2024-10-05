import useGetProjects from "../../hooks/api/projects/useGetProjects"
import useAuthStore from "../../hooks/store/useAuthStore"
import ProjectCard from "./ProjectCard"

const Projects = () => {

    const access = useAuthStore(s => s.access) || ""
    const {data: projects, isLoading, isError, error, isSuccess} = useGetProjects(access)

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <div className="flex flex-col justify-center items-center py-10 gap-12">
      <h2 className="text-6xl">Projects</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        
        {projects.map(project => (
            <ProjectCard 
                project={project}
            />
        ))}
    </div>
    </div>

  )
}

export default Projects