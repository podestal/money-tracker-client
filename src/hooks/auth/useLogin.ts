import { useMutation, UseMutationResult } from '@tanstack/react-query'; // Import react-query hooks and types for mutation
import { JWTCredentials } from '../../services/auth/authClient'; // Import JWT credentials interface
import loginService, { JWT } from '../../services/auth/loginService'; // Import login service and JWT type

// Custom hook to handle the login operation using react-query
const useLogin = (): UseMutationResult<JWT, Error, JWTCredentials> => {
    return useMutation({
        // Function to perform the mutation (login request)
        mutationFn: (data: JWTCredentials) => loginService.post(data), // Call the login service to authenticate the user

        // Callback function for when the mutation is successful
        onSuccess: (jwtData: JWT) => {
            console.log('jwtData', jwtData); // Log the received JWT data to the console
        },

        // Callback function for when the mutation encounters an error
        onError: (err) => {
            console.log(err); // Log the error to the console
        },
    });
}

export default useLogin; // Export the custom useLogin hook for use in other parts of the application
