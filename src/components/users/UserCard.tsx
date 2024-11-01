import { User } from "../../services/auth/userService"

interface Props {
    user: User
    setOpen: (val: boolean) => void
    handleClosePanel: () => void
    setSelectedUser: (val: number) => void
}

const UserCard = ({ user, setSelectedUser }: Props) => {

    // const access = useAuthStore(s => s.access) || ''
    // const updateTask = useUpdateTask({ taskId: task.id, projectId: task.project })

    // const handleAssignOwnerToTask = () => {
    //     updateTask.mutate(
    //         { updates: { ...task, owner: user.id }, access }, 
    //         {onSuccess: () => {
    //             setOpen(false)
    //             handleClosePanel()
    //         }}
    //     )
    // }

    const handleSelectUser = () => {
        setSelectedUser(user.id)
    }

  return (
    <div 
        onClick={handleSelectUser}
        className="flex flex-col justify-center items-start gap-2 rounded-xl px-6 py-4 my-6 bg-slate-900 hover:bg-slate-800 hover:cursor-pointer">
        <h2 className="text-xl">{user.first_name} {user.last_name}</h2>
        <p className="text-sm text-slate-300">{user.username}</p>
        <p className="text-sm text-slate-300">{user.email}</p>
    </div>
  )
}

export default UserCard