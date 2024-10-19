import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import getTaskService, {Task} from "../../../services/api/tasksService"
import { getTasksCacheKey, getProjectCacheKey } from "../../../lib/constants"

interface RemoveTaskData {
    access: string
}

interface Props {
    projectId: number
    taskId: number
}

const useRemoveTask = ({projectId, taskId}: Props): UseMutationResult<Task, Error, RemoveTaskData> => {
    const taskService = getTaskService({projectId, taskId})
    const queryClient = useQueryClient()
    const TASK_CACHE_KEY = getTasksCacheKey(projectId)
    const PROJECTS_CACHE_KEY = getProjectCacheKey(true)
    return useMutation({
        mutationFn: (data: RemoveTaskData) => taskService.delete(data.access),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: TASK_CACHE_KEY})
            queryClient.invalidateQueries({queryKey: PROJECTS_CACHE_KEY})
        },
        onError: err => console.log('err',err)
    })
}

export default useRemoveTask