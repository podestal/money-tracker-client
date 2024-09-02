interface Props {
    amount: number
}

// The BalanceCard component is a simple presentational component that takes an amount prop and displays it.
const BalanceCard = ({ amount }: Props) => {
  return (
    <div>{amount}</div>
  )
}

export default BalanceCard