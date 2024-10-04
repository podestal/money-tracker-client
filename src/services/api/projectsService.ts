import APIClient from "./apiClient"

// Define the Project interface that represents the structure of a project.
export interface Project {
    id: number
    name: string
    description?: string
    endDate?: Date
    user: number
}

// Define the type for creating/updating a project, excluding the 'id' and 'user' fields.
export type ProjectCreateUpdate = Omit<Project, 'id' | 'user'>

// Function to get the project service instance based on whether a projectId is passed.
// It uses the APIClient class to handle requests.
const getProjectService = (projectId?: number) => {
    // If a projectId is provided, set the URL to interact with a specific project.
    // If not, set it to interact with the projects resource in general.
    const URL = projectId ? `projects/${projectId}` : 'projects/'
    
    // Return a new instance of APIClient with the specified URL for the Project entity.
    return new APIClient<Project, ProjectCreateUpdate>(URL)
}

export default getProjectService