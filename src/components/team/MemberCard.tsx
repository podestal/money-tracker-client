import { User } from "../../services/auth/userService"

interface Props {
    member: User
}

const MemberCard = ({ member }: Props) => {
  return (
    <div className="w-full bg-slate-800 py-6 px-4 rounded-3xl">
        <div>
            <h2>{member.username}</h2>
            <p>{member.email}</p>
        </div>
    </div>
  )
}

export default MemberCard