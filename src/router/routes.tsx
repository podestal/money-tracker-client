import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoutes from "../components/auth/PrivateRoutes";

// Define routes for the application
const router = createBrowserRouter([
    {
        path: '/', // Base path
        element: <MainPage />, // Main layout component
        errorElement: <ErrorPage />, // Error page for unmatched routes
        children: [
            { 
                index: true, // Default child route
                element: <PrivateRoutes><DashboardPage /></PrivateRoutes> // Protected dashboard route
            },
            { 
                path: 'login', // Login route
                element: <LoginPage /> 
            },
        ]
    }
])

export default router
