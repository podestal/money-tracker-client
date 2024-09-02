import Balance from "../components/balance/Balance"
import Transactions from "../components/transactions/Transactions"
// import { Button } from '@/components/Button';
import { Button } from "../components/ui/Button"

const DashboardPage = () => {
  return (
    <div>
        <h2>Dashboard</h2>
        <div className="w-full flex justify-evenly items-center">
            <Balance />
            <h2>Graph</h2>
            <h2>Another Graph</h2>
        </div>

        <div className="flex flex-col justify-center items-center">
            <div>
            {/* <Button color="green">In</Button>
            <Button color="red">Out</Button> */}
            <Button variant="destructive">Hola</Button>
            <Button variant="primary">Primary</Button>
            </div>
            <Transactions />
        </div>
    </div>
  )
}

export default DashboardPage