import { Transaction } from "../../services/api/transactionsService"
import TransactionCard from "./TransactionCard"
import TransactionsSummary from "./TransactionsSummary"
import TransactionsFilters from "./TransactionsFilters"

interface Props {
    transactions: Transaction[]
}

const MonthlyTransactions = ({ transactions }: Props) => {

  return (
    <>
        <div className="w-full grid grid-cols-2 gap-8">
            <TransactionsSummary 
                transactions={transactions}
            />
            <TransactionsFilters 
            />
        </div>
        {transactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction}/>
        ))}
    </>
  )
}

export default MonthlyTransactions