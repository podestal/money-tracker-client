import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getProjectService, { Project } from "../../../services/api/projectsService"
import { PROJECTS_CACHE_KEY } from "../../../lib/constants"

// Custom hook to fetch all projects using react-query's useQuery.
// Takes the access token as a parameter.
const useGetProjects = (access: string): UseQueryResult<Project[], Error> => {
    // Get the project service instance to interact with the API.
    const projectsService = getProjectService()

    // UseQuery hook to fetch the list of projects.
    return useQuery({
        queryKey: PROJECTS_CACHE_KEY, // Unique cache key to identify the projects data.
        queryFn: () => projectsService.get(access), // The function to fetch projects from the API.
        staleTime: 1 * 60 * 1000, // Cache data for 1 minute before marking it as stale.
    })
}

export default useGetProjects
