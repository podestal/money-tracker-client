import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getProjectService, { Project, ProjectCreateUpdate } from "../../../services/api/projectsService"
import { PROJECTS_CACHE_KEY } from "../../../lib/constants"

export interface CreateProjectData {
    access: string
    project: ProjectCreateUpdate
}

const useCreateProject = (): UseMutationResult<Project, Error, CreateProjectData> => {
    const projectService = getProjectService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateProjectData) => projectService.post(data.project, data.access),
        onSuccess: (res) => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: PROJECTS_CACHE_KEY})
            
        },
        onError: (err) => {
            console.log(err)
            
        }
    })
}

export default useCreateProject
