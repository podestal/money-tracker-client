import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getProjectService, { Project } from "../../../services/api/projectsService"
import { getProjectCacheKey } from "../../../lib/constants"

interface DeleteProjectData {
    access: string
}

const useRemoveProject = (projectId: number): UseMutationResult<Project, Error, DeleteProjectData> => {
    const projectService = getProjectService({projectId})
    const PROJECT_CACHE_KEY = getProjectCacheKey(true)
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: DeleteProjectData) => projectService.delete(data.access),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: PROJECT_CACHE_KEY})
        },
        onError: err => console.log(err),
    })
}

export default useRemoveProject
