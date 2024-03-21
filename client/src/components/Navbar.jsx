import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const handleClick = () =>{
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  }

  return (
    <div className="flex flex-row gap-7 bg-black p-4 text-white text-lg justify-center">
      <Link to='/'>Home</Link>
      <Link to='/create'>Create Recipie</Link>
      <Link to='/saved'>Saved Recipie</Link>
      {!cookies.access_token ? <Link to='/auth'>Login/Register</Link> : <button onClick={handleClick}>Logout</button>}
    </div>
  )
}

export default Navbar
