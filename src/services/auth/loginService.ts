import APIClient from "./authClient"; // Import the AuthClient class

// Define an interface for the JWT structure
export interface JWT {
    access: string;  // Access token
    refresh: string; // Refresh token
}

// Create a new instance of the AuthClient for JWT operations with the 'jwt/create/' endpoint
const loginService = new APIClient<JWT>('jwt/create/');

export default loginService; // Export the loginService instance for use in other parts of the application
