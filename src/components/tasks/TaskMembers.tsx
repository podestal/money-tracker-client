import useGetTeams from "../../hooks/api/team/useGetTeam"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Link } from "react-router-dom"
import TaskMemberCard from "./TaskMemberCard"
import { Task } from "../../services/api/tasksService"

interface Props {
    task: Task
    handleClosePanel: () => void
}

const TaskMembers = ({ task, handleClosePanel }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const {data: team, isLoading, isError, error, isSuccess} = useGetTeams({access})

    if (isLoading) return <p className={`text-sm text-center mt-6 text-slate-50 pulse`}>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="flex flex-col justify-start items-start gap-4 my-6">
        {team.members.length > 0 
        ? 
        <>
            <h2 className="text-lg">Choice from my team:</h2>
            {team.members
                .filter( member => task.user !== member.id)
                .filter( member => task.owner ? task.owner.id !== member.id : member)
                .map( member => (
                <TaskMemberCard 
                    key={member.id}
                    member={member}
                    task={task}
                    handleClosePanel={handleClosePanel}
                />
            ))}
        </> 
        : 
        <>
            <h2 className="text-lg">You do not have members in your team yet</h2>
            <Link to='/team' >Add members</Link>
        </>
        }
    </div>
  )
}

export default TaskMembers