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
}

const TaskForm = ({ projectId, createTask }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        setError('')
        setSuccess('')

        const name = nameRef.current?.value
        const description = descriptionRef.current?.value

        if (!name) {
            setError('Name is required')
            return
        }

        if (!description) {
            setError('Description is required')
            return
        }

        createTask && createTask.mutate({
            task: { name, description, project:projectId },
            access
        }, {
            onSuccess: () => setSuccess('Tasl created'),
            onError: err => setError(err.message)
        })
    }

  return (
    <form
        className="flex flex-col justify-center items-center gap-6 w-[70%] mx-auto my-6"
        onSubmit={handleSubmit}
    >
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Input 
            placeholder="Task name ..."
            ref={nameRef}
        />
        <textarea 
            placeholder="Description ..."
            className="bg-gray-950 border-gray-800 rounded-lg w-full text-sm text-slate-50 h-[100px]"
            ref={descriptionRef}
        />
        <Button disabled={success ? true : false}>Add Task</Button>
    </form>
  )
}

export default TaskForm