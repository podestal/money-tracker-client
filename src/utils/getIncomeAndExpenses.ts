import { Transaction } from "../services/api/transactionsService"

// Function to calculate total income and expenses from a list of transactions
const getIncomeAndExpenses = (transactions: Transaction[]) => {

    // Initialize income and expense variables
    let income: number = 0
    let expense: number = 0

    // Loop through each transaction and calculate income or expense
    transactions.map(transaction => {
        // If the transaction type is 'IN', add the amount to income
        if (transaction.transaction_type === 'IN') {
            income += transaction.amount
        } else {
            // If the transaction type is not 'IN', add the amount to expense
            expense += transaction.amount
        }
    })

    // Calculate the profit by subtracting expenses from income
    const profit = income - expense

    // Return formatted income, expense, and profit values
    return {
        income: income.toFixed(2), // Format income to two decimal places
        expense: expense.toFixed(2), // Format expenses to two decimal places
        profit: profit.toFixed(2) // Format profit to two decimal places
    }
}

export default getIncomeAndExpenses // Exporting the utility function for use in other parts of the app
