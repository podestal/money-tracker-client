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
    <div className={`grid grid-cols-6 gap-20 bg-slate-900 hover:bg-slate-800 w-[80%] py-2 my-2 rounded-3xl`}>
        {/* <h2 className="text-right text-xl font-bold">{(transaction.amount).toFixed(2)}</h2> Display the transaction amount */}
        <p className={`text-xl font-bold text-right ${transaction.transaction_type === 'IN' ? 'text-green-500' : 'text-red-500'}`}>
            {(transaction.amount).toFixed(2)}
        </p> {/* Display the type of transaction with conditional styling */}
        <p className="col-span-3 text-slate-200">{
            transaction.description}
        </p> {/* Display the description of transaction */}
        <UpdateTransaction 
            transaction={transaction} // Pass the transaction object to the UpdateTransaction component
        />
        <RemoveTransaction 
            transactionId={transaction.id} // Pass the transaction ID to the RemoveTransaction component
        />
    </div>
  )
}

export default TransactionCard // Exporting the TransactionCard component for use in other parts of the app
