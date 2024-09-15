interface Props {
    amount: number
}

// The BalanceCard component is a simple presentational component that takes an amount prop and displays it.
const BalanceCard = ({ amount }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <h2 className="text-7xl font-bold">{amount}</h2>
    </div>
  )
}

export default BalanceCard