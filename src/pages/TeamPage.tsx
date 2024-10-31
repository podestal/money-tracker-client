import TeamCard from "../components/team/TeamCard"
import UpdateTeam from "../components/team/UpdateTeam"
import useGetTeams from "../hooks/api/team/useGetTeam"
import useAuthStore from "../hooks/store/useAuthStore"


const TeamPage = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: team, isLoading, isError, error, isSuccess} = useGetTeams({access})

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div className="text-slate-50 min-h-screen xl:max-w-[1060px] 2xl:max-w-[1300px] mx-auto">
        <TeamCard 
            team={team}
        />
        <UpdateTeam 
            team={team}
        />
    </div>
  )
}

export default TeamPage