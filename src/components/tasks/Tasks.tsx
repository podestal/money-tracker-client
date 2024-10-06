import useGetTasks from "../../hooks/api/tasks/useGetTasks"
import useAuthStore from "../../hooks/store/useAuthStore"
import TaskCard from "./TaskCard"

interface Props {
    projectId: number
}

const tasks = ({ projectId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: tasks, isLoading, isError, error, isSuccess} = useGetTasks({ access, projectId })

    if(isLoading) return <p>Loading ...</p>

    if(isError) return <p>Error: {error.message}</p>

    if(isSuccess)

  return (
    <div>
        <h2 className="text-3xl">Not started</h2>
        {tasks.map( task => 
            <TaskCard 
                key={task.id}
                task={task}
            />    
        )}
    </div>
  )
}

export default tasks