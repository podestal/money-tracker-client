import useTaskTransferStore from "../../hooks/store/useTaskTransferStore"
import { Task } from "../../services/api/tasksService"
import { motion } from 'framer-motion'

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
        className="cursor-grab rounded border border-slate-800 bg-slate-900 p-3 active:cursor-grabbing my-2 text-xs">
        <p>{task.name}</p>
      </motion.div>
  )
}

export default TaskCard