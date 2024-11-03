import { create } from "zustand"

interface NotificationState {
    type: string
    setType: (value: string) => void
    message: string
    setMessage: (value: string) => void
    show: boolean
    setShow: (value: boolean) => void
    reset: () => void
}

const useNotificationStore = create<NotificationState>(set => ({
    type: '',
    setType: (value) => set({ type: value }),
    message: '',
    setMessage: (value) => set({ message: value }),
    show: false,
    setShow: (val) => set({ show: val }),
    reset: () => set({ type: '', message: '', show: false })
}))

export default useNotificationStore