import { Transaction } from "../../services/api/transactionsService"
import TransactionCard from "./TransactionCard"
import TransactionsSummary from "./TransactionsSummary"
import TransactionsFilters from "./TransactionsFilters"
import { useState } from "react"

interface Props {
    transactions: Transaction[]
}

const MonthlyTransactions = ({ transactions }: Props) => {

    const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <>
        <div className="w-full grid grid-cols-2 gap-8">
            <TransactionsSummary 
                transactions={transactions}
            />
            <TransactionsFilters 
                setter={setSelectedCategory}
            />
        </div>
        {
        transactions
        .filter( transaction => selectedCategory > 0 ? transaction.category === selectedCategory : true)
        .map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction}/>
        ))}
    </>
  )
}

export default MonthlyTransactions