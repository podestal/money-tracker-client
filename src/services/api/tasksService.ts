import { User } from "../auth/userService"
import APIClient from "./apiClient"

export interface Task {
    id: number
    project: number
    name: string
    description?: string
    status?: string
    priority?: number
    owner: User | null
    dueDate?: Date
    user: number
}

export type TaskCreateUpdate = Omit<Task, 'id' | 'user' | 'owner'> & {
    owner: number | null
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
