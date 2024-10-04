import { Project } from "../../services/api/projectsService"
import { Link } from "react-router-dom"

interface Props {
    project: Project
}

const ProjectCard = ({ project }: Props) => {
  return (
    <Link
        to={`/projects/${project.id}`}
        state={project}
    >
        <h2>{project.name}</h2>
        <p>{project.description}</p>
    </Link>
  )
}

export default ProjectCard