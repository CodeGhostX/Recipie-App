/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/auth/login",{username, password})
    .then(result => {
      console.log(result.data);
      if(result.data.success === true){
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID",result.data.userID);
        alert("Login Successfully ✅");
        navigate("/");
      }
    })
    .catch(err=>console.log(err));
    setPassword("");
    setUsername("");
  }

  return (
    <div className="p-5 m-5 w-[21%] mt-48 ml-24 shadow-sm shadow-black scale-125">
      <p className="text-4xl ml-3">Login</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <div className="">
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

export default Login
