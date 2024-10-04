import APIClient from "./apiClient"

export interface Task {
    id: number
    project: number
    name: string
    description: string
    status: string
    priority: number
    dueDate: Date
    user: number
}

interface Props {
    projectId: number
    taskId?: number
}

const getTaskService = ({ projectId, taskId }: Props) => {
    const URL = taskId ? `projects/${projectId}/tasks/${taskId}/` : `projects/${projectId}/tasks/`
    return new APIClient<Task>(URL)
}

export default getTaskService
