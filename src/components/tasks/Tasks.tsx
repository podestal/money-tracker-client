import useGetTasks from "../../hooks/api/tasks/useGetTasks"
import useAuthStore from "../../hooks/store/useAuthStore"
import Board from "../ui/Board"
import TaskCard from "./TaskCard"

interface Props {
    projectId: number
    // filter: string
}

const tasks = ({ projectId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: tasks, isLoading, isError, error, isSuccess} = useGetTasks({ access, projectId })

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <Board 
        tasks={tasks}
    />
  )
}

export default tasks