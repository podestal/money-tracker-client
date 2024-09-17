import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { JWTCredentials } from '../../services/auth/authClient'
import loginService, { JWT } from '../../services/auth/loginService'
import useAuthStore from '../store/useAuthStore'

// Custom hook to handle the login operation using react-query
// Accepts setLoading function to manage loading state during login process
const useLogin = (setLoading: (val: boolean) => void): UseMutationResult<JWT, Error, JWTCredentials> => {
    const setTokens = useAuthStore(s => s.setTokens) // Hook to set access and refresh tokens in auth store

    return useMutation({
        // Called when the mutation is triggered, before making the request
        onMutate: () => setLoading(true), // Set loading state to true when login starts

        // Function to perform the actual login request (mutation)
        mutationFn: (data: JWTCredentials) => loginService.post(data), // Call the login service with user credentials

        // Callback function when the mutation is successful
        onSuccess: (jwtData: JWT) => {
            setTokens(jwtData.access, jwtData.refresh) // Save received JWT access and refresh tokens in store
        },

        // Callback function when the mutation encounters an error
        onError: (err) => {
            console.log(err) // Log the error to the console for debugging
        },

        // Called after the mutation is either successfully completed or failed
        onSettled: () => setLoading(false), // Set loading state back to false after login process completes
    });
}

export default useLogin; // Export the custom useLogin hook for use in other parts of the application
