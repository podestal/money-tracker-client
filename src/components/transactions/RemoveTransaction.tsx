import useRemoveTransaction from "../../hooks/api/transactions/useRemoveTransaction" // Custom hook for removing a transaction
import useAuthStore from "../../hooks/store/useAuthStore" // Custom hook for accessing the authentication store
import { RiDeleteBin2Fill } from "@remixicon/react" // Importing a delete icon
import { Transaction } from "../../services/api/transactionsService"

// Props interface for the RemoveTransaction component
interface Props {
    transaction: Transaction // Transaction object to be removed
}

// Component for removing a transaction
const RemoveTransaction = ({ transaction }: Props) => {
    
    // Retrieve the user's access token from the auth store
    const access = useAuthStore(s => s.access) || ''
    
    // Hook to handle the mutation for removing a transaction
    const removeTransaction = useRemoveTransaction(
        {
            transactionId: transaction.id, 
            transactionAmount: transaction.amount, 
            transactionType: transaction.transaction_type
        }
    )

    // Function to handle the transaction removal process
    const handleRemoveTransaction = () => {
        removeTransaction.mutate({access}) // Trigger the mutation with the user's access token
    }

    // Render the delete icon with an onClick handler for removing the transaction
    return (
        <div>
            <RiDeleteBin2Fill 
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={handleRemoveTransaction} // Call the handler when the icon is clicked
                size={18}
            />
        </div>
    )
}

export default RemoveTransaction // Exporting the RemoveTransaction component for use in other parts of the app
