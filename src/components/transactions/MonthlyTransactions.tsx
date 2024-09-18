import { useState } from "react"
import { Transaction } from "../../services/api/transactionsService"
import TransactionCard from "./TransactionCard"
import TransactionsFilters from "./TransactionsFilters"

interface Props {
    transactions: Transaction[]
}

const MonthlyTransactions = ({ transactions }: Props) => {

    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])

  return (
    <>
        <TransactionsFilters 
            transactions={transactions}
        />
        {filteredTransactions.length > 0
        ? 
        filteredTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction}/>
        ))
        :
        transactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction}/>
        ))}
    </>
  )
}

export default MonthlyTransactions