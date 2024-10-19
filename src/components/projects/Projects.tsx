import useGetProjects from "../../hooks/api/projects/useGetProjects"
import useAuthStore from "../../hooks/store/useAuthStore"
import ProjectCard from "./ProjectCard"
import CreateProject from "./CreateProject"
import ProjectsFilter from "./ProjectsFilter"
import { useState } from "react"

const Projects = () => {

    const access = useAuthStore(s => s.access) || ""
    const [filter, setSelectedFilter] = useState(1)
    const isActive = filter === 1 ? true : false
    const {data: projects, isLoading, isError, error, isSuccess} = useGetProjects({access, isActive})

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <div className="flex flex-col justify-center items-center py-10 gap-12">
      <div className="flex justify-center items-center gap-10">
        <h2 className="text-6xl">Projects</h2>
        <CreateProject />
      </div>
      <ProjectsFilter 
        setSelectedFilter={setSelectedFilter}
      />
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {projects
        .map(project => (
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