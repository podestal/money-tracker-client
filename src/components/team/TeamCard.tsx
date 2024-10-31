import { Team } from "../../services/api/teamService"
import MemberCard from "./MemberCard"

interface Props {
    team: Team
}

const TeamCard = ({ team }: Props) => {
  return (
    <div className="flex flex-col justify-start items-center gap-12 pt-10">
        <h2 className="text-6xl font-bold">My Team</h2>
        <div className="w-full flex flex-col justify-center items-start gap-12">
        {team.members.map( member => (
            <MemberCard 
                key={member.id}
                member={member}
            />
        ))}
        </div>

    </div>
  )
}

export default TeamCard