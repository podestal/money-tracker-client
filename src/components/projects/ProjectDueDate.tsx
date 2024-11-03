import { useState } from "react"
import { Project } from "../../services/api/projectsService"
import { RiPencilFill } from "@remixicon/react"
import moment from "moment"
import DateRange from "../ui/DateRange"
import { Button } from "../ui/Button"
import useAuthStore from "../../hooks/store/useAuthStore"
import useUpdateProject from "../../hooks/api/projects/useUpdateProject"
import useNotificationStore from "../../hooks/store/useNotificationStore"

interface Props {
    project: Project
}

const ProjectDueDate = ({ project }: Props) => {

    const [updateMode, setUpdateMode] = useState(false)
    const remain_time = moment(project.end_date).endOf('day').fromNow()
    const [dueDate, setDueDate] = useState<Date | null>(new Date());
    const pastDue = Boolean(moment(dueDate).format('YYYY-MM-DD') < moment(new Date()).format('YYYY-MM-DD'))
    const access = useAuthStore(s => s.access) || ''
    const userId = useAuthStore(s => s.userId)
    const updateProject = useUpdateProject({projectId: project.id})
    const { setMessage, setShow, setType } = useNotificationStore()

    const handleClick = () => {
        updateProject.mutate(
            {updates: {name: project.name, is_active: project.is_active, end_date: moment(dueDate).format('YYYY-MM-DD')}, access},
            {
                onSuccess: () => {
                    setUpdateMode(false)
                    setShow(true)
                    setType('success')
                    setMessage('Name updated successfully')
                },
                onError: err => {
                    setShow(true)
                    setType('error')
                    setMessage(`Error: ${err.message}`)
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
                <p className="text-xl  font-bold">Due date: {project.end_date && <span className={`text-sm ml-4 ${pastDue ? 'text-red-500' : 'text-green-500'}`}>{(remain_time).toString()}</span>}</p>
                {userId === project.user && <RiPencilFill onClick={() => setUpdateMode(true)} className="text-blue-600 hover:cursor-pointer" size={20}/>}
            </>
        }
    </div>
  )
}

export default ProjectDueDate