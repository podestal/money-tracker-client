import { RiDeleteBin2Fill, RiH3 } from "@remixicon/react"
import { Task } from "../../services/api/tasksService"

// ("N", "Not Started"),
// ("P", "In Progress"),
// ("R", "In Review"),
// ("C", "Completed"),

interface BoardProps {
    tasks: Task[]
}

const Board = ({ tasks }: BoardProps) => {
  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-1200 mt-6">
        <Column 
            title="N"
            tasks={tasks}
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
        <div className="bg-red-950 border-slate-800 rounded-xl border-2 w-[150px] h-[150px] flex justify-center items-center">
            <RiDeleteBin2Fill />
        </div>
    </div>
  )
}

interface ColumnProps {
    title: string
    tasks: Task[]
}

const Column = ({ title, tasks }: ColumnProps) => {

    const filteredTasks = tasks.filter( task => task.status === title )
    console.log('tasks', tasks)
    

    return (
        <div className="w-52 h-20 shrink-0">
            <div>
                {title === 'N' && <h3 className="text-slate-300">Not Started</h3>}
                {title === 'P' && <h3 className="text-amber-500">In Progress</h3>}
                {title === 'R' && <h3 className="text-yellow-300">In Review</h3>}
                {title === 'C' && <h3 className="text-green-400">Done</h3>}
            </div>
            <div>
                {filteredTasks.map( task => <Card key={task.id} task={task}/>)}
            </div>
        </div>
    )
}

interface CardProps {
    task: Task
}

const Card = ({ task }: CardProps) => {
    return (
        <div className="cursor-grab rounded border border-slate-800 bg-slate-900 p-3 active:cursor-grabbing my-2">
            <p>{task.name}</p>
        </div>
    )
}

export default Board