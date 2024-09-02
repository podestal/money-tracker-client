import GetBalance from "./GetBalance"
import useAuthStore from "../../hooks/store/useAuthStore"

// The Balance component acts as a container
const Balance = () => {

  // Fetch the access token or identifier from the auth store
  const access = useAuthStore(s => s.access) || ''

  return (
    <GetBalance 
      access={access}
    />
  )
}

export default Balance