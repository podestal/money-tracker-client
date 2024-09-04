import { RiAddCircleFill } from "@remixicon/react"
import { Input } from "../ui/InputText"

const CategoriesForm = () => {
  return (
    <form className="flex justify-center items-center gap-10">
        <Input 
            placeholder="Category name ..."
        />
        <RiAddCircleFill 
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
        />
    </form>
  )
}

export default CategoriesForm