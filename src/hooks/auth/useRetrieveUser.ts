import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getUserService, {User} from "../../services/auth/userService"

interface Props {
    access: string
    userId: number
}

const useRetrieveUser = ({ access, userId }: Props): UseQueryResult<User, Error> => {
    
    const userService = getUserService({userId})
    return useQuery({
        queryKey: [`user ${userId}`],
        queryFn: () => userService.get(access),
        staleTime: 1 * 60 * 1000,
    })
}

export default useRetrieveUser