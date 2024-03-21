import { useEffect, useState } from "react"
import axios from 'axios'

const Saved_recipie = () => {
  const [savedItems, setsavedRecipie] = useState([]);
  useEffect(()=>{
    const getSavedRecipie = async () => {
      try {
        const userID = window.localStorage.getItem("userID");
        const response = await axios.get(`http://localhost:3000/recipies/getSavedRecipies/${userID}`);
        setsavedRecipie(response.data.savedRecipies);
        console.log(response.data.savedRecipies);
      } catch (error) {
        console.log(error);
      }
    };
    getSavedRecipie();
  },[])

  return (
    <div>
      <ul className="flex flex-col gap-8 items-center my-8">
      {
        savedItems?.map((dish)=>{
          console.log(dish._id);
          return <li key={dish._id} className="shadow-md p-6">
            <div>
              <div className="flex flex-row justify-between">
                <div>
                  <h2 className="text-5xl text-green-500">{dish.name}</h2>
                  <p className="text-2xl">{`Steps: ${dish.instructions}`}</p>
                </div>
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

export default Saved_recipie
