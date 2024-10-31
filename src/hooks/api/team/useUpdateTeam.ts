import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"
import getTeamService, { Team, TeamUpdate } from "../../../services/api/teamService"
import { TEAM_CACHE_KEY } from "../../../lib/constants"

interface UpdateTeamData {
    access: string,
    updates: TeamUpdate
}

interface Props {
    teamId: number
}

const useUpdateTeam = ({ teamId }: Props): UseMutationResult<Team, Error, UpdateTeamData> => {
    const teamService = getTeamService({teamId})
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateTeamData) => teamService.update(data.updates, data.access),
        onSuccess: res => {
            console.log(res)
            queryClient.invalidateQueries({queryKey: TEAM_CACHE_KEY})
        },
        onError: err => console.log(err)
    })
}

export default useUpdateTeam