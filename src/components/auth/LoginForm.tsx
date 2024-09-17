import { UseMutationResult } from "@tanstack/react-query"
import { JWT } from "../../services/auth/loginService"
import { JWTCredentials } from "../../services/auth/authClient"
import { Button } from "../ui/Button"
import { Input } from "../ui/InputText"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

// Define the interface for the props received by LoginForm component
interface Props {
    login: UseMutationResult<JWT, Error, JWTCredentials>  // Mutation result for login
    setSuccess: (value: string) => void  // Function to set success message
    setError: (value: string) => void  // Function to set error message
    loading: boolean  // Loading state to disable form when login is processing
}

// LoginForm component that handles the login form and its submission
const LoginForm = ({ login, setSuccess, setError, loading }: Props) => {

    // Hook for navigation after successful login
    const navigate = useNavigate()

    // Refs for capturing username and password input values
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    
    // Function to handle form submission
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

        // Reset success and error messages when submitting
        setSuccess('')
        setError('')

        // Prevent default form submission behavior
        e.preventDefault()

        // Get the input values for username and password
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        // Simple validation: Ensure both fields are filled
        if (!username || !password) {
            setError('Username and password required')
            return
        }

        // Trigger the login mutation and pass credentials
        login.mutate(
            { username, password },
            {
              onSuccess: () => {
                // Clear input fields on successful login
                if (usernameRef.current) usernameRef.current.value = ""
                if (passwordRef.current) passwordRef.current.value = ""
                // Set success message and navigate to homepage
                setSuccess('Welcome')
                navigate('/')
              },
              onError: (error) => {
                // Log and display error if login fails
                console.error("Login failed:", error)
                setError(`Error: ${error.message}`)
              }
            }
        )
    }

  return (
    // Render the form with inputs and submit button
    <form 
      onSubmit={handleLogin}
      className="flex flex-col justify-center items-center gap-10"
    >
        {/* Username input field with ref */}
        <Input 
            placeholder="Username"
            ref={usernameRef} 
        />
        {/* Password input field with ref */}
        <Input 
            placeholder="Password"
            type="password"
            ref={passwordRef} 
        />
        {/* Submit button, disabled while loading */}
        <Button 
          disabled={loading}
          variant="primary">{loading ? 'Loading ...' : 'Submit'}</Button>
    </form>
  )
}

export default LoginForm
