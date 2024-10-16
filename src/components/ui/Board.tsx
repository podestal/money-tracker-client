import { RiDeleteBin2Fill } from "@remixicon/react"
import { Task } from "../../services/api/tasksService"
import CreateTask from "../tasks/CreateTask"
import useAuthStore from "../../hooks/store/useAuthStore"
import useRemoveTask from "../../hooks/api/tasks/useRemoveTask"
import { useState } from "react"
import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"

interface BoardProps {
    tasks: Task[]
    projectId: number
}

const Board = ({ tasks, projectId }: BoardProps) => {
  return (
    <div className="flex h-full w-full gap-3 p-1200 mt-6">
        <Column 
            title="N"
            tasks={tasks}
            projectId={projectId}
        />
        <Column 
            title="P"
            tasks={tasks}
            projectId={projectId}
        />
        <Column 
            title="R"
            tasks={tasks}
            projectId={projectId}
        />
        <Column 
            title="C"
            tasks={tasks}
            projectId={projectId}
        />
        <DeleteBin 
            projectId={projectId}
        />
    </div>
  )
}

interface ColumnProps {
    title: string
    tasks: Task[]
    projectId: number
}

const Column = ({ title, tasks, projectId }: ColumnProps) => {

    const filteredTasks = tasks.filter( task => task.status === title )
    const [active, setActive] = useState(false)
    const access = useAuthStore(s => s.access) || ''
    const [taskId, setTaskId] = useState(0)
    const updateTask = useUpdateTask({projectId, taskId})

    const hanldeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const taskStatus = e.dataTransfer.getData('taskStatus')
        setTaskId(parseInt(e.dataTransfer.getData('taskId')))
        setActive(false)
        if (title !== taskStatus) {
            updateTask.mutate({updates: {status: title, project: projectId, name: e.dataTransfer.getData('taskName')}, access})
        }
    }
    

    return (
        <div 
            className={`w-52 shrink-0 min-h-screen ${active && 'bg-slate-700'}`}
            onDragOver={hanldeDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop} 
        >
            <div className="mb-6">
                {title === 'N' && <h3 className="text-slate-300 px-3">Not Started</h3>}
                {title === 'P' && <h3 className="text-amber-500 px-3">In Progress</h3>}
                {title === 'R' && <h3 className="text-yellow-300 px-3">In Review</h3>}
                {title === 'C' && <h3 className="text-green-400 px-3">Done</h3>}
            </div>
            <div>
                {filteredTasks.map( task => <Card key={task.id} task={task}/>)}
                {title === 'N' && projectId && <CreateTask projectId={projectId}/>}
            </div>
        </div>
    )
}

interface CardProps {
    task: Task
}

const Card = ({ task }: CardProps) => {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("taskId", (task.id).toString())
        e.dataTransfer.setData("taskName", (task.name).toString())
        task.status && e.dataTransfer.setData("taskStatus", (task.status).toString())
    }

    return (
        <div
            draggable 
            onDragStart={handleDragStart}
            className="cursor-grab rounded border border-slate-800 bg-slate-900 p-3 active:cursor-grabbing my-2 text-xs">
            <p>{task.name}</p>
        </div>
    )
}

interface DeleteBinProps {
    projectId: number
}

const DeleteBin = ({ projectId }: DeleteBinProps) => {

    const access = useAuthStore(s => s.access) || ''
    const [taskId, setTaskId] = useState(0)
    const removeTask = useRemoveTask({projectId, taskId})
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
            className={` border-red-800 rounded-xl border-2 w-[150px] h-[150px] ${animate && 'animate-pulse'}`}>
            <div className="bg-red-950 opacity-40 w-full h-full flex justify-center items-center">
                <RiDeleteBin2Fill 
                    className={`${animate && 'animate-bounce '} text-red-700`}
                />
            </div>
            
        </div>
    )
}

export default Board