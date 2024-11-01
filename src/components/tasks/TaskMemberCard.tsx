import { RiPlayListAddFill } from "@remixicon/react"
import { User } from "../../services/auth/userService"
import { Task } from "../../services/api/tasksService"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"

interface Props {
    member: User
    task: Task
    handleClosePanel: () => void
}

const TaskMemberCard = ({ member , task, handleClosePanel }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateTask = useUpdateTask({ taskId: task.id, projectId: task.project })

    const handleSetOwner = () => {
        updateTask.mutate(
            { updates: { ...task, owner: member.id }, access }, 
            {onSuccess: () => {
                handleClosePanel()
            }}
        )
    }

  return (
    <div 
        onClick={handleSetOwner}
        className="flex justify-start items-center gap-4">
        <RiPlayListAddFill className="text-green-600 hover:text-green-500 cursor-pointer"/>
        <div className="flex justify-start items-center gap-2">
            <p>{member.first_name} {member.last_name}</p>
            <p className="text-xs text-slate-400">({member.username})</p>
        </div>
    </div>
  )
}

export default TaskMemberCard