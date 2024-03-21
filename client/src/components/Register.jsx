import { useState } from "react"
import axios from 'axios'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/register",{username, password})
    .then(result => console.log(result.data))
    .catch(err=>console.log(err));
    alert("Registration is completed ✅");
    setPassword("");
    setUsername("");
  }
  return (
    <div className="shadow-sm shadow-black p-5 m-5 w-[21%] mt-48 ml-24 scale-125">
      <p className="text-4xl ml-3">Register</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <div>
          <label className="p-3 text-2xl">Username </label>
          <input value={username} onChange={(e)=>setUsername(e.target.value)} className="border-2 border-black ml-3 rounded p-1" type="text" />
        </div>
        <div>
          <label className="p-3 text-2xl">Password </label>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="border-2 border-black ml-3 rounded p-1" type="password" />
        </div>
        <button type="submit" className="border-2 border-black bg-black text-white hover:bg-white hover:text-black w-[78%] ml-3 rounded p-1">Submit</button>
      </form>
    </div>
  )
}

export default Register
