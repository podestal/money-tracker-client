import CategorySelector from "../categories/CategorySelector" // Import CategorySelector component

// Define the props interface for TransactionsFilters
interface Props {
    setter: (value: number) => void // Setter function for setting the selected value
}

// TransactionsFilters component allows filtering transactions by category
const TransactionsFilters = ({ setter }: Props) => {

    return (
        // A grid container with 3 columns
        <div className="w-full grid grid-cols-3 my-auto">
            {/* Filter by month */}
            <p>Mes</p>
            {/* Filter by day */}
            <p>Day</p>
            {/* Category selector to filter by category */}
            <CategorySelector 
                setSelectedCategory={setter} // Pass the setter function for the selected category
                all={true} // Enable the "all categories" option
            />
        </div>
    )
}

export default TransactionsFilters // Export the TransactionsFilters component
