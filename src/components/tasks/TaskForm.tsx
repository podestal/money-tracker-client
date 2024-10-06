import { Button } from "../ui/Button"
import { Input } from "../ui/InputText"

interface Props {
    projectId: number
}

const TaskForm = ({ projectId }: Props) => {
  return (
    <form
        className="flex flex-col justify-center items-center gap-6 w-[70%] mx-auto my-6"
    >
        <p>{projectId}</p>
        <Input 
            placeholder="Task name ..."
        />
        <textarea 
            placeholder="Description ..."
            className="bg-gray-950 border-gray-800 rounded-lg w-full text-sm text-slate-50 h-[100px]"
        />
        <Button>Add Task</Button>
    </form>
  )
}

export default TaskForm