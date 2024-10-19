import { Task } from "../../services/api/tasksService"

interface Props {
    task: Task
}

const TaskCard = ({ task }: Props) => {

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("taskId", (task.id).toString())
        e.dataTransfer.setData("taskName", (task.name).toString())
        task.status && e.dataTransfer.setData("taskStatus", (task.status).toString())
    }

  return (
      <div
          draggable 
          onDragStart={handleDragStart}
          className="cursor-grab rounded border border-slate-800 bg-slate-900 p-3 active:cursor-grabbing my-2 text-xs">
          <p>{task.name}</p>
      </div>
  )
}

export default TaskCard