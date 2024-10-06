import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { RiHandCoinFill, RiListCheck2 } from "@remixicon/react"

const Header = () => {
  return (
    <div className="w-[160px] text-slate-50 min-h-screen bg-slate-900 grid grid-rows-2 text-center gap-12 py-12">
        <div className="flex flex-col justify-start items-center gap-20 h-full">
            <h2 className="text-3xl font-bold mt-10">Welcome</h2>
            <Link 
                to={''}
                className="flex flex-col items-center gap-2"
            >
                <RiHandCoinFill  color='blue' size={30}/>
                <p>Money</p>
            </Link>
            <Link 
                to={'/projects'}
                className="flex flex-col items-center gap-2"
            >
                <RiListCheck2  color='blue' size={30}/>
                <p>Tasks</p>
            </Link>
        </div>
        <Button className="m-auto" variant="destructive">Logout</Button>
    </div>
  )
}

export default Header