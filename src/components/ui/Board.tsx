import { RiDeleteBin2Fill } from "@remixicon/react"
import { Task } from "../../services/api/tasksService"
import CreateTask from "../tasks/CreateTask"



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
        />
        <Column 
            title="R"
            tasks={tasks}
        />
        <Column 
            title="C"
            tasks={tasks}
        />
        <div className="bg-red-950 border-red-800 rounded-xl border-2 w-[150px] h-[150px] flex justify-center items-center">
            <RiDeleteBin2Fill />
        </div>
    </div>
  )
}

interface ColumnProps {
    title: string
    tasks: Task[]
    projectId ?: number
}

const Column = ({ title, tasks, projectId }: ColumnProps) => {

    const filteredTasks = tasks.filter( task => task.status === title )
    
    

    return (
        <div className="w-52 h-20 shrink-0">
            <div className="mb-6">
                {title === 'N' && <h3 className="text-slate-300">Not Started</h3>}
                {title === 'P' && <h3 className="text-amber-500">In Progress</h3>}
                {title === 'R' && <h3 className="text-yellow-300">In Review</h3>}
                {title === 'C' && <h3 className="text-green-400">Done</h3>}
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
    return (
        <div className="cursor-grab rounded border border-slate-800 bg-slate-900 p-3 active:cursor-grabbing my-2 text-xs">
            <p>{task.name}</p>
        </div>
    )
}

export default Board