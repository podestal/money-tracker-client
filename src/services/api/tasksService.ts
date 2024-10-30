import APIClient from "./apiClient"

export interface Owner {
    id: number
    email: string
    username: string
}

export interface Task {
    id: number
    project: number
    name: string
    description?: string
    status?: string
    priority?: number
    owner: Owner | null
    dueDate?: Date
    user: number
}

export type TaskCreateUpdate = Omit<Task, 'id' | 'user'>

export type TaskUpdate = Omit<Task, 'owner'> & {
    owner: number
}

interface Props {
    projectId: number
    taskId?: number
}

const getTaskService = ({ projectId, taskId }: Props) => {
    const URL = taskId ? `projects/${projectId}/tasks/${taskId}/` : `projects/${projectId}/tasks/`
    return new APIClient<Task, TaskCreateUpdate>(URL)
}

export default getTaskService
