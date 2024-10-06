import { Project } from "../../services/api/projectsService"
import { Link } from "react-router-dom"
import moment from "moment"

interface Props {
    project: Project
}

const ProjectCard = ({ project }: Props) => {
  return (
    <Link
        to={`/projects/${project.id}`}
        state={project}
        className="flex flex-col gap-4 bg-slate-900 pt-8 px-4 rounded-2xl hover:bg-slate-800"
    >
        <h2 className="text-3xl text-blue-500 text-center font-bold mb-6">{project.name}</h2>
        <div className="grid grid-rows-2 h-full gap-6 pb-6">
            <p className="text-sm text-slate-300">{project.description}</p>
            <p>Due on: {project.end_date &&  moment(project?.end_date).format('YYYY/MM/DD')}</p>
        </div>
    </Link>
  )
}

export default ProjectCard