import useAuthStore from "../../hooks/store/useAuthStore"
import CreateTransaction from "./CreateTransaction"
import GetTransactions from "./GetTransactions"

const Transactions = () => {
    // Retrieve the access token from the authentication store. If it's null, default to an empty string.
    const access = useAuthStore(s => s.access) || ''

    // Pass the normalized access token to the GetTransactions component
    return (
        <>
        <CreateTransaction />
        <GetTransactions 
            access={access}
        />
        </>
    )
}

export default Transactions