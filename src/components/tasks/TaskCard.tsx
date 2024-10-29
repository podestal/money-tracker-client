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
            className={`rounded border ${task.owner ? (task.owner === task.user ? 'border-blue-900' : 'border-green-900') : 'border-slate-800'}  bg-slate-900 p-3 active:cursor-grabbing my-2 text-xs flex-1`}
        >
            <div className="flex justify-between items-start gap-2 overflow-scroll">
                <p>{task.name}</p>
                <div className="flex justify-center items-center gap-2">
     
                    <RiDragMove2Fill size={18} className="text-blue-600 hover:cursor-grab"/>
                </div>
            </div>
        </motion.div>
        <div className={`flex items-center gap-2 bg-slate-900 rounded border ${task.owner ? (task.owner === task.user ? 'border-blue-900' : 'border-green-900') : 'border-slate-800'} p-3 my-2`}>
          {/*   */}
            <TaskOwner task={task} />
        </div>
      </div>
    )
}

export default TaskCard
