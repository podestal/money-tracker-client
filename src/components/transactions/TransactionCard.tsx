import { Transaction } from "../../services/api/transactionsService" // Importing the Transaction type
import RemoveTransaction from "./RemoveTransaction" // Importing the RemoveTransaction component
import UpdateTransaction from "./UpdateTransaction"

// Props interface for the TransactionCard component
interface Props {
    transaction: Transaction // The transaction data to be displayed
}

// Component for displaying a transaction's details
const TransactionCard = ({ transaction }: Props) => {

  // Rendering the transaction details
  return (
    <div className={`w-full flex justify-center items-center gap-20`}>
        <h2>{transaction.amount}</h2> {/* Display the transaction amount */}
        <p className={`text-center ${transaction.transaction_type === 'IN' ? 'text-green-500' : 'text-red-500'}`}>
            {transaction.transaction_type}
        </p> {/* Display the type of transaction with conditional styling */}
        <RemoveTransaction 
            transactionId={transaction.id} // Pass the transaction ID to the RemoveTransaction component
        />
        <UpdateTransaction 
            transaction={transaction} // Pass the transaction object to the UpdateTransaction component
        />
    </div>
  )
}

export default TransactionCard // Exporting the TransactionCard component for use in other parts of the app
