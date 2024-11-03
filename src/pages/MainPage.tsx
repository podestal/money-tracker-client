import { Outlet } from "react-router-dom"
import useAuthStore from "../hooks/store/useAuthStore"
import { useEffect } from "react"
import isTokenExpired from "../utils/isTokenExpired"
import Header from "../router/Header"
import useNotificationStore from "../hooks/store/useNotificationStore"
import NotificationsCard from "../components/ui/NotificationsCard"

const MainPage = () => {
    const { access, clearTokens } = useAuthStore() 
    const { show, type, message, reset } = useNotificationStore()

    useEffect(() => {
        if (access) { 
            if (isTokenExpired(access)) { 
                clearTokens() 
            }
        }
    }, [])

    return (
        <div className="bg-slate-950 text-slate-50 h-full relative">
            {show &&
            <NotificationsCard 
                type={type}
                message={message}
                reset={reset}
            />
            }
            <div className="">
                {access && <Header />}
                <div className="ml-[160px]">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainPage
