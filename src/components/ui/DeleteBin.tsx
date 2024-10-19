import { useState } from "react"
import useAuthStore from "../../hooks/store/useAuthStore"
import { UseMutationResult } from "@tanstack/react-query"
import { Task } from "../../services/api/tasksService"
import { RemoveTaskData } from "../../hooks/api/tasks/useRemoveTask"
import { RiDeleteBin2Fill } from "@remixicon/react"

interface Props {
    removeTask: UseMutationResult<Task, Error, RemoveTaskData>
    setTaskId: (value: number) => void
}

const DeleteBin = ({ removeTask, setTaskId }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const [animate, setAnimate] = useState(false)

    const hanldeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setAnimate(true)
    }

    const handleDragLeave = () => {
        setAnimate(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setTaskId(parseInt(e.dataTransfer.getData('taskId')))
        setAnimate(false)
        removeTask.mutate({access})
    }

    return (
        <div
            onDragOver={hanldeDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop} 
            className={` border-red-800 rounded-xl border-2 w-[150px] h-[150px] ${animate && 'pulse'}`}>
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