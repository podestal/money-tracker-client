import useGetTransactions from "../../hooks/api/transactions/useGetTransactions"
import MonthlyTransactions from "./MonthlyTransactions"
import useTransactionsDateStore from "../../hooks/store/useTransactionsDateStore"
import Skeleton from "react-loading-skeleton"

interface Props {
    access: string // Access token to authenticate the API request
}

const GetTransactions = ({ access }: Props) => {
    
    const date = useTransactionsDateStore(s => s.date)

    // Fetch transactions data using the custom hook
    const {data: transactions, isLoading, isError, error, isSuccess} = useGetTransactions(access, date)

    // Show loading indicator while data is being fetched
    if (isLoading) return (
        <div className="w-full">
            <div className="flex justify-between gap-4 mb-10">
            <Skeleton width={220} height={50} style={{marginTop: '10px'}} baseColor='#64748b'/>
            <Skeleton width={220} height={50} style={{marginTop: '10px'}} baseColor='#64748b'/>
            <Skeleton width={220} height={50} style={{marginTop: '10px'}} baseColor='#64748b'/>
            </div>
            <Skeleton count={20} style={{marginTop: '10px'}} baseColor='#64748b'/>
        </div>
    )

    // Display error message if there's an error
    if (isError) return <p>{error.message}</p>

    // Once data is successfully fetched, render a list of TransactionCard components
    if (isSuccess)
    return (
        <>  
            <MonthlyTransactions 
                transactions={transactions}
            />
        </>
    )

    // Optionally handle any other states (e.g., no transactions found), although the above covers most cases
    return null
}

export default GetTransactions
