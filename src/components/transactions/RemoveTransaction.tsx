import useRemoveTransaction from "../../hooks/api/transactions/useRemoveTransaction" // Custom hook for removing a transaction
import useAuthStore from "../../hooks/store/useAuthStore" // Custom hook for accessing the authentication store
import { RiDeleteBin2Fill } from "@remixicon/react" // Importing a delete icon

// Props interface for the RemoveTransaction component
interface Props {
    transactionId: number // ID of the transaction to be removed
}

// Component for removing a transaction
const RemoveTransaction = ({ transactionId }: Props) => {

    // Retrieve the user's access token from the auth store
    const access = useAuthStore(s => s.access) || ''
    
    // Hook to handle the mutation for removing a transaction
    const removeTransaction = useRemoveTransaction(transactionId)

    // Function to handle the transaction removal process
    const handleRemoveTransaction = () => {
        removeTransaction.mutate({access}) // Trigger the mutation with the user's access token
    }

    // Render the delete icon with an onClick handler
    return (
        <div>
            <RiDeleteBin2Fill 
                className="text-red-500 cursor-pointer"
                onClick={handleRemoveTransaction}
            />
        </div>
    )
}

export default RemoveTransaction // Exporting the RemoveTransaction component for use in other parts of the app
