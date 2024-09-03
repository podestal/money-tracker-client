import useGetTransactions from "../../hooks/api/transactions/useGetTransactions"
import TransactionCard from "./TransactionCard"

interface Props {
    access: string // Access token to authenticate the API request
}

const GetTransactions = ({ access }: Props) => {
    // Fetch transactions data using the custom hook
    const {data: transactions, isLoading, isError, error, isSuccess} = useGetTransactions(access)

    // Show loading indicator while data is being fetched
    if (isLoading) return <p>Loading ...</p>

    // Display error message if there's an error
    if (isError) return <p>{error.message}</p>

    // Once data is successfully fetched, render a list of TransactionCard components
    if (isSuccess)
    return (
        <>
            {transactions.map(transaction => (
                <TransactionCard key={transaction.id} transaction={transaction}/>
            ))}
        </>
    )

    // Optionally handle any other states (e.g., no transactions found), although the above covers most cases
    return null
}

export default GetTransactions
