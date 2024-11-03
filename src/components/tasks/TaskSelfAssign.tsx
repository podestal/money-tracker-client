import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"
import useAuthStore from "../../hooks/store/useAuthStore"
import useNotificationStore from "../../hooks/store/useNotificationStore"
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
    const { setMessage, setShow, setType } = useNotificationStore()


    const handleSelfAssignTask = () => {
        if (task.owner?.id === task.user) {
            setOpen(false)
            handleClosePanel()
            return
        }

        updateTask.mutate(
            { updates: { ...task, owner: task.user }, access },
            {
                onSuccess: () => {
                    setShow(true)
                    setType('success')
                    setMessage(`Task successfully assigned`)
                    handleClosePanel()
                    setOpen(false)
                    handleClosePanel()
                },
                onError: error => {
                    setShow(true)
                    setType('error')
                    setMessage(`Error: ${error.message}`)
                }
            }
        )
    }

  return (
    <>
        <Button onClick={handleSelfAssignTask}>Assign to myself</Button>
    </>
  )
}

export default TaskSelfAssign