import Skeleton from "react-loading-skeleton"
import TeamCard from "../components/team/TeamCard"
import UpdateTeam from "../components/team/UpdateTeam"
import useGetTeams from "../hooks/api/team/useGetTeam"
import useAuthStore from "../hooks/store/useAuthStore"


const TeamPage = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: team, isLoading, isError, error, isSuccess} = useGetTeams({access})

    if (isLoading) return (
        <div className="min-h-screen xl:max-w-[1060px] 2xl:max-w-[1300px] mx-auto pt-10">
            <div className="w-full flex flex-col justify-start items-center gap-12 mb-10">
                <Skeleton height={90} width={220} style={{marginTop: '2px'}} baseColor='#64748b'/>
            </div>
            <Skeleton count={8} height={70} style={{marginTop: '30px'}} baseColor='#64748b'/>
        </div>
    )

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