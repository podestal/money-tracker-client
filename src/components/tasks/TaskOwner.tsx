import { RiUserAddFill } from "@remixicon/react"
import Modal from "../ui/Modal"
import { useEffect, useState } from "react"
import { Input } from "../ui/InputText"
import { Button } from "../ui/Button"
import Users from "../users/Users"
import { useQueryClient } from "@tanstack/react-query"
import { getUserCache } from "../../lib/constants"
import { Task } from "../../services/api/tasksService"

interface Props {
    task: Task
}

const TaskOwner = ({ task }: Props) => {
    console.log('task taksowner',task);
    
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(false)
    const [username, setUsername] = useState('')
    const queryClient = useQueryClient()
    const USER_CACHE_KEY = getUserCache({username})

    useEffect(() => {
        if (search) {
            setSearch(false)
        }
    }, [search])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username) {
            return
        }
        queryClient.invalidateQueries({ queryKey: USER_CACHE_KEY })
        setSearch(true)

    }

    const handleClosePanel = () => {
        console.log('Closing panel', USER_CACHE_KEY)
        setOpen(false)
        setUsername('')
        queryClient.removeQueries({ queryKey: USER_CACHE_KEY })
    }

  return (
    <>
        <RiUserAddFill onClick={() => setOpen(true)} size={18} className="text-neutral-500 hover:text-neutral-600 hover:cursor-pointer"/>
        <Modal isOpen={open} onClose={handleClosePanel}>
            <h2 className="text-center text-xl font-semibold">Assign a user</h2>
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
                task={task}
            />
        </Modal>
    </>
  )
}

export default TaskOwner