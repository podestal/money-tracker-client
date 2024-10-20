import { RiPencilFill } from "@remixicon/react"
import useUpdateTransaction from "../../hooks/api/transactions/useUpdateTransaction"
import useAuthStore from "../../hooks/store/useAuthStore"
import { Transaction } from "../../services/api/transactionsService"
import { Button } from "../ui/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader, DialogFooter } from "../ui/Dialog";
import TransactionForm from "./TransactionForm";

interface Props {
    transaction: Transaction
}

const UpdateTransaction = ({ transaction }: Props) => {

    const updateTransaction = useUpdateTransaction(transaction.id)
    const access = useAuthStore(s => s.access) || ''

  return (
    <Dialog>
        {/* Button to trigger the dialog */}
        <DialogTrigger asChild>
            <div>
                <RiPencilFill 
                    className="text-blue-500 cursor-pointer hover:text-blue-600"
                    size={18}
                />
            </div>
        </DialogTrigger>

        {/* Dialog content for creating a new transaction */}
        <DialogContent>
        <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
            {/* Form component to create a new transaction */}
            <TransactionForm 
                updateTransaction={updateTransaction} 
                access={access} 
                transaction={transaction}/>
        </DialogDescription>
        <DialogFooter>
            <DialogClose asChild>
                <div className="w-full flex justify-center items-center">
                    <Button variant="destructive">Close</Button>
                </div>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default UpdateTransaction