import { Transaction } from "../../services/api/transactionsService"

interface Props {
    transaction: Transaction // The transaction data to be displayed
}

const TransactionCard = ({ transaction }: Props) => {
  return (
    <div className="w-full flex justify-evenly items-center">
        <h2>{transaction.amount}</h2> {/* Display the transaction amount */}
        <p>{transaction.transaction_type}</p> {/* Display the type of transaction */}
    </div>
  )
}

export default TransactionCard
