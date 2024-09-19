import { Transaction } from "../../services/api/transactionsService" // Import the Transaction type
import TransactionCard from "./TransactionCard" // Import TransactionCard component
import TransactionsSummary from "./TransactionsSummary" // Import TransactionsSummary component
import TransactionsFilters from "./TransactionsFilters" // Import TransactionsFilters component
import { useState } from "react" // Import useState hook
import CreateTransaction from "./CreateTransaction"

// Define the props interface for MonthlyTransactions
interface Props {
    transactions: Transaction[] // List of transactions to display
}

// MonthlyTransactions component displays a summary, filters, and transaction list
const MonthlyTransactions = ({ transactions }: Props) => {

    const [selectedCategory, setSelectedCategory] = useState(0) // State for the selected category, default is 0 (all)

    return (
        <>
            {/* Summary and filters layout */}
            <div className="w-full grid grid-cols-3 gap-8">
                {/* Display the summary of transactions */}
                <TransactionsSummary 
                    transactions={transactions} // Pass transactions to the summary
                />
                {/* Display the filters for selecting a category */}
                <TransactionsFilters 
                    categorySsetter={setSelectedCategory} // Pass the setter function for setting the category
                />
            </div>
            <div className="mb-6">
                <CreateTransaction />
            </div>
            {/* Filter and display the transaction list */}
            {   
                transactions
                .filter(transaction => selectedCategory > 0 ? transaction.category === selectedCategory : true) 
                // If a category is selected, filter transactions by category, otherwise show all
                .map(transaction => (
                    <TransactionCard key={transaction.id} transaction={transaction}/> 
                    // Display each transaction using TransactionCard
                ))
            }
        </>
    )
}

export default MonthlyTransactions // Export the MonthlyTransactions component
