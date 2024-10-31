import { User } from "../auth/userService"
import APIClient from "./apiClient"

export interface Team {
    id: number
    user: number
    members: User[]
}

export type TeamUpdate = Omit<Team, 'id' | 'user' | 'members'> & {
    members: number[]
}

interface Props {
    teamId?: number
}

const getTeamService = ({ teamId }: Props) => {
    const URL = teamId ? `teams/${teamId}/` : 'teams/me/'
    return new APIClient<Team, TeamUpdate>(URL)
}

export default getTeamService