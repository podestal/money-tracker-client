import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import TaskManager from "../pages/TaskManager";
import PrivateRoutes from "../components/auth/PrivateRoutes";
import ProjectPage from "../pages/ProjectPage";
import TeamPage from "../pages/TeamPage";

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
                path: 'projects',
                element: <PrivateRoutes><TaskManager /></PrivateRoutes>,
            },
            {
                path: 'projects/:id',
                element: <PrivateRoutes><ProjectPage /></PrivateRoutes>,
            },
            {
                path: 'team',
                element: <PrivateRoutes><TeamPage /></PrivateRoutes>
            },
            { 
                path: 'login', // Login route
                element: <LoginPage /> 
            },
        ]
    }
])

export default router
// { path: 'posts/:id', element: <SinglePostPage /> },