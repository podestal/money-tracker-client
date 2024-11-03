interface Props {
    amount: number
}

// The BalanceCard component is a simple presentational component that takes an amount prop and displays it.
const BalanceCard = ({ amount }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className={`lg:text-7xl md:text-5xl text-4xl font-bold ${amount > 0 ? 'text-green-500' : 'text-red-500'}`}>{amount.toFixed(2)}</h2>
      <p className="lg:text-3xl md:text-2xl text-xl">Balance</p>
    </div>
  )
}

export default BalanceCard