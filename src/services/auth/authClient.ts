import axios from "axios"; // Import the Axios library for making HTTP requests

const URL = 'http://127.0.0.1:8000/auth/'; // Base URL for the authentication API

// Define an interface for JWT credentials
export interface JWTCredentials {
    username: string; // User's username
    password: string; // User's password
}

// Create an Axios instance with a predefined configuration
const axiosInstance = axios.create({
    baseURL: URL, // Set the base URL for all requests made by this Axios instance
});

// Define a generic AuthClient class to handle authentication API requests
class AuthClient<T> {
    endpoint: string; // Define an endpoint property to store the specific API endpoint

    // Constructor to initialize the endpoint for the AuthClient
    constructor(endpoint: string) {
        this.endpoint = endpoint; // Assign the endpoint passed to the constructor
    }

    // Method to make a GET request to the specified endpoint
    get = (access: string) => {
        return axiosInstance
            .get<T>(this.endpoint, {
                headers: { Authorization: `JWT ${access}` }, // Add Authorization header with JWT token
            })
            .then(res => res.data); // Return the response data from the GET request
    }

    // Method to make a POST request to the specified endpoint
    post = (data: JWTCredentials) => {
        return axiosInstance
            .post<T>(this.endpoint, data) // Send user credentials for authentication
            .then(res => res.data); // Return the response data from the POST request
    }
}

export default AuthClient; // Export the AuthClient class for use in other parts of the application
