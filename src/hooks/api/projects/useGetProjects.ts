import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getProjectService, { Project } from "../../../services/api/projectsService"
import { getProjectCacheKey } from "../../../lib/constants"

interface Props {
    access: string
    isActive?: boolean
}

const useGetProjects = ({access, isActive=true}: Props): UseQueryResult<Project[], Error> => {
    // Get the project service instance to interact with the API.
    const projectsService = getProjectService({isActive})
    const PROJECTS_CACHE_KEY = getProjectCacheKey(isActive)

    // UseQuery hook to fetch the list of projects.
    return useQuery({
        queryKey: PROJECTS_CACHE_KEY, // Unique cache key to identify the projects data.
        queryFn: () => projectsService.get(access), // The function to fetch projects from the API.
        staleTime: 1 * 60 * 1000, // Cache data for 1 minute before marking it as stale.
    })
}

export default useGetProjects
