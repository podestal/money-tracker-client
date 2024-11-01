import { useEffect, useState } from "react"
import useUpdateTeam from "../../hooks/api/team/useUpdateTeam"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Team } from "../../services/api/teamService"
import { Button } from "../ui/Button"
import Modal from "../ui/Modal"
import { useQueryClient } from "@tanstack/react-query"
import { getUserCache } from "../../lib/constants"
import { Input } from "../ui/InputText"
import Users from "../users/Users"

interface Props {
    team: Team
}

const UpdateTeam = ({ team }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateTeam = useUpdateTeam({ teamId: team.id })
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(false)
    const [username, setUsername] = useState('')
    const queryClient = useQueryClient()
    const USER_CACHE_KEY = getUserCache({username})
    const [selectedUser, setSelectedUser] = useState(0)

    useEffect(() => {
        if (search) {
            setSearch(false)
        }
    }, [search])

    useEffect(() => {
        if (selectedUser > 0) {
            let teamMembers = team.members.map((member) => member.id)
        
            if (teamMembers.indexOf(selectedUser) > 0) {
                console.log('user already in the team');
                return
            }
            teamMembers.push(selectedUser)
            teamMembers = []
            
            updateTeam.mutate(
                { updates: { ...team, members: teamMembers }, access },
                { onSuccess: () => setSelectedUser(0) })
        }
    }, [selectedUser])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username) {
            return
        }
        queryClient.invalidateQueries({ queryKey: USER_CACHE_KEY })
        setSearch(true)

    }

    const handleClosePanel = () => {
        setOpen(false)
        setUsername('')
        queryClient.removeQueries({ queryKey: USER_CACHE_KEY })
    }

  return (
    <div>
        <Button onClick={() => setOpen(true)}>New Team Member</Button>
        <Modal isOpen={open} onClose={handleClosePanel}>
            <h2 className="text-center text-xl font-semibold">Add team member</h2>
            <form onSubmit={handleSearch} className="w-full flex justify-center items-center gap-6 my-6">
                <Input 
                    placeholder="Search user ..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Button>Search</Button>
            </form>
            <Users 
                username={username}
                search={search}
                setOpen={setOpen}
                handleClosePanel={handleClosePanel}
                setSelectedUser={setSelectedUser}
            />
        </Modal>
    </div>
  )
}

export default UpdateTeam