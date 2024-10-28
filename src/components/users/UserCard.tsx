import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Task } from "../../services/api/tasksService"
import { User } from "../../services/auth/userService"

interface Props {
    user: User
    task: Task
}

const UserCard = ({ user, task }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateTask = useUpdateTask({ taskId: task.id, projectId: task.project })

    const handleAssignOwnerToTask = () => {
        console.log('Owner assigned', user.id);
        updateTask.mutate({ updates: { project: task.project, name: task.name, owner: user.id }, access })
    }

  return (
    <div 
        onClick={handleAssignOwnerToTask}
        className="flex flex-col justify-center items-start gap-2 rounded-xl px-6 py-2 bg-slate-800 hover:bg-slate-700 hover:cursor-pointer">
        <h2>Username: {user.username}</h2>
        {/* <p>Id: {user.id}</p> */}
        <p>Email: {user.email}</p>
    </div>
  )
}

export default UserCard