import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "../ui/Button";
import { Input } from "../ui/InputText";
import { Transaction } from "../../services/api/transactionsService";
import { CreateTransactionData } from "../../hooks/api/transactions/useCreateTransaction";
import { useRef, useState } from "react";

interface Props {
  createTransaction: UseMutationResult<Transaction, Error, CreateTransactionData>; // Mutation result for creating a transaction
  access: string; // User access token
}

// A form component responsible for creating a new transaction
const TransactionForm = ({ createTransaction, access }: Props) => {
  // Refs for input fields
  const typeRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);

  // State variables for success and error messages
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handler function to create a new transaction
  const handleCreateTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    setSuccess("");
    setError("");

    // Get input values from refs
    const transaction_type = typeRef.current?.value;
    const amount = amountRef.current?.value;
    const category = categoryRef.current?.value;

    // Basic validation checks
    if (!transaction_type || !amount || !category) {
      setError("All fields are required");
      return;
    }

    // Perform the mutation to create a transaction
    createTransaction.mutate(
      { transaction: { transaction_type, amount: parseInt(amount), category: parseInt(category) }, access },
      {
        onSuccess: () => {
          // Clear input fields on success
          if (typeRef.current) typeRef.current.value = "";
          if (amountRef.current) amountRef.current.value = "";
          if (categoryRef.current) categoryRef.current.value = "";
          setSuccess("Transaction created successfully");
        },
        onError: (error) => {
          setError(`Error: ${error.message}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleCreateTransaction}>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <Input placeholder="Type" ref={typeRef} />
      <Input placeholder="Amount" ref={amountRef} />
      <Input placeholder="Category" ref={categoryRef} />
      <Button>Create</Button>
    </form>
  );
};

export default TransactionForm;
