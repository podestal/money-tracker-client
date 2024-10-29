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
    <div className="flex flex-col gap-2 px-6 py-2 mb-6">
        <p><span className="text-blue-600 text-xl font-bold">Owner:</span> {user.username}</p>
        <p><span className="text-blue-600 text-xl font-bold">Email:</span> {user.email}</p>
    </div>
  )
}

export default UserRetrieve