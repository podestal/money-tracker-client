import useGetUsers from "../../hooks/auth/useGetUsers"
import useAuthStore from "../../hooks/store/useAuthStore"

const Users = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: users, isLoading, isError, error, isSuccess} = useGetUsers({access, username: 'manuel'})

    if (isLoading) return <p>Loading...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)
  return (
    <div>{users.map(user => (
        <div>
            <h2>Username: {user.username}</h2>
            <p>Id: {user.id}</p>
            <p>Email: {user.email}</p>
        </div>
    ))}</div>
  )
}

export default Users