import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getProjectService, { Project, ProjectCreateUpdate } from "../../../services/api/projectsService"
import { getProjectCacheKey } from "../../../lib/constants"

// Define the interface for the data that will be passed to the mutation.
// This includes an access token and the project details (for creation or update).
export interface CreateProjectData {
    access: string
    project: ProjectCreateUpdate
}

// Custom hook for creating a project.
// Returns a UseMutationResult which contains the status and methods to trigger the mutation.
const useCreateProject = (): UseMutationResult<Project, Error, CreateProjectData> => {
    // Get the project service instance to interact with the API.
    const projectService = getProjectService({})
    const PROJECTS_CACHE_KEY = getProjectCacheKey(true)

    // Use react-query's queryClient to manage and update cache.
    const queryClient = useQueryClient()

    // UseMutation hook to handle project creation.
    return useMutation({
        // The mutation function which sends a POST request to create a new project.
        mutationFn: (data: CreateProjectData) => projectService.post(data.project, data.access),
        
        // When the mutation succeeds, invalidate the projects cache to refresh the list of projects.
        onSuccess: (res) => {
            console.log(res)
            queryClient.invalidateQueries({ queryKey: PROJECTS_CACHE_KEY })
        },
        
        // Log any errors encountered during the mutation.
        onError: (err) => {
            console.log(err)
        }
    })
}

export default useCreateProject