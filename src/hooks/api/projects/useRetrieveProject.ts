import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getProjectService, { Project } from "../../../services/api/projectsService"
import { getProjectCacheKey } from "../../../lib/constants"

interface Props {
    access: string
    isActive?: boolean
    projectId?: number
}

const useRetrieveProject = ({access, isActive=true, projectId}: Props): UseQueryResult<Project, Error> => {
    // Get the project service instance to interact with the API.
    const projectsService = projectId ? getProjectService({projectId, isActive}) : getProjectService({isActive})
    const PROJECTS_CACHE_KEY = getProjectCacheKey(isActive, projectId)

    // UseQuery hook to fetch the list of projects.
    return useQuery({
        queryKey: PROJECTS_CACHE_KEY, // Unique cache key to identify the projects data.
        queryFn: () => projectsService.get(access), // The function to fetch projects from the API.
        staleTime: 1 * 60 * 1000, // Cache data for 1 minute before marking it as stale.
    })
}

export default useRetrieveProject
