import useUpdateTeam from "../../hooks/api/team/useUpdateTeam"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Team } from "../../services/api/teamService"

interface Props {
    team: Team
    memberId: number
}

const DeleteTeamMember = ({ team, memberId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateTeam = useUpdateTeam({ teamId: team.id })

    const handleRemoveMember = () => {
        const filteredMembers = team.members
            .filter( member => member.id !== memberId)
            .map( member => member.id)
        updateTeam.mutate({ updates: {...team, members: filteredMembers}, access })
    }


  return (
    <div onClick={handleRemoveMember} className="w-[26px] h-[26px] bg-red-500  hover:bg-red-700 cursor-pointer rounded-full flex justify-center items-center">
        <p className="text-sm text-white m-0 p-0">x</p>
    </div>
  )
}

export default DeleteTeamMember