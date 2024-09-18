// Define the type for the props accepted by TransactionTypeSelector component
interface Props {
    transactionType: string | undefined // The current type of the transaction (could be undefined)
    setTransactionType: (type: string) => void // Function to set the transaction type
}

// A component for selecting the type of a transaction (Income or Expense)
const TransactionTypeSelector = ({ transactionType, setTransactionType }: Props) => {

    // Set the default transaction type based on the current transaction type
    const defautlTransactionType = transactionType

    return (
        <div className="w-full flex flex-col mx-auto justify-center items-center gap-4">
            {/* Label for the selector */}
            <p className="text-slate-50">Transaction Type</p>
            {/* Dropdown to select the transaction type */}
            <select
                onChange={e => setTransactionType(e.target.value)} // Handle selection changes
                defaultValue={defautlTransactionType} // Set the default selected option
                className="bg-gray-950 border-gray-800 rounded-lg w-full text-sm text-slate-50"
            >
                {/* Show a default "Select" option if no type is selected */}
                {!defautlTransactionType && <option value=''>Select</option>}
                <option value='IN'>Income</option> {/* Option for income transaction */}
                <option value='OUT'>Expense</option> {/* Option for expense transaction */}
            </select>
        </div>
    )
}

export default TransactionTypeSelector // Export the component for use in other parts of the application
