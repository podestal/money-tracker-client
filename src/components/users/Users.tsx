import useGetUsers from "../../hooks/auth/useGetUsers"
import useAuthStore from "../../hooks/store/useAuthStore"
import UserCard from "./UserCard"

interface Props {
    username?: string
    email?: string
    search: boolean
    setOpen: (val: boolean) => void
    handleClosePanel: () => void
    setSelectedUser: (val: number) => void
}

const Users = ({ username, email, search, setOpen, handleClosePanel, setSelectedUser }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: users, isLoading, isError, error, isSuccess} = useGetUsers({access, username, email, search})

    if (isLoading) return <p className={`text-sm text-center mt-6 text-slate-50 pulse`}>Loading ...</p>

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
                    setOpen={setOpen}
                    handleClosePanel={handleClosePanel}
                    setSelectedUser={setSelectedUser}
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