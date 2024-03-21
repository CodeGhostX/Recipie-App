import Login from "../components/Login"
import Register from "../components/Register"

const auth = () => {
  return (
    <div className="flex flex-row gap-72 ml-64">
      <Register/>
      <Login/>
    </div>
  )
}

export default auth
