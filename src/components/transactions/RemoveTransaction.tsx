import useRemoveTransaction from "../../hooks/api/transactions/useRemoveTransaction" // Custom hook for removing a transaction
import useAuthStore from "../../hooks/store/useAuthStore" // Custom hook for accessing the authentication store
import { RiDeleteBin2Fill } from "@remixicon/react" // Importing a delete icon
import { Transaction } from "../../services/api/transactionsService"
import useNotificationStore from "../../hooks/store/useNotificationStore"
import { useState } from "react"
import Modal from "../ui/Modal"
import { Button } from "../ui/Button"

// Props interface for the RemoveTransaction component
interface Props {
    transaction: Transaction // Transaction object to be removed
}

// Component for removing a transaction
const RemoveTransaction = ({ transaction }: Props) => {
    
    // Retrieve the user's access token from the auth store
    const access = useAuthStore(s => s.access) || ''
    const { setMessage, setShow, setType } = useNotificationStore()
    const [open, setOpen] = useState(false)
    
    // Hook to handle the mutation for removing a transaction
    const removeTransaction = useRemoveTransaction(
        {
            transactionId: transaction.id, 
            transactionAmount: transaction.amount, 
            transactionType: transaction.transaction_type
        }
    )

    const handleClose = () => {
        setOpen(false)
    }

    // Function to handle the transaction removal process
    const handleRemoveTransaction = () => {
        removeTransaction.mutate({access}, {
            onSuccess: () => {
                setShow(true)
                setType('success')
                setMessage('Transaction removed successfully')
            },
            onError: error => {
                setShow(true)
                setType('error')
                setMessage(`Error: ${error.message}`)
            }
        }) // Trigger the mutation with the user's access token
    }

    // Render the delete icon with an onClick handler for removing the transaction
    return (
        <>
            <RiDeleteBin2Fill 
                className="text-red-500 cursor-pointer hover:text-red-700 my-auto"
                onClick={() => setOpen(true)} // Call the handler when the icon is clicked
                size={18}
            />
            <Modal
                isOpen={open}
                onClose={handleClose}
                title="Remove transaction"
            >
                <p className="text-center">Are you sure to remove transaction?</p>
                <div className="w-full flex justify-center items-center mt-6 gap-12">
                    <Button variant="destructive" onClick={handleRemoveTransaction} >Yes</Button>
                    <Button onClick={handleClose}>No</Button>
                </div>
            </Modal>
        </>
    )
}

export default RemoveTransaction // Exporting the RemoveTransaction component for use in other parts of the app
