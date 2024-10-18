import Login from "../components/auth/Login"

// Component representing the login page of the application
const LoginPage = () => {
  // Rendering the Login component
  return (
    <div className="w-full min-h-screen bg-slate-950 text-center ml-[-80px]">
      <Login />
    </div>
  )
}

export default LoginPage // Exporting the LoginPage component for use in other parts of the app
