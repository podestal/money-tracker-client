import useGetTeams from "../hooks/api/team/useGetTeam"
import useAuthStore from "../hooks/store/useAuthStore"


const TeamPage = () => {

    const access = useAuthStore(s => s.access) || ''
    const {data: teams, isLoading, isError, error, isSuccess} = useGetTeams({access})

    if (isLoading) return <p>Loading ...</p>

    if (isError) return <p>Error: {error.message}</p>

    if (isSuccess)

  return (
    <div>{teams.map( team => (
        <p>{team.id}</p>
    ))}</div>
  )
}

export default TeamPage