import { Transaction } from "../../services/api/transactionsService" // Importing the Transaction type
import RemoveTransaction from "./RemoveTransaction" // Importing the RemoveTransaction component
import UpdateTransaction from "./UpdateTransaction"
import moment from "moment"
import { motion } from 'framer-motion'

// Props interface for the TransactionCard component
interface Props {
    transaction: Transaction // The transaction data to be displayed
}

// Component for displaying a transaction's details
const TransactionCard = ({ transaction }: Props) => {

  // Rendering the transaction details
  return (
    <motion.div 
        layout
        className={`grid grid-cols-7 gap-20 bg-slate-900 hover:bg-slate-800 w-full py-2 my-2 rounded-3xl`}>
        <p className={`text-sm font-bold text-right ${transaction.transaction_type === 'IN' ? 'text-green-500' : 'text-red-500'}`}>
            {(transaction.amount).toFixed(2)}
        </p> {/* Display the amount of transaction with conditional styling */}
        <p className="text-xs col-span-2 text-slate-200">{
            transaction.description}
        </p> {/* Display the description of transaction */}
        <p className="text-xs col-span-2">
            {moment(transaction.created_at).format("dddd MMM Do")}
        </p>
        <UpdateTransaction 
            transaction={transaction} // Pass the transaction object to the UpdateTransaction component
        />
        <RemoveTransaction 
            transaction={transaction} // Pass the transaction object to the RemoveTransaction component
        />
    </motion.div>
  )
}

export default TransactionCard // Exporting the TransactionCard component for use in other parts of the app
