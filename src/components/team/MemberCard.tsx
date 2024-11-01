import { Team } from "../../services/api/teamService";
import { User } from "../../services/auth/userService";
import DeleteTeamMember from "./DeleteTeamMember";
import { motion } from "framer-motion";

interface Props {
    team?: Team
    member: User;
}

// Helper function to generate a gradient background based on user ID or name
const getGradientBackground = (name: string) => {
  const gradients = [
    "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    "bg-gradient-to-r from-green-400 to-blue-500",
    "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
    "bg-gradient-to-r from-teal-400 to-cyan-500",
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
};

const MemberCard = ({ member, team }: Props) => {
  const initials = `${member.first_name[0] || ""}${member.last_name[0] || ""}`.toUpperCase();

  return (
    <motion.div 
        layout
        className="w-full bg-transparent hover:bg-slate-900 py-6 px-4 rounded-3xl flex items-center space-x-4 my-4 shadow-lg shadow-blue-500/50">
        <div
            className={`w-12 h-12 ${getGradientBackground(member.first_name)} rounded-full flex items-center justify-center text-white font-semibold`}
            style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.4)" }} 
        >
            {initials}
        </div>
        <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2">
                <h2 className="text-white font-bold text-xl">{member.first_name} {member.last_name}</h2>
                <p className="text-gray-400">{member.email}</p>
            </div>
            {team && <DeleteTeamMember 
                team={team}
                memberId={member.id}
            />}
        </div>
    </motion.div>
  );
};

export default MemberCard;
