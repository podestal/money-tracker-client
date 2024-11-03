import Login from "../components/auth/Login"

// Component representing the login page of the application
const LoginPage = () => {
  // Rendering the Login component
  return (
    <div className="md:max-w-[850px] xl:max-w-[1060px] 2xl:max-w-[1300px] min-h-screen bg-slate-950 text-center lg:ml-[-80px]">
      <Login />
    </div>
  )
}

export default LoginPage // Exporting the LoginPage component for use in other parts of the app
