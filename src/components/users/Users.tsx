import useGetUsers from "../../hooks/auth/useGetUsers"
import useAuthStore from "../../hooks/store/useAuthStore"

interface Props {
    username?: string
    email?: string
    search: boolean
}

const Users = ({ username, email, search }: Props) => {

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
            <div>
                <h2>Username: {user.username}</h2>
                <p>Id: {user.id}</p>
                <p>Email: {user.email}</p>
            </div>
        ))}
        </>
        :
        <p>No users found</p>
        }
    </div>
  )
}

export default Users