import { Transaction } from "../../services/api/transactionsService"

interface Props {
    transactions: Transaction[]
}

const TransactionsFilters = ({ transactions }: Props) => {



  return (
    <div className="w-full grid grid-cols-2 text-center my-10">
        <p>Mes</p>
        <p>Categoría</p>
    </div>
  )
}

export default TransactionsFilters