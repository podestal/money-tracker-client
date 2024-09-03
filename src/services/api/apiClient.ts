import axios from "axios"; // Import the Axios library for making HTTP requests

const URL = 'http://127.0.0.1:8000/api/'; // Base URL for the API

// Create an Axios instance with a predefined configuration
const axiosInstance = axios.create({
    baseURL: URL // Set the base URL for all requests made by this Axios instance
});

// APIClient class definition with two generic types: ResponseType and RequestType
class APIClient<ResponseType, RequestType = ResponseType> {
    endpoint: string; // Define an endpoint property to store the specific API endpoint

    // Constructor to initialize the endpoint for the API client
    constructor(endpoint: string) {
        this.endpoint = endpoint; // Assign the endpoint passed to the constructor
    }

    // Method to make a GET request to the specified endpoint
    get = (access: string) => {
        return axiosInstance
            .get<ResponseType>(this.endpoint, {
                headers: { Authorization: `JWT ${access}` } // Add Authorization header with JWT token
            })
            .then(res => res.data); // Return the response data from the GET request
    };

    post = (data: RequestType, access: string) => {
        return axiosInstance
            .post<ResponseType>(this.endpoint, data, {
                headers: { Authorization: `JWT ${access}` }
            })
            .then(res => res.data)
    }
}

export default APIClient; // Export the APIClient class for use in other parts of the application