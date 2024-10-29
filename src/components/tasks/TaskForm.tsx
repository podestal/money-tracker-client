import { UseMutationResult } from "@tanstack/react-query"
import { Button } from "../ui/Button"
import { Input } from "../ui/InputText"
import { Task } from "../../services/api/tasksService"
import { CreateTaskData } from "../../hooks/api/tasks/useCreateTask"
import { useRef, useState } from "react"
import useAuthStore from "../../hooks/store/useAuthStore"

interface Props {
    projectId: number
    createTask: UseMutationResult<Task, Error, CreateTaskData>
    setLoading: (value: boolean) => void
}

const TaskForm = ({ projectId, createTask, setLoading }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        setError('')
        setSuccess('')
        setLoading(true)

        const name = nameRef.current?.value
        const description = descriptionRef.current?.value

        if (!name) {
            setError('Name is required')
            return
        }

        createTask && createTask.mutate({
            task: { name, description, project:projectId, owner: null },
            access
        }, {
            onSuccess: () => {
                if (nameRef.current) nameRef.current.value = ''
                console.log(success)
                
            },
            onError: err => {
                setError(err.message)
                console.log(error)
                
            },
            onSettled: () => setLoading(false)
        })
    }

  return (
    <form
        className="flex justify-center items-center gap-6 mt-4 mb-8"
        onSubmit={handleSubmit}
    >
        <Input 
            placeholder="Task name ..."
            ref={nameRef}
        />
        <Button>+</Button>
    </form>
  )
}

export default TaskForm