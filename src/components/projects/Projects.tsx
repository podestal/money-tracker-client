import useGetProjects from "../../hooks/api/projects/useGetProjects"
import useAuthStore from "../../hooks/store/useAuthStore"
import ProjectCard from "./ProjectCard"
import CreateProject from "./CreateProject"

const Projects = () => {

    const access = useAuthStore(s => s.access) || ""
    const {data: projects, isLoading, isError, error, isSuccess} = useGetProjects({access})

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <div className="flex flex-col justify-center items-center py-10 gap-12">
      <div className="flex justify-center items-center gap-10">
        <h2 className="text-6xl">Projects</h2>
        <CreateProject />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {projects.map(project => (
            <ProjectCard 
                key={project.id}
                project={project}
            />
        ))}
    </div>
    </div>

  )
}

export default Projects