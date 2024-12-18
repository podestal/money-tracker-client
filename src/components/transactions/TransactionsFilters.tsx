import CategorySelector from "../categories/CategorySelector" 
import TransactionMonthYear from "./TransactionMonthYear"

// Define the props interface for TransactionsFilters
interface Props {
    categorySsetter: (value: number) => void // Setter function for setting the selected category
}

// TransactionsFilters component allows filtering transactions by category
const TransactionsFilters = ({ categorySsetter }: Props) => {

    return (
        // A grid container with 3 columns
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 my-auto lg:col-span-2 max-lg:gap-10">
            {/* Filter by month */}
            <TransactionMonthYear />
            {/* Category selector to filter by category */}
            <CategorySelector 
                setSelectedCategory={categorySsetter} // Pass the setter function for the selected category
                all={true} // Enable the "all categories" option
            />
        </div>
    )
}

export default TransactionsFilters // Export the TransactionsFilters component
