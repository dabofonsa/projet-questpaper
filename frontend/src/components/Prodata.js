import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Prodata = ({ decodedToken }) => {
  const [Loading, setloading] = useState(true);
  const [disabled, setDisabled] = useState(false)
  const [ teacher, setIsteacher] = useState (false)

  useEffect(() => {
    if (decodedToken) {
      setloading(false);
      //console.log(await decodedToken)
      if(decodedToken.role === 'enseignant'){
        setIsteacher(true)
      }
    }
  }, [decodedToken]);

const sayHi = async() =>{

  if(decodedToken){
    await axios.post("http://localhost:5000/api/user/demande", decodedToken).then(res =>console.log(res))
  }

  console.log("hi")
  setDisabled(true)
}



  return Loading ? (
    <Loader />
  ) : (
    <div className="relative min-h-screen w-2/3 mx-auto flex justify-center flex-col p-4">
       <Link to="/upcorriger">
      <div className="w-full">
      {teacher ?   <div className="absolute top-2 right-0   " > 

           <button disabled={disabled} onClick={sayHi} className="bg-gray-800 text-white p-3 cursor-pointer hover:bg-gray-400">
             Add Corriger
           </button>
         </div> : <div></div>}
      </div>
       </Link>
         
      <div className="flex flex-col text-3xl p-3 items-center  justify-center border-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-evenly border-2 h-full p-5">
        <div className="min-w-2/3">
          <div className="flex flex-col sm:flex-row text-center justify-between w-full p-3">
            <label className="font-bold ">Identifiant Unique:</label>
            <p className="">{decodedToken.user_id}</p>
          </div>
          <div className="flex flex-col sm:flex-row text-center justify-between w-full p-3">
            <label className="font-bold ">NOM & Prenom: </label>
            <p className="">
              {decodedToken.user_sirname} {decodedToken.user_name}{" "}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row text-center justify-between w-full p-3">
            <label className="font-bold">Email:</label>
            <p className="">{decodedToken.user_email}</p>
          </div>
          <div className="flex flex-col sm:flex-row text-center justify-between w-full p-3">
            <label className="font-bold">Role:</label>
            <p className="text-green-400">{decodedToken.role}</p>
          </div>

          <div className="flex flex-col sm:flex-row text-center justify-between w-full p-3">
            <label className="font-bold">Staut de Votre Souscription:</label>
            <p className="">undefined</p>
          </div>

        
         <div className="flex  justify-self-center">
            <button disabled={disabled} onClick={sayHi} className="mx-auto bg-green-500 p-3 cursor-pointer hover:bg-green-400">
              Devenir Enseignant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prodata;
