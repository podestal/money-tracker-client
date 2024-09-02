import APIClient from "./apiClient"; // Import the APIClient class from the apiClient module

// Define a TypeScript interface for the Balance object
export interface Balance {
    id: number;      // Unique identifier for the balance
    amount: number;  // Amount of money in the balance
    user: number;    // ID of the user associated with this balance
}

const URL = 'balances/'; // API endpoint for fetching balance data

// Create a new instance of the APIClient for Balance objects, using the specified endpoint
export default new APIClient<Balance>(URL);
