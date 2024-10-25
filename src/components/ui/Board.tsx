import { Task } from "../../services/api/tasksService"
import CreateTask from "../tasks/CreateTask"
import useAuthStore from "../../hooks/store/useAuthStore"
import { useState } from "react"
import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"
import TaskCard from "../tasks/TaskCard"
import RemoveTask from "../tasks/RemoveTask"
import useTaskTransferStore from "../../hooks/store/useTaskTransferStore"

interface BoardProps {
    tasks: Task[]
    projectId: number
}

const Board = ({ tasks, projectId }: BoardProps) => {
  return (
    <div className="flex justify-between h-full w-full gap-3 p-1200 my-6 mx-auto">
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
        <RemoveTask 
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
    const {task, resetTask} = useTaskTransferStore()

    const hanldeDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (task) {
            setTaskId(task.id)
            setActive(false)
            if (title !== task.status) {
                updateTask.mutate({updates: {status: title, project: projectId, name: task.name}, access}, {
                    onSettled: () => resetTask()
                })
            }
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
                {title === 'N' && <h3 className="text-slate-300">Not Started</h3>}
                {title === 'P' && <h3 className="text-amber-500">In Progress</h3>}
                {title === 'R' && <h3 className="text-yellow-300">In Review</h3>}
                {title === 'C' && <h3 className="text-green-400">Done</h3>}
            </div>
            <div>
                {filteredTasks.map( task => <TaskCard key={task.id} task={task}/>)}
                {title === 'N' && projectId && <CreateTask projectId={projectId}/>}
            </div>
        </div>
    )
}

export default Board