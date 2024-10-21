import { useState } from "react"
import useCreateTask from "../../hooks/api/tasks/useCreateTask"
import TaskForm from "./TaskForm"

interface Props {
    projectId: number
}

const CreateTask = ({ projectId }: Props) => {

    const createTask = useCreateTask(projectId)
    const [loading, setLoading] = useState(false)

  return (
    <>
      {
        loading 
        ? 
        <p className={`text-sm text-center mt-4 text-slate-50 ${loading && 'pulse'}`}>Loading ...</p>
        : 
        <TaskForm 
            projectId={projectId}
            createTask={createTask}
            setLoading={setLoading}
        />
      }
    </>

  )
}

export default CreateTask