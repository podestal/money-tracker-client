import { useState } from "react"
import useUpdateTeam from "../../hooks/api/team/useUpdateTeam"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Team } from "../../services/api/teamService"
import Modal from "../ui/Modal"
import { Button } from "../ui/Button"

interface Props {
    team: Team
    memberId: number
}

const DeleteTeamMember = ({ team, memberId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const updateTeam = useUpdateTeam({ teamId: team.id })
    const [open, setOpen] = useState(false)

    const handleRemoveMember = () => {
        const filteredMembers = team.members
            .filter( member => member.id !== memberId)
            .map( member => member.id)
        updateTeam.mutate({ updates: {...team, members: filteredMembers}, access })
    }


  return (
<>
    <div onClick={() => setOpen(true)} className="w-[26px] h-[26px] bg-red-500  hover:bg-red-700 cursor-pointer rounded-full flex justify-center items-center">
        <p className="text-sm text-white m-0 p-0">x</p>
    </div>
    <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-center text-xl font-semibold">Are you sure</h2>
        <div className="w-full flex justify-center items-center gap-12 mt-8">
            <Button onClick={handleRemoveMember} variant="destructive">Yes</Button>
            <Button>Cancel</Button>
        </div>
    </Modal>
</>
  )
}

export default DeleteTeamMember