import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getProjectService, { Project } from "../../../services/api/projectsService"
import { PROJECTS_CACHE_KEY } from "../../../lib/constants"

const useGetProjects = (access: string): UseQueryResult<Project[], Error> => {
    const projectsService = getProjectService()
    return useQuery({
        queryKey: PROJECTS_CACHE_KEY,
        queryFn: () => projectsService.get(access),
        staleTime: 1 * 60 * 1000,
    })
}

export default useGetProjects
