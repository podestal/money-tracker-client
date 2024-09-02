import { UseMutationResult } from "@tanstack/react-query"
import { JWT } from "../../services/auth/loginService"
import { JWTCredentials } from "../../services/auth/authClient"
import { Button } from "../ui/Button"
import { Input } from "../ui/InputText"
import { useRef } from "react"

interface Props {
    login: UseMutationResult<JWT, Error, JWTCredentials>
    setSuccess: (value:string) => void
    setError: (value:string) => void
}

const LoginForm = ({ login, setSuccess, setError }: Props) => {

    // Refs for username and password
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    
    // Handle form submission
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

        // Reset error and success messages
        setSuccess('')
        setError('')

        // Prevents default behavior of reload page after hitting submit
        e.preventDefault()

        // Get input values from refs
        const username = usernameRef.current?.value
        const password = passwordRef.current?.value

        // Basic validation checks
        if (!username || !password) {
            setError('Username and password required')
            return
        }

        login.mutate(
            { username, password },
            {
              onSuccess: () => {
                // Clear input fields on successful login
                if (usernameRef.current) usernameRef.current.value = "";
                if (passwordRef.current) passwordRef.current.value = "";
                // Set success message
                setSuccess('Welcome')
              },
              onError: (error) => {
                // Handle errors (e.g., show an error message)
                console.error("Login failed:", error);
                // Set error message
                setError(`Error: ${error.message}`)
              },
            }
          );
    }

  return (
    <form onSubmit={handleLogin}>
        <Input 
            placeholder="Username"
            ref={usernameRef} // Attach the ref to the input element
        />
        <Input 
            placeholder="Password"
            type="password"
            ref={passwordRef} // Attach the ref to the input element
        />
        <Button variant="primary">Login</Button>
    </form>
  )
}

export default LoginForm