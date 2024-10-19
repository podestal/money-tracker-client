import { useState } from "react"
import useRemoveTask from "../../hooks/api/tasks/useRemoveTask"
import DeleteBin from "../ui/DeleteBin"

interface Props {
    projectId: number
}

const RemoveTask = ({projectId}: Props) => {

    const [taskId, setTaskId] = useState(0)
    const removeTask = useRemoveTask({projectId, taskId})

  return (
    <DeleteBin 
        removeTask={removeTask}
        setTaskId={setTaskId}
    />
  )
}

export default RemoveTask