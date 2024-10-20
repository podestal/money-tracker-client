import { useRef, useState } from "react"
import { Input } from "../ui/InputText"
import { Button } from "../ui/Button"
import { UseMutationResult } from "@tanstack/react-query"
import { Project } from "../../services/api/projectsService"
import { CreateProjectData } from "../../hooks/api/projects/useCreateProject"
import useAuthStore from "../../hooks/store/useAuthStore"
import DateRange from "../ui/DateRange"

interface Props {
    createProject: UseMutationResult<Project, Error, CreateProjectData>
}

const ProjectForm = ({ createProject }: Props) => {

    const access = useAuthStore(s => s.access) || ''

    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleProjectForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSuccess('')
        setError('')

        const name = nameRef.current?.value
        const description = descriptionRef.current?.value
        
        if (!name) {
            setError('Name is required')
            return
        }

        if (!description) {
            setError('Description is required')
            return
        }

        createProject && createProject.mutate(
            {project: {name, description, is_active:true}, 
            access},
            {
                onSuccess: () => setSuccess('Project created'),
                onError: err => setError(err.message)
            }
        )

    }


  return (
    <form
        onSubmit={handleProjectForm}
        className="flex flex-col justify-center items-center gap-6 w-[70%] mx-auto my-6"
    >
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Input 
            placeholder="Project name ..."
            ref={nameRef}
        />
        <textarea 
            placeholder="Description"
            ref={descriptionRef}
            className="bg-gray-950 border-gray-800 rounded-lg w-full text-sm text-slate-50 h-[100px]"
        />
        <DateRange />
        <Button disabled={success ? true : false}>Add Project</Button>
    </form>
  )
}

export default ProjectForm