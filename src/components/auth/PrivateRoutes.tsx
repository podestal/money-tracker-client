import { Navigate } from "react-router-dom"
import useAuthStore from "../../hooks/store/useAuthStore"

interface Props {
    children: JSX.Element // Child components
}

const PrivateRoutes = ({ children }: Props) => {
    const access = useAuthStore(s => s.access) // Get access token from auth store

    // If access token does not exist, navigate to login page
    if (!access) return <Navigate to='/login' />

    // Render the child components if access token exists
    return children
}

export default PrivateRoutes
