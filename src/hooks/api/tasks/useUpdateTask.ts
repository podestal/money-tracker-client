import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTaskService, { Task, TaskCreateUpdate } from "../../../services/api/tasksService"
import { getTasksCacheKey, getProjectCacheKey } from "../../../lib/constants"

interface UpdateTaskData {
    access: string
    updates: TaskCreateUpdate
}

interface Props {
    taskId: number
    projectId: number
}

const useUpdateTask = ({ taskId, projectId }: Props): UseMutationResult<Task, Error, UpdateTaskData> => {
    const taskService = getTaskService({projectId, taskId})
    const queryClient = useQueryClient()
    const TASK_CACHE_KEY = getTasksCacheKey(projectId)
    const PROJECTS_CACHE_KEY = getProjectCacheKey(true)
    return useMutation({
        mutationFn: (data: UpdateTaskData) => taskService.update(data.updates, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: TASK_CACHE_KEY})
            queryClient.invalidateQueries({queryKey: PROJECTS_CACHE_KEY})
        },
        onError: err => console.log(err)
    })
}

export default useUpdateTask