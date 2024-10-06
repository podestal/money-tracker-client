import { Task } from "../../services/api/tasksService"

interface Props {
    task: Task
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className={`text-center py-6 px-4 my-6 rounded-full
                        ${task.status === 'N' && 'bg-slate-900 hover:bg-slate-800'}
                        ${task.status === 'P' && 'bg-orange-500 hover:bg-orange-400'}
                        ${task.status === 'R' && 'bg-yellow-500 hover:bg-yellow-600'}
                        ${task.status === 'C' && 'bg-green-600 hover:bg-green-500'}
                    `}>
        <h2>{task.name}</h2>
    </div>
  )
}

export default TaskCard