import { jwtDecode } from "jwt-decode"

// Function to check if a JWT token is expired
const isTokenExpired = (token: string): boolean => {
    try {
        const decode = jwtDecode(token) // Decode the JWT token
        if (decode.exp) { // Check if expiration property exists
            // Compare token expiration time (in milliseconds) with the current time
            return decode.exp * 1000 < Date.now()
        }
        return false // Token is not expired if 'exp' is not found
    }
    catch (error) {
        // If an error occurs (e.g., invalid token), consider it expired
        return true
    }
}

export default isTokenExpired
