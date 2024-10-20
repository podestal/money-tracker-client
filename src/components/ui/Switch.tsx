import { UseMutationResult } from "@tanstack/react-query";
import { Project } from "../../services/api/projectsService";
import { UpdateProjectData } from "../../hooks/api/projects/useUpdateProject";
import { Dispatch, SetStateAction } from "react";

interface Props {
    value: boolean
    setter: Dispatch<SetStateAction<boolean>>
    label?: string
    access: string
    mutation: UseMutationResult<Project, Error, UpdateProjectData>
    project: Project
    setErrorMessage: (value: string) => void
}

const Switch = ({ value, setter, label, access, mutation, project, setErrorMessage }: Props) => {

    const handleToggle = () => {
        setter((prev: boolean) => !prev)
        setErrorMessage('')
        mutation.mutate(
            {updates: {...project, is_active:!value}, access}, 
            {
                onError: err => {
                    setter(prev => !prev)
                    setErrorMessage(`Error: ${err.message}`)
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 4000)
                }
            }
        )

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
                onChange={handleToggle} 
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