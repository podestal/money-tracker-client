import useGetTasks from "../../hooks/api/tasks/useGetTasks"
import useAuthStore from "../../hooks/store/useAuthStore"

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
        <p>projectId: {projectId}</p>
        
        {tasks.map( task => <p>{task.name}</p>)}
    </div>
  )
}

export default tasks