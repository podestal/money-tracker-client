import useTaskTransferStore from "../../hooks/store/useTaskTransferStore"
import { Task } from "../../services/api/tasksService"
import { motion } from 'framer-motion'
import { RiDragMove2Fill } from "@remixicon/react"
import TaskOwner from "./TaskOwner"

interface Props {
    task: Task
}

const TaskCard = ({ task }: Props) => {
    
    const setTask = useTaskTransferStore(s => s.setTask)
    const handleDragStart = () => {
        setTask(task)
    }

    return (
      <div className="flex w-full gap-2 justify-center items-start">
        <motion.div
            layout
            draggable 
            onDragStart={handleDragStart}
            className={`rounded border ${task.owner ? 'border-blue-900' : 'border-slate-800'}  bg-slate-900 p-3 active:cursor-grabbing my-2 text-xs flex-1 relative`}
        >
            <div className="flex justify-between items-start gap-2 overflow-scroll pb-6">
                <p>{task.name}</p>
                <div className="flex justify-center items-center gap-2">
     
                    <RiDragMove2Fill size={18} className="text-blue-600 hover:cursor-grab"/>
                </div>
            </div>
            <div className={`absolute bottom-0 left-0 right-0 w-full h-6 text-center text-xs text-white clip-trapezoid mt-2 pt-2 ${task.owner ? 'bg-blue-700' : 'bg-neutral-500'}`}>
                <p>Manuel</p>
            </div>
        </motion.div>
        <div className={`flex items-center gap-2 bg-slate-900 rounded border ${task.owner ? 'border-blue-900' : 'border-slate-800'} p-3 my-2`}>
            <TaskOwner task={task} />
        </div>
      </div>
    )
}

export default TaskCard
