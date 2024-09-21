import { useMemo } from "react"
import { Category } from "../../../services/api/categoriesService"
import { Transaction } from "../../../services/api/transactionsService"

interface Props {
    categories: Category[]
    transactions: Transaction[]
}

const useTransactionsChartData = ({ categories, transactions }: Props) => {

    const categoriesIdName = categories.reduce((dict, category) => {
        dict[category.id] = category.name
        return dict
    }, {} as Record<number, string>)

    const amountPerCategory = useMemo(() => 
        transactions.reduce((totalDict, transaction) => {
            const categoryName = categoriesIdName[transaction.category]
            if (transaction.transaction_type !== 'IN') {
                if (totalDict[categoryName]) {
                    totalDict[categoryName] += transaction.amount;
                } else {
                    totalDict[categoryName] = transaction.amount;
                }
            }
            return totalDict;
        }, {} as Record<string, number>), [transactions, categoriesIdName]);

    const data = Object.entries(amountPerCategory).map(([name, amount]) => ({
        name,
        amount: parseFloat(amount.toFixed(2))
    }))

    return data

}
export default useTransactionsChartData