import Balance from "../components/balance/Balance" // Importing the Balance component
import Categories from "../components/categories/Categories"
import GetTransactionsChartData from "../components/transactions/GetTransactionsChartData"
import Transactions from "../components/transactions/Transactions" // Importing the Transactions component

// Component representing the dashboard page of the application
const DashboardPage = () => {
  // Rendering the dashboard layout
  return (
    <div className="text-slate-50 min-h-screen md:max-w-[850px] xl:max-w-[1060px] 2xl:max-w-[1300px] mx-auto">
        {/* Flex container to display Balance and graphs */}
        <div className="w-full max-md:flex-col max-md:gap-10 flex justify-between items-center py-12">
            <Balance /> {/* Displaying the user's balance */}
            <div className="hidden md:block">
              <GetTransactionsChartData />
            </div>
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
