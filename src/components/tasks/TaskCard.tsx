import { Task } from "../../services/api/tasksService"

interface Props {
    task: Task
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className="w-[30%] text-center py-6 px-4 bg-slate-900 hover:bg-slate-800 my-6 rounded-full">
        <h2>{task.name}</h2>
    </div>
  )
}

export default TaskCard