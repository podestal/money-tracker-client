import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTaskService, {Task} from "../../../services/api/tasksService"
import { getTasksCacheKey } from "../../../lib/constants"

interface Props {
    access: string
    projectId: number
}

const useGetTasks = ({ access, projectId }: Props): UseQueryResult<Task[], Error> => {
    const taskService = getTaskService({ projectId })
    const TASKS_CACHE_KEY = getTasksCacheKey(projectId)
    return useQuery({
        queryKey: TASKS_CACHE_KEY,
        queryFn: () => taskService.get(access),
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetTasks