/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import axios from 'axios'

const home = () => {
  const [dishes, setDishes] = useState([]);
  const [savedItem, setsavedRecipie] = useState();
  const [savedId, setsavedId] = useState();
  useEffect(()=>{
    const fetchDishes = async () => {
      try {
        const recipies = await axios.get("http://localhost:3000/recipies/getAllRecipie");
        setDishes(recipies.data);
        console.log(recipies.data);
      } catch (error) {
        console.log(error);
      }
    }

    const getSavedRecipie = async () => {
      try {
        const userID = window.localStorage.getItem("userID");
        const response = await axios.get(`http://localhost:3000/recipies/getSavedRecipies/${userID}`);
        setsavedRecipie(response.data.savedRecipies);
        console.log(response.data.savedRecipies);
        // savedItem?.map((item)=>{
        //   return setsavedId(...savedId, item._id)
        // })
      } catch (error) {
        console.log(error);
      }
    };
    fetchDishes();
    getSavedRecipie();
  },[])

  const handleSave = async (recipieID) => {
    try {
      const userID = window.localStorage.getItem("userID");
      const myObj = {
        recipieID,
        userID
      }
      console.log(myObj);
      const response = await axios.post("http://localhost:3000/recipies/save", myObj);
      console.log(window.localStorage.getItem("userID"));
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul className="flex flex-col gap-8 items-center my-8">
      {
        dishes?.map((dish)=>{
          const savedItemMatch = savedItem?.find((savedItem) => savedItem._id === dish._id);
          return <li key={dish._id} className="shadow-md p-6">
            <div>
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="text-5xl text-green-500">{dish.name}</h2>
                  <p className="text-2xl">{`Steps: ${dish.instructions}`}</p>
                </div>
                {savedItemMatch?<button className="border-2 w-16 h-8 bg-gray-300 text-white rounded">Saved</button>:<button onClick={()=>handleSave(dish._id)} className="border-2 border-green-800 w-16 h-8 bg-green-500 text-white rounded hover:text-green-800 hover:bg-white">Save</button>}
              </div>
              <div>
                <img className="rounded w-[600px] h-[450px]" src={dish.imageURL} alt="A dish" />
              </div>
              <div>
                <p className="m-2 text-xl">{`Cooking Time : ${dish.cookingTime}mins`}</p>
              </div>
            </div>
          </li>
        })
      }
      </ul>
    </div>
  )
}

export default home
