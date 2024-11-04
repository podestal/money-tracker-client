import useAuthStore from "../../hooks/store/useAuthStore";
import useCreateTransaction from "../../hooks/api/transactions/useCreateTransaction";
import { Button } from "../ui/Button";
import TransactionForm from "./TransactionForm";
import Modal from "../ui/Modal";
import { useState } from "react";

// A component to create a new transaction inside a modal dialog
const CreateTransaction = () => {
  const access = useAuthStore((s) => s.access) || ""; // Retrieve access token from the auth store
  const createTransaction = useCreateTransaction(); // Hook to handle transaction creation
  const [open, setOpen] = useState(false)

  const handleClosePanel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>New Transaction</Button>
      <Modal
        title="New Transaction"
        isOpen={open}
        onClose={handleClosePanel}
      >
          <TransactionForm createTransaction={createTransaction} access={access} />
      </Modal>
    </>
    // <Dialog>
    //   {/* Button to trigger the dialog */}
    //   <DialogTrigger asChild>
    //     <Button>New Transaction</Button>
    //   </DialogTrigger>

    //   {/* Dialog content for creating a new transaction */}
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle className="text-3xl text-center my-6">New Transaction</DialogTitle>
    //     </DialogHeader>
    //     <DialogDescription asChild>
    //       {/* Form component to create a new transaction */}
          // <TransactionForm createTransaction={createTransaction} access={access} />
    //     </DialogDescription>
    //     <DialogFooter>
    //       <DialogClose asChild>
    //         <div className="w-full flex justify-center items-center">
    //           <Button variant="destructive">Close</Button>
    //         </div>
    //       </DialogClose>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
};

export default CreateTransaction;
