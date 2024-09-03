import useAuthStore from "../../hooks/store/useAuthStore";
import useCreateTransaction from "../../hooks/api/transactions/useCreateTransaction";
import { Button } from "../ui/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";
import TransactionForm from "./TransactionForm";

// A component to create a new transaction inside a modal dialog
const CreateTransaction = () => {
  const access = useAuthStore((s) => s.access) || ""; // Retrieve access token from the auth store
  const createTransaction = useCreateTransaction(); // Hook to handle transaction creation

  return (
    <Dialog>
      {/* Button to trigger the dialog */}
      <DialogTrigger asChild>
        <Button>Create Transaction</Button>
      </DialogTrigger>

      {/* Dialog content for creating a new transaction */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          {/* Form component to create a new transaction */}
          <TransactionForm createTransaction={createTransaction} access={access} />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransaction;
