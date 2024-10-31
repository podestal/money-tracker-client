import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTeamService, { Team } from "../../../services/api/teamService"
import { TEAM_CACHE_KEY } from "../../../lib/constants"

interface Props {
    access: string
}

const useGetTeams = ({ access }: Props): UseQueryResult<Team, Error> => {
    const teamService = getTeamService({})
    return useQuery({
        queryKey: TEAM_CACHE_KEY,
        queryFn: () => teamService.get(access)
    })
}

export default useGetTeams