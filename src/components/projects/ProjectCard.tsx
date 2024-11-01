import { Project } from "../../services/api/projectsService"
import { Link } from "react-router-dom"
import moment from "moment"

interface Props {
    project: Project
}

const ProjectCard = ({ project }: Props) => {

  const remaining_time = moment(project.end_date).endOf('day').fromNow()

  return (
    <Link
        to={`/projects/${project.id}`}
        state={project}
        className={`flex flex-col gap-4 bg-transparent hover:bg-slate-900 shadow-lg shadow-blue-500/50  p-6 pt-8 px-4 rounded-2xl  ${!project.is_active && 'opacity-60'}`}
    >
        <h2 className="text-3xl text-blue-500 text-center font-bold mb-6">{project.name}</h2>
        <div className="flex flex-col justify-between items-center h-full gap-6 pb-6">
            <p className="text-xs leading-4 text-slate-300">{project.description}</p>
            <p className="w-full text-right font-bold">Due {remaining_time.toString()}</p>
        </div>
    </Link>
  )
}

export default ProjectCard