import { useState } from "react"
import useAuthStore from "../../hooks/store/useAuthStore"
import { UseMutationResult } from "@tanstack/react-query"
import { Task } from "../../services/api/tasksService"
import { RemoveTaskData } from "../../hooks/api/tasks/useRemoveTask"
import { RiDeleteBin2Fill } from "@remixicon/react"
import useTaskTransferStore from "../../hooks/store/useTaskTransferStore"
import useNotificationStore from "../../hooks/store/useNotificationStore"

interface Props {
    removeTask: UseMutationResult<Task, Error, RemoveTaskData>
    setTaskId: (value: number) => void

}

const DeleteBin = ({ removeTask, setTaskId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const [animate, setAnimate] = useState(false)
    const {task, resetTask} = useTaskTransferStore()
    const { setMessage, setShow, setType } = useNotificationStore()

    const hanldeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setAnimate(true)
    }

    const handleDragLeave = () => {
        setAnimate(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (task) {
            setTaskId(task.id)
            setAnimate(false)
            removeTask.mutate({access}, {onSettled: () => resetTask(),
                onSuccess: () => {
                    setShow(true)
                    setType('success')
                    setMessage(`Task successfully removed`)
                },
                onError: error => {
                    setShow(true)
                    setType('error')
                    setMessage(`Error: ${error.message}`)
                }
            })
        }
    }

    return (
        <div
            onDragOver={hanldeDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop} 
            className={`mt-12 border-red-800 rounded-xl border-2 w-[150px] h-[150px] ${animate && 'pulse'}`}>
            <div className="bg-red-950 opacity-40 w-full h-full flex justify-center items-center">
                <RiDeleteBin2Fill 
                    className={`${animate && 'shake'} text-red-500 opacity-85`}
                    size={30}
                />
            </div>
        </div>
    )
}

export default DeleteBin