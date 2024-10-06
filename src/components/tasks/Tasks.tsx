import useGetTasks from "../../hooks/api/tasks/useGetTasks"
import useAuthStore from "../../hooks/store/useAuthStore"
import TaskCard from "./TaskCard"

interface Props {
    projectId: number
    filter: string
}

const tasks = ({ projectId, filter }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: tasks, isLoading, isError, error, isSuccess} = useGetTasks({ access, projectId })

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <>
        {tasks
            .filter( task => task.status === filter)
            .map( task => 
            <TaskCard 
                key={task.id}
                task={task}
            />    
        )}
    </>
  )
}

export default tasks