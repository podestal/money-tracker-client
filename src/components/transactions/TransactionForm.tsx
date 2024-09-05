import { UseMutationResult } from "@tanstack/react-query" // Import type definitions from React Query
import { Button } from "../ui/Button" // Import the custom Button component
import { Input } from "../ui/InputText" // Import the custom Input component
import { Transaction } from "../../services/api/transactionsService" // Import Transaction type from the API service
import { CreateTransactionData } from "../../hooks/api/transactions/useCreateTransaction" // Import type for creating transaction data
import { UpdateTransactionData } from "../../hooks/api/transactions/useUpdateTransaction" // Import type for updating transaction data
import { useEffect, useRef, useState } from "react" // Import React hooks
import CategorySelector from "../categories/CategorySelector" // Import CategorySelector component

// Define the type for the props accepted by TransactionForm component
interface Props {
  createTransaction?: UseMutationResult<Transaction, Error, CreateTransactionData> // Mutation result for creating a transaction
  updateTransaction?: UseMutationResult<Transaction, Error, UpdateTransactionData> // Mutation result for updating a transaction
  access: string // User access token
  transaction?: Transaction // Transaction object for pre-filling the form when editing
}

// A form component responsible for creating or updating a transaction
const TransactionForm = ({ createTransaction, updateTransaction, access, transaction }: Props) => {

  // Refs for input fields
  const typeRef = useRef<HTMLInputElement>(null)
  const amountRef = useRef<HTMLInputElement>(null)

  // Category state initialized with the value of 0
  const [category, setCategory] = useState(0)

  // State variables for success and error messages
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Set default values in the form when editing an existing transaction
  useEffect(() => {
    if (transaction) {
      if (typeRef.current) typeRef.current.value = transaction.transaction_type // Set the default transaction type
      if (amountRef.current) amountRef.current.value = transaction.amount.toString() // Set the default amount
      if (transaction?.category) {setCategory(transaction.category)} // Set the default category
    }
  }, [transaction]) // Only run this effect when the transaction prop changes

  // Handler function to create or update a transaction
  const handleCreateTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent form submission from reloading the page

    // Reset success and error messages
    setSuccess("")
    setError("")

    // Get input values from refs
    const transaction_type = typeRef.current?.value
    const amount = amountRef.current?.value

    // Basic validation checks
    if (!transaction_type || !amount || !category) {
      setError("All fields are required")
      return
    }

    // Perform the mutation to create a transaction if createTransaction is defined
    if (createTransaction) {
      createTransaction.mutate(
        { transaction: { transaction_type, amount: parseInt(amount), category }, access },
        {
          onSuccess: () => {
            // Clear input fields on success
            if (typeRef.current) typeRef.current.value = ""
            if (amountRef.current) amountRef.current.value = ""
            setCategory(0)
            setSuccess("Transaction created successfully")
          },
          onError: (error) => {
            setError(`Error: ${error.message}`)
          },
        }
      )
    }

    // Perform the mutation to update a transaction if updateTransaction is defined
    if (updateTransaction) {
      updateTransaction.mutate(
        { updates: { transaction_type, amount: parseInt(amount), category }, access },
        {
          onSuccess: () => setSuccess("Transaction updated successfully"),
          onError: (error) => setError(`Error: ${error.message}`),
        }
      )
    }
  }

  return (
    <form onSubmit={handleCreateTransaction}>
      {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <Input placeholder="Type" ref={typeRef} /> {/* Input for transaction type */}
      <Input placeholder="Amount" ref={amountRef} /> {/* Input for transaction amount */}
      <CategorySelector setSelectedCategory={setCategory} categoryId={transaction?.category}/> {/* Select for transaction category */}
      <Button>Create</Button> {/* Button to submit the form */}
    </form>
  )
}

export default TransactionForm // Export the component for use in other parts of the application
