import { Transaction } from "../../services/api/transactionsService"
import useRemoveTransaction from "../../hooks/api/transactions/useRemoveTransaction"
import { Button } from "../ui/Button"
import useAuthStore from "../../hooks/store/useAuthStore"

interface Props {
    transaction: Transaction // The transaction data to be displayed
}

const TransactionCard = ({ transaction }: Props) => {

    const access = useAuthStore(s => s.access) || ''
    const removeTransaction = useRemoveTransaction(transaction.id)

    const handleRemoveTransaction = () => {
        removeTransaction.mutate({access})
    }

  return (
    <div className={`w-full flex justify-evenly items-center ${transaction.transaction_type === 'IN' ? 'bg-green-300' : 'bg-red-400'}`}>
        <h2>{transaction.amount}</h2> {/* Display the transaction amount */}
        <p>{transaction.transaction_type}</p> {/* Display the type of transaction */}
        <Button onClick={handleRemoveTransaction} variant="destructive">Remove</Button>
    </div>
  )
}

export default TransactionCard
