import useAuthStore from "../../hooks/store/useAuthStore"
import GetTransactions from "./GetTransactions"

const Transactions = () => {
    // Retrieve the access token from the authentication store. If it's null, default to an empty string.
    const access = useAuthStore(s => s.access) || ''

    // Pass the normalized access token to the GetTransactions component
    return (
        <>
        <GetTransactions 
            access={access}
        />
        </>
    )
}

export default Transactions