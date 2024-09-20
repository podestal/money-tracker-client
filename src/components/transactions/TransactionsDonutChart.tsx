import { Category } from '../../services/api/categoriesService'
import { Transaction } from '../../services/api/transactionsService'
import { DonutChart } from '../ui/DonutChart'

interface Props {
    categories: Category[]
    transactions: Transaction[]
}


const TransactionsDonutChart = ({ categories, transactions }: Props) => {

    const categoriesIdName = categories.reduce((dict, category) => {
        dict[category.id] = category.name
        return dict
    }, {} as Record<number, string>)

    const amountPerCategory = transactions.reduce((totalDict, transaction) => {
        const categoryName = categoriesIdName[transaction.category]
        if (transaction.transaction_type !== 'IN') {
            if (totalDict[categoryName]) {
                totalDict[categoryName] += transaction.amount
            } else {
                totalDict[categoryName] = transaction.amount
            }
        }
        return totalDict
    }, {} as Record<string, number>)

    const data = Object.entries(amountPerCategory).map(([name, amount]) => ({
        name,
        amount: parseFloat(amount.toFixed(2))
    }))

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <DonutChart
                data={data}
                variant="pie"
                category="name"
                value="amount"
                className='w-[340px] h-[200px]'
                showLabel
                valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
                }
            />
        </div>
    )

}

export default TransactionsDonutChart