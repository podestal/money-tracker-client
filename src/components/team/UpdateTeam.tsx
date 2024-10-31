import useUpdateTeam from "../../hooks/api/team/useUpdateTeam"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Team } from "../../services/api/teamService"
import { Button } from "../ui/Button"

interface Props {
    team: Team
}

const UpdateTeam = ({ team }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateTeam = useUpdateTeam({ teamId: team.id })

    const handleUpdateTeam = () => {
        console.log('Members',team.members)
        const teamMembers = team.members.map((member) => member.id)
        
        if (teamMembers.indexOf(3) > 0) {
            console.log('user already in the team');
            return
        }
        teamMembers.push(3)
        
        updateTeam.mutate({ updates: { ...team, members: teamMembers }, access })
    }

  return (
    <div>
        <Button onClick={handleUpdateTeam}>New Team Member</Button>
    </div>
  )
}

export default UpdateTeam