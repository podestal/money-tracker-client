import { Task } from "../../services/api/tasksService"
import CreateTask from "../tasks/CreateTask"
import useAuthStore from "../../hooks/store/useAuthStore"
import { useState } from "react"
import useUpdateTask from "../../hooks/api/tasks/useUpdateTask"
import TaskCard from "../tasks/TaskCard"
import RemoveTask from "../tasks/RemoveTask"
import useTaskTransferStore from "../../hooks/store/useTaskTransferStore"
import { Project } from "../../services/api/projectsService"

interface BoardProps {
    tasks: Task[]
    project: Project
}

const Board = ({ tasks, project }: BoardProps) => {

  return (
    <div className="flex justify-between h-full w-full gap-3 p-1200 my-6 mx-auto">
        <Column 
            title="N"
            tasks={tasks}
            project={project}
        />
        <Column 
            title="P"
            tasks={tasks}
            project={project}
        />
        <Column 
            title="R"
            tasks={tasks}
            project={project}
        />
        <Column 
            title="C"
            tasks={tasks}
            project={project}
        />
        <RemoveTask 
            projectId={project.id}
        />
    </div>
  )
}

interface ColumnProps {
    title: string
    tasks: Task[]
    project: Project
}

const Column = ({ title, tasks, project }: ColumnProps) => {

    const filteredTasks = tasks.filter( task => task.status === title )
    const [active, setActive] = useState(false)
    const access = useAuthStore(s => s.access) || ''
    const userId = useAuthStore(s => s.userId)
    const [taskId, setTaskId] = useState(0)
    const updateTask = useUpdateTask({projectId: project.id, taskId})
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
            const owner = task.owner?.id || null
            if (title !== task.status) {
                updateTask.mutate({updates: { ...task, owner, status: title }, access}, {
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
                {title === 'N' && project.user === userId && <CreateTask projectId={project.id}/>}
            </div>
        </div>
    )
}

export default Board