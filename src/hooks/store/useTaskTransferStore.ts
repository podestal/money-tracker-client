import { create } from 'zustand'
import { Task } from '../../services/api/tasksService'

interface TaskTransferState {
    task: Task | null
    setTask: (task: Task) => void
    resetTask: () => void
}

// Create Zustand store to manage authentication state
const useTaskTransferStore = create<TaskTransferState>(set => ({
    task: null,
    setTask: (task) => set({ task }),
    resetTask: () => set({ task: null })
}))

export default useTaskTransferStore
