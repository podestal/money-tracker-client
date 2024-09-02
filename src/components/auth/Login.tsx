import LoginForm from "./LoginForm"
import useLogin from "../../hooks/auth/useLogin"
import { useState } from "react"

// Login component
const Login = () => {

    // Login mutation
    const login = useLogin()

    // Error handling
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

  return (
    <div>
        <h2>Login</h2>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <LoginForm 
            login={login}
            setSuccess={setSuccess}
            setError={setError}
        />
    </div>
  )
}

export default Login