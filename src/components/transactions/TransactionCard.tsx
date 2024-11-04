import { Transaction } from "../../services/api/transactionsService" // Importing the Transaction type
import RemoveTransaction from "./RemoveTransaction" // Importing the RemoveTransaction component
import UpdateTransaction from "./UpdateTransaction"
import moment from "moment"
import { motion } from 'framer-motion'
import { useState } from "react"

// Props interface for the TransactionCard component
interface Props {
    transaction: Transaction // The transaction data to be displayed
}

// Component for displaying a transaction's details
const TransactionCard = ({ transaction }: Props) => {

    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
  // Rendering the transaction details
  return (
    <motion.div 
        layout
        onClick={() => setOpen(true)}
        className={`overflow-scroll grid grid-cols-4 lg:grid-cols-6 gap-20 bg-slate-900 hover:bg-slate-800 w-full py-2 my-2 px-4 rounded-3xl`}>
        <p className={`text-sm font-bold text-right my-auto ${transaction.transaction_type === 'IN' ? 'text-green-500' : 'text-red-500'}`}>
            {(transaction.amount).toFixed(2)}
        </p> {/* Display the amount of transaction with conditional styling */}
        <p className="text-xs col-span-2 text-slate-200 my-auto">{
            transaction.description}
        </p> {/* Display the description of transaction */}
        <p className="text-xs lg:col-span-2 my-auto lg:hidden">
            {moment(transaction.created_at).format("MM/DD/YY")}
        </p>
        <p className="text-xs lg:col-span-2 my-auto hidden lg:block">
            {moment(transaction.created_at).format("dddd MMM Do")}
        </p>
        <div className="w-full flex items-center justify-center lg:justify-between gap-4">
            <UpdateTransaction 
                transaction={transaction} // Pass the transaction object to the UpdateTransaction component
                open={open}
                handleClose={handleClose}
            />
            <RemoveTransaction 
                transaction={transaction} // Pass the transaction object to the RemoveTransaction component
            />
        </div>
    </motion.div>
  )
}

export default TransactionCard // Exporting the TransactionCard component for use in other parts of the app
