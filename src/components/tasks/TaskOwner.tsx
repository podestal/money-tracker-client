import { RiUserAddFill } from "@remixicon/react"
import Modal from "../ui/Modal"
import { useEffect, useState } from "react"
import { Input } from "../ui/InputText"
import { Button } from "../ui/Button"
import Users from "../users/Users"
import { useQueryClient } from "@tanstack/react-query"
import { getUserCache } from "../../lib/constants"
import { Task } from "../../services/api/tasksService"
import TaskSelfAssign from "./TaskSelfAssign"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"

interface Props {
    task: Task
}

const TaskOwner = ({ task }: Props) => {

    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState(false)
    const [username, setUsername] = useState('')
    const queryClient = useQueryClient()
    const USER_CACHE_KEY = getUserCache({username})
    const [selectedUser, setSelectedUser] = useState(0)

    const access = useAuthStore(s => s.access) || ''
    const updateTask = useUpdateTask({ taskId: task.id, projectId: task.project })

    useEffect(() => {
        if (search) {
            setSearch(false)
        }
    }, [search])

    useEffect(() => {
        if (selectedUser > 0) {
            updateTask.mutate(
                { updates: { ...task, owner: selectedUser }, access }, 
                {onSuccess: () => {
                    setOpen(false)
                    handleClosePanel()
                }}
            )
            
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
    <>
        <RiUserAddFill onClick={() => setOpen(true)} size={18} className={` ${task.owner ? 'text-blue-600 hover:text-blue-500' : 'text-neutral-500 hover:text-neutral-600'}  hover:cursor-pointer`}/>
        <Modal isOpen={open} onClose={handleClosePanel}>
            <h2 className="text-center text-xl font-semibold">{task.owner ? 'Change user' : 'Assign a user'}</h2>
            <form onSubmit={handleSearch} className="w-full flex justify-center items-center gap-6 my-6">
                <Input 
                    placeholder="Search user ..."
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Button>Search</Button>
            </form>
            <TaskSelfAssign 
                task={task}
                setOpen={setOpen}
                handleClosePanel={handleClosePanel}
            />
            <Users 
                username={username}
                search={search}
                setSelectedUser={setSelectedUser}
                setOpen={setOpen}
                handleClosePanel={handleClosePanel}
            />
        </Modal>
    </>
  )
}

export default TaskOwner