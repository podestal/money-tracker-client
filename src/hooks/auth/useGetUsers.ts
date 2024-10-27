import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getUserService, {User} from "../../services/auth/userService"
import { getUserCache } from "../../lib/constants"

interface Props {
    access: string
    username?: string
    email?: string
}

const useGetUsers = ({ access, username, email }: Props): UseQueryResult<User[], Error> => {
    const userService = username ? getUserService({username}) : getUserService({email})
    const USER_CACHE_KEY = username ? getUserCache({username}) : getUserCache({email})
    return useQuery({
        queryKey: USER_CACHE_KEY,
        queryFn: () => userService.get(access),
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetUsers