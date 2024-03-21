/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const create = () => {
  const [dish, setDish] = useState({
    name:"",
    ingridients:[],
    instructions:"",
    imageURL:"",
    cookingTime:0,
    userOwner:window.localStorage.getItem("userID"),
  })

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setDish({...dish, [name]:value});
  }
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/recipies/create", dish);
      alert("Recipie 🫕 Created ✅");
      setDish({
        name:"",
        ingridients:[],
        instructions:"",
        imageURL:"",
        cookingTime:0,
        userOwner:window.localStorage.getItem("userID"),
      })
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleIngridientChange = (e,idx)=>{
    const { value } = e.target;
    const ingridients = dish.ingridients;
    ingridients[idx] = value;
    setDish({...dish, ingridients});
  }

  const AddIngridients = () => {
    setDish({...dish, ingridients:[...dish.ingridients,""]});
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="flex flex-col mx-auto border-2 shadow-lg w-[35%] p-5 gap-4 mt-6">
      <p className="text-4xl text-center font-bold">Create Recipie</p>
      <div className="flex flex-col gap-2">
        <label className="text-2xl ml-3">Name :</label>
        <input value={dish.name} onChange={handleChange} name="name" type="text" className="border-2 border-black ml-3 rounded p-1 text-xl" />
      </div>
      <div className="flex flex-col">
        <label className="text-2xl ml-3">Ingridients : </label>
        {
          dish.ingridients.map((ingridient,idx)=>{
            return <input value={ingridient} key={idx} onChange={(e)=> handleIngridientChange(e,idx)} type="text" name="ingridients" className="border-2 border-black ml-3 rounded p-1 text-xl mb-2" placeholder={`Item ${idx+1}`} />
          })
        }
        <button type="button" onClick={AddIngridients} className="border-2 border-black bg-gray-300 ml-3 mt-4 rounded w-[98%]">Add Ingridients</button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl ml-3">Instructions : </label>
        <textarea value={dish.instructions} onChange={handleChange} name="instructions" className="border-2 border-black ml-3 rounded p-1 text-xl"></textarea>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl ml-3">Image URL : </label>
        <input value={dish.imageURL} onChange={handleChange} type="text" name="imageURL" className="border-2 border-black ml-3 rounded p-1 text-xl" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl ml-3">Cooking Time(min) : </label>
        <input value={dish.cookingTime} onChange={handleChange} type="number" name="cookingTime" className="border-2 border-black ml-3 rounded p-1" />
      </div>
      <button className="border-2 border-black ml-3 p-1 mt-4 bg-black text-white hover:bg-white hover:text-black rounded w-[98%]">Create Recipie</button>
    </div>
    </form>
  )
}

export default create
