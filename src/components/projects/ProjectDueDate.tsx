import { useState } from "react"
import { Project } from "../../services/api/projectsService"
import { RiPencilFill } from "@remixicon/react"
import moment from "moment"
import DateRange from "../ui/DateRange"
import { Button } from "../ui/Button"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"

interface Props {
    project: Project
    setErrorMessage: (value: string) => void
}

const ProjectDueDate = ({ project, setErrorMessage }: Props) => {

    const [updateMode, setUpdateMode] = useState(false)
    const remain_time = moment(project.end_date).endOf('day').fromNow()
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const access = useAuthStore(s => s.access) || ''
    const updateProject = useUpdateProject({projectId: project.id})

    const handleClick = () => {
        updateProject.mutate(
            {updates: {name: project.name, is_active: project.is_active, end_date: moment(dueDate).format('YYYY-MM-DD')}, access},
            {
                onSuccess: () => setUpdateMode(false),
                onError: err => {
                    setErrorMessage(`Error: ${err.message}`)
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 4000)
                }
            
            }
        )

    }

  return (
    <div className="w-full flex justify-start items-center gap-6 col-span-2">
        {
            updateMode 
            ? 
            <>
                <DateRange 
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                />
                <Button onClick={handleClick}>Save</Button>
                <Button onClick={() => setUpdateMode(false)}>Cancel</Button>                
            </>
            : 
            <>
                <p className="text-xl  font-bold">Due date: {project.end_date && <span className="text-sm text-green-500 ml-4">{(remain_time).toString()}</span>}</p>
                <RiPencilFill onClick={() => setUpdateMode(true)} className="text-blue-600 hover:cursor-pointer" size={20}/>
            </>
        }
    </div>
  )
}

export default ProjectDueDate