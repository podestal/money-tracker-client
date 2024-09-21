import useTransactionsChartData from '../../hooks/api/utils/useTransactionsChartData'
import { Category } from '../../services/api/categoriesService'
import { Transaction } from '../../services/api/transactionsService'
import { DonutChart } from '../ui/DonutChart'

interface Props {
    categories: Category[]
    transactions: Transaction[]
}


const TransactionsDonutChart = ({ categories, transactions }: Props) => {

    const data = useTransactionsChartData({ categories, transactions })

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <DonutChart
                data={data}
                variant="donut"
                category="name"
                value="amount"
                className='w-[340px] h-[200px]'
                colors={['amber', 'blue', 'emerald', 'violet', 'cyan', 'pink', 'fuchsia', 'pink']}
                showLabel
                valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
                }
            />
        </div>
    )

}

export default TransactionsDonutChart