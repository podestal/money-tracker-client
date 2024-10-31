import APIClient from "./apiClient"

export interface Team {
    id: number
    user: number
    members: number[]
}

interface Props {
    teamId?: number
}

const getTeamService = ({ teamId }: Props) => {
    const URL = teamId ? `teams/${teamId}/` : 'teams/me/'
    return new APIClient<Team>(URL)
}

export default getTeamService