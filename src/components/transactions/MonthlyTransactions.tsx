import { Transaction } from "../../services/api/transactionsService" // Import the Transaction type
import TransactionCard from "./TransactionCard" // Import TransactionCard component
import TransactionsSummary from "./TransactionsSummary" // Import TransactionsSummary component
import TransactionsFilters from "./TransactionsFilters" // Import TransactionsFilters component
import { useEffect, useMemo, useState } from "react" // Import useState hook
import CreateTransaction from "./CreateTransaction"
import { Input } from "../ui/InputText"

// Define the props interface for MonthlyTransactions
interface Props {
    transactions: Transaction[] // List of transactions to display
}

// MonthlyTransactions component displays a summary, filters, and transaction list
const MonthlyTransactions = ({ transactions }: Props) => {

    const [selectedCategory, setSelectedCategory] = useState(0) // State for the selected category, default is 0 (all)
    const [totalAmount, setTotalAmount] = useState(0) // State for total amount
    const [transactionByDescriptionFilter, setTransactionByDescriptionFilter] = useState('')

    // Calculate totalAmount using useMemo to avoid recalculating unnecessarily
    const filteredTransactionsByCategory = useMemo(() => {
        return transactions.filter(transaction => selectedCategory > 0 ? transaction.category === selectedCategory : true) 
    }, [transactions, selectedCategory])

    // Sum all the transactions amount by category and then assign the sum to totalAmount to be rendered
    useEffect(() => {
        const total = filteredTransactionsByCategory.reduce((sum, transaction) => sum + transaction.amount, 0)
        setTotalAmount(total)
    }, [filteredTransactionsByCategory])

    return (
        <>
            {/* Summary and filters layout */}
            <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-8">
                {/* Display the summary of transactions */}
                <TransactionsSummary 
                    transactions={transactions} // Pass transactions to the summary
                />
                {/* Display the filters for selecting a category */}
                <TransactionsFilters 
                    categorySsetter={setSelectedCategory} // Pass the setter function for setting the category
                />
            </div>
            <div className="mb-6 mt-6">
                <CreateTransaction />
            </div>
            {/* Display the total of transactions amount by category */}
            {selectedCategory > 0 && <p className="text-2xl my-4">Total: {(totalAmount).toFixed(2)}</p>}
            <Input 
                className="my-2 w-[60%]"
                placeholder="Look for transaction by description ..."
                onChange={e => setTransactionByDescriptionFilter(e.target.value)}
                value={transactionByDescriptionFilter}
            />
            {/* Display the transaction list */}
            <div className="mb-6 w-full">
                {   
                    filteredTransactionsByCategory
                    .filter(transaction => transaction.description?.toLocaleLowerCase()?.includes(transactionByDescriptionFilter.toLocaleLowerCase()))
                    .map(transaction => (
                        <TransactionCard key={transaction.id} transaction={transaction}/> 
                        // Display each transaction using TransactionCard
                    ))
                }
            </div>
        </>
    )
}

export default MonthlyTransactions // Export the MonthlyTransactions component
