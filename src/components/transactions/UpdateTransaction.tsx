import useUpdateTransaction from "../../hooks/api/transactions/useUpdateTransaction"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Transaction } from "../../services/api/transactionsService"
import TransactionForm from "./TransactionForm";
import Modal from "../ui/Modal";

interface Props {
    transaction: Transaction
    open: boolean
    handleClose: () => void
}

const UpdateTransaction = ({ transaction, open, handleClose }: Props) => {

    const updateTransaction = useUpdateTransaction(transaction.id)
    const access = useAuthStore(s => s.access) || ''

  return (
    <Modal
        isOpen={open}
        onClose={handleClose}
        title="Update transaction"
    >
        <TransactionForm 
            updateTransaction={updateTransaction} 
            access={access} 
            transaction={transaction}/>
    </Modal>
  )
}

export default UpdateTransaction