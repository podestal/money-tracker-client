import useAuthStore from "../../hooks/store/useAuthStore"
import useCreateTransaction from "../../hooks/api/transactions/useCreateTransaction"
import { Button } from "../ui/Button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger,  DialogHeader, DialogFooter } from "../ui/Dialog"
import TransactionForm from "./TransactionForm"

const CreateTransaction = () => {

    const access = useAuthStore(s => s.access) || ''
    const createTransaction = useCreateTransaction()

    const handleCreateTransaction = () => {
        createTransaction.mutate({transaction: {transaction_type: 'IN', amount: 100, category: 1, }, access})
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Create Transaction</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>New Transaction</DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>
                <TransactionForm />
            </DialogDescription>
            <DialogFooter>
            <DialogClose>
                dfsdf
            </DialogClose>
        </DialogFooter>
        </DialogContent>

    </Dialog>
  )
}

export default CreateTransaction