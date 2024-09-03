import { RiPencilFill } from "@remixicon/react"
import useUpdateTransaction from "../../hooks/api/transactions/useUpdateTransaction"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Transaction } from "../../services/api/transactionsService"

interface Props {
    transaction: Transaction
}

const UpdateTransaction = ({ transaction }: Props) => {

    const updateTransaction = useUpdateTransaction(transaction.id)
    const access = useAuthStore(s => s.access) || ''

    const handleUpdateTransaction = () => {
        updateTransaction.mutate({updates: {transaction_type: 'IN', amount: 12, category: 1}, access})
    }

  return (
    <RiPencilFill 
        className="text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={handleUpdateTransaction}
    />
  )
}

export default UpdateTransaction