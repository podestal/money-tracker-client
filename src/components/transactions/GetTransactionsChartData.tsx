import Skeleton from "react-loading-skeleton"
import useGetCategories from "../../hooks/api/categories/useGetCategories"
import useGetTransactions from "../../hooks/api/transactions/useGetTransactions"
import useAuthStore from "../../hooks/store/useAuthStore"
import useTransactionsDateStore from "../../hooks/store/useTransactionsDateStore"
import TransactionsDonutChart from "./TransactionsDonutChart"

const GetTransactionsChartData = () => {

    const access = useAuthStore(s => s.access) || ''
    const date = useTransactionsDateStore(s => s.date)
    const {
        data: categories, 
        isLoading: isLoadingCategories, 
        isError: isErrorCategories, 
        error: errorCategories,
        isSuccess: isSuccessCategories
    } = useGetCategories(access)

    const {
        data: transactions, 
        isLoading: isLoadingTransactions, 
        isError: isErrorTransactions, 
        error: errorTransactions,
        isSuccess: isSuccessTransactions
    } = useGetTransactions(access, date)

    if (isLoadingCategories || isLoadingTransactions) return (
      <div className='text-7xl font-bold mb-6 text-center'>
          <Skeleton width={180} height={140} style={{marginTop: '10px'}} baseColor='#64748b'/>
      </div>
  ) 

    if (isErrorCategories || isErrorTransactions) return <p>{errorCategories ? errorCategories.message : errorTransactions?.message}</p>

    if (isSuccessCategories && isSuccessTransactions)

  return (
    <TransactionsDonutChart 
        categories={categories}
        transactions={transactions}
    />
  )
}

export default GetTransactionsChartData