import APIClient from "./apiClient"

// Define the Project interface that represents the structure of a project.
export interface Project {
    id: number
    name: string
    description?: string
    end_date?: Date
    user: number
    is_active: boolean
}

// Define the type for creating/updating a project, excluding the 'id' and 'user' fields.
export type ProjectCreateUpdate = Omit<Project, 'id' | 'user' | 'is_active'>

interface Props {
    projectId?: number
    isActive?: boolean 
}

const getProjectService = ({projectId, isActive=true}: Props) => {

    const URL = projectId ? `projects/${projectId}` : `projects/?is_active=${isActive}`
    
    return new APIClient<Project, ProjectCreateUpdate>(URL)
}

export default getProjectService