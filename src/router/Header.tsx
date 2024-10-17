import { Link, useLocation } from "react-router-dom"
import { RiHandCoinFill, RiListCheck2 } from "@remixicon/react"
import Logout from "../components/auth/Logout"
import { useEffect, useState } from "react"

const Header = () => {

    const location = useLocation()
    const [selected, setSelected] = useState(location.pathname)

    const isSelected = (path: string) => selected === path

    useEffect(() => {
        console.log('selected', selected);
        
    }, [])

  return (
    <div className="w-[160px] text-slate-50 min-h-screen bg-slate-900 grid grid-rows-2 text-center py-10 fixed">
        <div className="flex flex-col justify-between h-full items-center gap-10">
            <h2 className="text-3xl font-bold">Welcome</h2>
            <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
                <Link 
                    to={'/'}
                    className={`flex justify-center items-center gap-2 hover:bg-slate-700 w-full py-4 ${isSelected("/") && 'bg-slate-700'}`}
                    onClick={() => setSelected('/')}
                >
                    <RiHandCoinFill  color='blue' size={24}/>
                    <p className="text-xs">Money</p>
                </Link>
                <Link 
                    to={'/projects'}
                    className={`flex justify-center items-center gap-2 hover:bg-slate-700 w-full py-4 ${isSelected("/projects") && 'bg-slate-700'}`}
                    onClick={() => setSelected('/projects')}
                >
                    <RiListCheck2  color='blue' size={24}/>
                    <p className="text-xs">Tasks</p>
                </Link>
                <Logout />
            </div>
  

        </div>
    </div>
  )
}

export default Header