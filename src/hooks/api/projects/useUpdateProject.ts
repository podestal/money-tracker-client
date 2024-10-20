import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getProjectService, {Project, ProjectCreateUpdate} from "../../../services/api/projectsService"
import { getProjectCacheKey } from "../../../lib/constants"

export interface UpdateProjectData {
    access: string
    updates: ProjectCreateUpdate
}

interface Props {
    projectId: number
}

const useUpdateProject = ({ projectId }: Props): UseMutationResult<Project, Error, UpdateProjectData> => {
    const projectService = getProjectService({projectId})
    const queryClient = useQueryClient()
    const PROJECT_CACHE_KEY = getProjectCacheKey(true, projectId)
    const PROJECTS_CACHE_KEY = getProjectCacheKey(true)
    return useMutation({
        mutationFn: (data: UpdateProjectData) => projectService.update(data.updates, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({ queryKey: PROJECT_CACHE_KEY })
            queryClient.invalidateQueries({ queryKey: PROJECTS_CACHE_KEY })
        },
        onError: err => console.log(err),
    })
}

export default useUpdateProject