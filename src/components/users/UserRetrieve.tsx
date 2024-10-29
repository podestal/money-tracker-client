import useRetrieveUser from "../../hooks/auth/useRetrieveUser"
import useAuthStore from "../../hooks/store/useAuthStore"

interface Props {
    userId: number
}

const UserRetrieve = ({ userId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: user, isLoading, isError, error, isSuccess} = useRetrieveUser({ access, userId })

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess) 

  return (
    <>
        <p>{user.username}</p>
    </>
  )
}

export default UserRetrieve