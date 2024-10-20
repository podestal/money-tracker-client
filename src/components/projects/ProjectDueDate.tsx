import { useState } from "react"
import { Project } from "../../services/api/projectsService"
import { RiPencilFill } from "@remixicon/react"
import moment from "moment"

interface Props {
    project: Project
}

const ProjectDueDate = ({ project }: Props) => {

    const [updateMode, setUpdateMode] = useState(false)
    const remain_time = moment(project.end_date).endOf('day').fromNow()

  return (
    <div className="w-full flex justify-start items-center gap-6">
        {
            updateMode 
            ? 
            <>
                
            </>
            : 
            <>
                <RiPencilFill onClick={() => setUpdateMode(true)} className="text-blue-600 hover:cursor-pointer" size={20}/>
                <p className="text-xl  font-bold">Due date: {project.end_date && <span className="text-sm text-green-500 ml-4">{(remain_time).toString()}</span>}</p>
            </>
        }
    </div>
  )
}

export default ProjectDueDate