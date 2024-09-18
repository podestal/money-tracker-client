import { Transaction } from "../../services/api/transactionsService"
import getIncomeAndExpenses from "../../utils/getIncomeAndExpenses"

// Props interface for the TransactionsSummary component
interface Props {
    transactions: Transaction[] // Array of transactions to summarize
}

// Component to display a summary of income and expenses from a list of transactions
const TransactionsSummary = ({ transactions }: Props) => {

    // Destructure the income and expense values from the utility function
    const { expense, income } = getIncomeAndExpenses(transactions)

    return (
        <div className="w-full grid grid-cols-2 text-center my-10">
            {/* Display total income with a green font */}
            <p className="text-4xl">Income: <span className="text-green-500 font-bold mx-4">{income}</span></p>
            {/* Display total expenses with a red font */}
            <p className="text-4xl">Expenses: <span className="text-red-500 font-bold mx-4">{expense}</span></p>
        </div>
    )
}

export default TransactionsSummary // Exporting the component for use in other parts of the app
