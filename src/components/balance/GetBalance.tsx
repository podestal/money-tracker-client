import useGetBalance from "../../hooks/api/balance/useGetBalance"

import BalanceCard from "./BalanceCard"

interface Props {
    access: string
}

const GetBalance = ({ access }: Props) => {
  
    // Fetch balance data using the custom hook
    const {data: balance, isLoading, isError, error, isSuccess} = useGetBalance(access)
    
    // Show loading indicator while data is being fetched
    if (isLoading) return <p>Loading ...</p>

    // Display error message if there's an error
    if (isError) return <p>{error.message}</p>

    // Once data is successfully fetched, render the BalanceCard component with the data
    if (isSuccess) {
        return (
            <BalanceCard 
                amount={balance.amount}
            />
        )
    }

    // Optionally, handle a case where no conditions are met, although this should not happen.
    return null
}

export default GetBalance