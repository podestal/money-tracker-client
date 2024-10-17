import useCreateTask from "../../hooks/api/tasks/useCreateTask"
import TaskForm from "./TaskForm"

interface Props {
    projectId: number
}

const CreateTask = ({ projectId }: Props) => {

    const createTask = useCreateTask(projectId)

  return (
    <TaskForm 
        projectId={projectId}
        createTask={createTask}
    />
  )
}

export default CreateTask