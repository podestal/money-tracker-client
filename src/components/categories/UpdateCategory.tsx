import { RiPencilFill } from "@remixicon/react"
import CategoriesForm from "./CategoriesForm"
import useAuthStore from "../../hooks/store/useAuthStore"

interface Props {
    onUpdate: boolean
    setOnUpdate: (value: boolean) => void
}

const UpdateCategory = ({ onUpdate, setOnUpdate }: Props) => {

    const access = useAuthStore(s => s.access) || ''

  return (
    <div>
        <RiPencilFill 
            className="text-blue-500 cursor-pointer hover:text-blue-600"
            onClick={() => setOnUpdate(true)}
        />
        {onUpdate && <CategoriesForm access={access}/>}
    </div>
  )
}

export default UpdateCategory