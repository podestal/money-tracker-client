import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTaskService, {Task, TaskCreateUpdate} from "../../../services/api/tasksService"
import { getTasksCacheKey, getProjectCacheKey } from "../../../lib/constants"

export interface CreateTaskData {
    access: string
    task: TaskCreateUpdate
}

const useCreateTask = (projectId: number): UseMutationResult<Task, Error, CreateTaskData> => {
    const taskService = getTaskService({ projectId })
    const TASKS_CACHE_KEY = getTasksCacheKey(projectId)
    const PROJECTS_CACHE_KEY = getProjectCacheKey(true)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateTaskData) => taskService.post(data.task, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: TASKS_CACHE_KEY})
            queryClient.invalidateQueries({queryKey: PROJECTS_CACHE_KEY})
        },
        onError: err => console.log(err)
    })
}

export default useCreateTask