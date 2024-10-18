import { Outlet } from "react-router-dom"
import useAuthStore from "../hooks/store/useAuthStore"
import { useEffect } from "react"
import isTokenExpired from "../utils/isTokenExpired"
import Header from "../router/Header"

const MainPage = () => {
    const { access, clearTokens } = useAuthStore() // Get access token and clearTokens method from auth store

    useEffect(() => {
        if (access) { // If access token exists
            if (isTokenExpired(access)) { // Check if token is expired
                clearTokens() // Clear tokens if expired
            }
        }
    }, []) // Empty dependency array ensures the effect runs once after component mounts

    return (
        <div className="bg-slate-950 h-full relative">
            <div className="">
                {access && <Header />}
                <div className="ml-[160px]">
                    <Outlet />
                </div>
            </div>
            {/* <Outlet /> */}
        </div>
    )
}

export default MainPage
