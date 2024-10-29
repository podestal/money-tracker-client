import useGetUsers from "../../hooks/auth/useGetUsers"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Task } from "../../services/api/tasksService"
import UserCard from "./UserCard"

interface Props {
    username?: string
    email?: string
    search: boolean
    task: Task
    setOpen: (val: boolean) => void
    handleClosePanel: () => void
}

const Users = ({ username, email, search, task, setOpen, handleClosePanel }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: users, isLoading, isError, error, isSuccess} = useGetUsers({access, username, email, search})

    if (isLoading) return <p>Loading...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)
  return (
    <div>{
        users.length > 0 
        ?
        <>
            {users.map(user => (
                <UserCard 
                    key={user.id} 
                    user={user}
                    task={task}
                    setOpen={setOpen}
                    handleClosePanel={handleClosePanel}
                />
            ))}
        </>
        :
        <p>No users found</p>
        }
    </div>
  )
}

export default Users