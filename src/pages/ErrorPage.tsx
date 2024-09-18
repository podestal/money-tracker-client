import { Button } from "../components/ui/Button" // Importing the Button component from the UI folder
import { useNavigate } from "react-router-dom" // Importing useNavigate hook from react-router-dom for navigation

// Component representing the error page of the application
const ErrorPage = () => {

    const navigate = useNavigate() // Initializing the navigate function for programmatic navigation

    // Rendering a simple error message
    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-50 flex flex-col justify-center items-center gap-6">
            {/* Displaying the main error heading */}
            <h2 className="text-8xl font-bold">404 Ops!</h2>

            {/* Displaying a subheading with additional error information */}
            <p className="text-2xl">This page does not exist</p>

            {/* Button to navigate back to the homepage */}
            <Button onClick={() => navigate('/')}>Let's go back</Button>
        </div>
    )
}

export default ErrorPage // Exporting the ErrorPage component for use in other parts of the app
