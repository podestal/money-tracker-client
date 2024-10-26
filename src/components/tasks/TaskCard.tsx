import useTaskTransferStore from "../../hooks/store/useTaskTransferStore"
import { Task } from "../../services/api/tasksService"
import { motion } from 'framer-motion'
import { RiDragMove2Fill, RiUserAddFill } from "@remixicon/react"

interface Props {
    task: Task
}

const TaskCard = ({ task }: Props) => {

    const setTask = useTaskTransferStore(s => s.setTask)

    const handleDragStart = () => {
        setTask(task)
    }

  return (
      <motion.div
        layout
        draggable 
        onDragStart={handleDragStart}
        className="rounded border border-slate-800 bg-slate-900 p-3 active:cursor-grabbing my-2 text-xs">
          <div className="flex justify-between items-start gap-2 overflow-scroll">
            <p>{task.name}</p>
            <div className="flex justify-center items-center gap-2">
              <RiUserAddFill size={18} className="text-green-600 hover:text-green-700 hover:cursor-pointer"/>
              <RiDragMove2Fill size={18} className="text-blue-600  hover:cursor-grab"/>
            </div>
          </div>
      </motion.div>
  )
}

export default TaskCard