interface Props {
    amount: number
}

// The BalanceCard component is a simple presentational component that takes an amount prop and displays it.
const BalanceCard = ({ amount }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <h2 className={`text-7xl font-bold ${amount > 0 ? 'text-green-500' : 'text-red-500'}`}>{amount.toFixed(2)}</h2>
    </div>
  )
}

export default BalanceCard