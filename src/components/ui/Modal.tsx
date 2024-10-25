import { useEffect, ReactNode } from "react"

interface Props {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

const Modal = ({ isOpen, onClose, children }: Props) => {

    useEffect(() => {
        const handleScape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        document.addEventListener('keydown', handleScape)
        return document.removeEventListener('keydown', handleScape)
    }, [onClose])

    if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-slate-900 rounded-lg shadow-lg p-6 max-w-lg w-full transform transition-all duration-300 ease-in-out scale-100"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal