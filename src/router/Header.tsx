import { Link } from "react-router-dom"
import { RiHandCoinFill, RiListCheck2 } from "@remixicon/react"
import Logout from "../components/auth/Logout"

const Header = () => {
  return (
    <div className="w-[160px] text-slate-50 min-h-screen bg-slate-900 grid grid-rows-2 text-center py-12 realtive">
        <div className="flex flex-col justify-start items-center gap-20 h-screen fixed">
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
            <Logout />
        </div>
    </div>
  )
}

export default Header