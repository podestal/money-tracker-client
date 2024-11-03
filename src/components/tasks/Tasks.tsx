import useGetTasks from "../../hooks/api/tasks/useGetTasks"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Project } from "../../services/api/projectsService"
import Board from "../ui/Board"

interface Props {
    project: Project
}

const tasks = ({ project }: Props) => {

    const access = useAuthStore((s) => s.access) || ''
    const {data: tasks, isLoading, isError, error, isSuccess} = useGetTasks({ access, projectId: project.id })

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <Board 
        tasks={tasks}
        project={project}
    />
  )
}

export default tasks