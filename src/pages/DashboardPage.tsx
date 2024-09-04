import Balance from "../components/balance/Balance" // Importing the Balance component
import Categories from "../components/categories/Categories"
import Transactions from "../components/transactions/Transactions" // Importing the Transactions component

// Component representing the dashboard page of the application
const DashboardPage = () => {
  // Rendering the dashboard layout
  return (
    <div>
        <h2>Dashboard</h2>
        {/* Flex container to display Balance and graphs */}
        <div className="w-full flex justify-evenly items-center">
            <Balance /> {/* Displaying the user's balance */}
            <h2>Graph</h2> {/* Placeholder for a graph */}
            <Categories /> {/*  Button to access Categories */}
        </div>

        {/* Flex container to display the transactions */}
        <div className="flex flex-col justify-center items-center">
            <Transactions /> {/* Displaying the transactions */}
        </div>
    </div>
  )
}

export default DashboardPage // Exporting the DashboardPage component for use in other parts of the app
