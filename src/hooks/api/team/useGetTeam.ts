import { UseQueryResult, useQuery } from "@tanstack/react-query"
import getTeamService, { Team } from "../../../services/api/teamService"

interface Props {
    access: string
}

const useGetTeams = ({ access }: Props): UseQueryResult<Team[], Error> => {
    const teamService = getTeamService({})
    return useQuery({
        queryKey: ['teams'],
        queryFn: () => teamService.get(access)
    })
}

export default useGetTeams