import useTaskTransferStore from "../../hooks/store/useTaskTransferStore"
import { Task } from "../../services/api/tasksService"
import { motion } from 'framer-motion'
import { RiDragMove2Fill } from "@remixicon/react"
import TaskOwner from "./TaskOwner"
import useAuthStore from "../../hooks/store/useAuthStore"

interface Props {
    task: Task
}

const TaskCard = ({ task }: Props) => {
    
    const setTask = useTaskTransferStore(s => s.setTask)
    const handleDragStart = () => {
        setTask(task)
    }
    const userId = useAuthStore(s => s.userId)
    const owner = task.owner

    return (
      <div className="flex w-full gap-2 justify-center items-start">
        <>{console.log('task.user ', task.user )}</>
        <>{console.log('userId ', userId )}</>
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
            <div className={`overflow-scroll flex justify-center absolute bottom-0 left-0 right-0 w-full h-8 text-center text-xs text-white clip-trapezoid mt-2 pt-2 pb-2 ${task.owner ? 'bg-blue-700' : 'bg-neutral-500'}`}>
                <p>{owner ? `${owner.first_name} ${owner.last_name}` : 'Not Assigned'}</p>
            </div>
        </motion.div>
       {userId === task.user && <div className={`flex items-center gap-2 bg-slate-900 rounded border ${task.owner ? 'border-blue-900' : 'border-slate-800'} p-3 my-2`}>
            <TaskOwner task={task} />
        </div>}
      </div>
    )
}

export default TaskCard
