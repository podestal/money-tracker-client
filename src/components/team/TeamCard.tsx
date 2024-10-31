import { Team } from "../../services/api/teamService"
import MemberCard from "./MemberCard"

interface Props {
    team: Team
}

const TeamCard = ({ team }: Props) => {
  return (
    <div>
        <h2>My Team</h2>
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