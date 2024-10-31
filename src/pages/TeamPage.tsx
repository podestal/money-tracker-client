import useGetTeams from "../hooks/api/team/useGetTeam"
import useAuthStore from "../hooks/store/useAuthStore"


const TeamPage = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: team, isLoading, isError, error, isSuccess} = useGetTeams({access})

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <p>{team.id}</p>
  )
}

export default TeamPage