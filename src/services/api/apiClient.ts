import axios from "axios"; // Import the Axios library for making HTTP requests

const URL = 'http://127.0.0.1:8000/api/'; // Base URL for the API

// Create an Axios instance with a predefined configuration
const axiosInstance = axios.create({
    baseURL: URL // Set the base URL for all requests made by this Axios instance
});

// Define a generic API client class to handle API requests
class APIClient<T> {
    endpoint: string; // Define an endpoint property to store the specific API endpoint

    // Constructor to initialize the endpoint for the API client
    constructor(endpoint: string) {
        this.endpoint = endpoint; // Assign the endpoint passed to the constructor
    }

    // Method to make a GET request to the specified endpoint
    get = (access: string) => {
        return axiosInstance
            .get<T>(this.endpoint, {
                headers: { Authorization: `JWT ${access}` } // Add Authorization header with JWT token
            })
            .then(res => res.data); // Return the response data from the GET request
    };
}

export default APIClient; // Export the APIClient class for use in other parts of the application
