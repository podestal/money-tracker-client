import LoginForm from "./LoginForm"
import useLogin from "../../hooks/auth/useLogin"
import { useState } from "react"

// Main Login component
const Login = () => {

    // State for handling success, loading, and error messages
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Use the custom useLogin hook, passing the setLoading function to handle request state
    const login = useLogin(setLoading)

  return (
    // Main container for login page layout
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-12">
        {/* Title of the login page */}
        <h2 className="text-slate-50 text-6xl">Login</h2>

        {/* Display success message */}
        {success && <p className="text-green-500">{success}</p>}

        {/* Display error message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Render the LoginForm component */}
        <LoginForm 
            login={login}
            setSuccess={setSuccess}
            setError={setError}
            loading={loading}
        />
    </div>
  )
}

export default Login
