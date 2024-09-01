import { useEffect } from "react"
import useLogin from "./hooks/auth/useLogin"


const App = () => {

  const loginMutation = useLogin()

  useEffect(() => {
    loginMutation.mutate({username: 'podestal', password: '13angulo'})
  }, [])

  return (
    <>
      <h2 className="text-4xl text-red-500">Hola</h2>
    </>
  )
}

export default App
