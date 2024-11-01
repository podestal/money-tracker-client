import { useEffect } from "react"

interface Props {
    type: string
    message: string
    setShow: (value: boolean) => void
}

const NotificationsCard = ({ type, message, setShow }: Props) => {
    
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])


  return (
    <div
    className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-md flex items-center space-x-3 transition-all duration-300 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
    >
        <span className="font-medium">{message}</span>
    </div>
  )
}

export default NotificationsCard