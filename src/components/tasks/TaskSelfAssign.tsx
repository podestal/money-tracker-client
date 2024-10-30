import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Task } from "../../services/api/tasksService"
import { Button } from "../ui/Button"

interface Props {
    task: Task
    setOpen: (val: boolean) => void
    handleClosePanel: () => void
}

const TaskSelfAssign = ({ task, setOpen, handleClosePanel }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateTask = useUpdateTask({ taskId: task.id, projectId: task.project })

    const handleSelfAssignTask = () => {
        if (task.owner?.id === task.user) {
            setOpen(false)
            handleClosePanel()
            return
        }

        updateTask.mutate(
            { updates: { ...task, owner: task.user }, access },
            { onSuccess: () => {
                setOpen(false)
                handleClosePanel()
            } }
        )
    }

  return (
    <>
        <Button onClick={handleSelfAssignTask}>Assign to myself</Button>
    </>
  )
}

export default TaskSelfAssign