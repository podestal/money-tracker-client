import { UseMutationResult } from "@tanstack/react-query";
import { Project } from "../../services/api/projectsService";
import { UpdateProjectData } from "../../hooks/api/projects/useUpdateProject";
import { Dispatch, SetStateAction } from "react";

interface Props {
    value: boolean
    setter: (value: boolean) => void
    label?: string
    access: string
    mutation: UseMutationResult<Project, Error, UpdateProjectData>
    project: Project
    setProject: Dispatch<SetStateAction<Project>>
}

const Switch = ({ value, setter, label, access, mutation, project, setProject }: Props) => {

    const handleToggle = () => {
        setter(!value);
        mutation.mutate({updates: {...project, is_active:!value}, access}, {
            onSuccess: res => setProject(res)
        })

    };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
        {label && <p className="text-lg lg:text-xl text-slate-50 text-center">{label}</p>}
        <div 
            className={`relative inline-block w-12 h-6 transition duration-200 ease-in 
                        ${value ? 'bg-blue-500' : 'bg-gray-300'} 
                        rounded-full cursor-pointer`}
            onClick={handleToggle}
            >
            <input 
                type="checkbox" 
                checked={value} 
                // onChange={handleToggle} 
                className="sr-only peer" 
            />
            <div 
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md 
                            transition-transform duration-200 transform 
                            ${value ? 'translate-x-6' : 'translate-x-0'}`}
            ></div>
        </div>
    </div>
  )
}

export default Switch