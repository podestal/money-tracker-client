import useAuthStore from "../../hooks/store/useAuthStore"
import useCreateTransaction from "../../hooks/api/transactions/useCreateTransaction"
import { Button } from "../ui/Button"

const CreateTransaction = () => {

    const access = useAuthStore(s => s.access) || ''
    const createTransaction = useCreateTransaction()

    // id: number            // Unique identifier for the transaction
    // transaction_type: string  // Type of transaction (e.g., deposit, withdrawal)
    // amount: number        // Amount of the transaction
    // created_at: Date      // Timestamp of when the transaction was created
    // updated_at: Date      // Timestamp of when the transaction was last updated
    // description: string   // Description of the transaction
    // user: number          // ID of the user associated with the transaction
    // category: number      // ID of the category associated with the transaction

    const handleCreateTransaction = () => {
        createTransaction.mutate({transaction: {transaction_type: 'IN', amount: 100, category: 1, }, access})
    }

  return (
    <div>
        <Button onClick={handleCreateTransaction}>Create Transaction</Button>
    </div>
  )
}

export default CreateTransaction