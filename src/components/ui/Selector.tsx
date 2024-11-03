// Interface representing a base structure for items with id and name
interface Item {
    id: number
    name: string
}

// Props interface that accepts a generic type T, which must extend Item
// Ensures that the objects in the values array have at least id and name
interface Props<T extends Item> {
    values: T[] // Array of generic items
    defaultValue: number // Default selected value, corresponds to item id
    setter: (value: number) => void // Function to update the selected value
    label: string // Text that indicate the type of the selector
    all?: boolean // Boolean that conditionally renders all values
}

// Selector component that uses a generic type T, extending the Item interface
const Selector = <T extends Item>({ values, defaultValue, setter, label, all }: Props<T>) => {
  
    return (
        <div className="lg:w-full w-[60%] flex flex-col mx-auto justify-center items-center gap-4">
            {/* Label for the selector */}
            <p className="text-slate-50">{label}</p>
            {/* Dropdown (select) element */}
            <select
                defaultValue={defaultValue} // Set the default selected value
                onChange={e => setter(parseInt(e.target.value))} // Call setter with selected value
                className="bg-gray-950 border-gray-800 rounded-lg w-full text-sm text-slate-50"
            >
                {all 
                ?
                <option value={0}>All</option>
                :
                <>
                {/* If no default value, render a placeholder option */}
                { !defaultValue && <option value={0}>Select</option>} 
                </>
                }

                
                {/* Map over the values array to render each item as an option */}
                {values.map((value) => (
                    <option key={value.id} value={value.id}>
                        {value.name} {/* Display the name of the item */}
                    </option>
                ))}
            </select>
        </div>      
    )
}

export default Selector // Export the component for use in other parts of the app
