import CategorySelector from "../categories/CategorySelector"

interface Props {
    setter: (value: number) => void
}

const TransactionsFilters = ({ setter }: Props) => {

  return (
    <div className="w-full grid grid-cols-3 my-auto">
        <p>Mes</p>
        <p>Day</p>
        <CategorySelector 
            setSelectedCategory={setter}
            all={true}
        />
    </div>
  )
}

export default TransactionsFilters