import React,{useState, useEffect} from "react";
import axios from "axios";

const Membership = () => {

  const token = localStorage.getItem("questoken");

  const [data, setdata] = useState()


  //const mydecodedtoken = useJwt(token);

  const decodetoken = (token) =>{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    console.log(JSON.parse(jsonPayload).data);
    setdata(JSON.parse(jsonPayload).data);
  }

  useEffect(async() => {  
   if(token){
     decodetoken(token)
   }
 
  },[])
  

  const getPlan = async(id) => {
    if(await data){
         axios
         .post("http://localhost:5000/api/user/payer", { value: id , user: data.user_id})
         .then((res) => {
           if (res.status === 200) {
             const url = res.data.url;
             window.location = url;
           }
         })
         .catch((error) => console.log(error.message));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center p-4  ">
        <div className="flex m-1 flex-col shadow-sm p-3 border-solid border-4 w-2/4 justify-evenly min-h-1/2 text-center">
          <h1 className="text-3xl p-1 font-bold ">1 Mois</h1>
          <h1 className="text-green-800 text-xl p-1">20 €</h1>
          <p className="p-2">
            Acces illimite au sujets ainsi que leurs corrections
          </p>
          <button
            onClick={(e) => getPlan(1)}
            className="bg-green-300 p-2 font-bold cursor-pointer hover:bg-green-100"
          >
            Souscrire
          </button>
        </div>

        <div className="flex m-1 flex-col shadow-sm p-3 border-solid border-4 w-2/4 justify-evenly min-h-1/2 text-center">
          <h1 className="text-3xl p-1 font-bold ">3 Mois</h1>
          <h1 className="text-green-800 text-xl p-1">70€</h1>
          <p className="p-2">
            Acces illimite au sujets ainsi que leurs corrections
          </p>
          <button
            onClick={(e) => getPlan(2)}
            className="bg-green-300 p-2 font-bold cursor-pointer hover:bg-green-100"
          >
            Souscrire
          </button>
        </div>

        <div className="flex m-1 flex-col shadow-sm p-3 border-solid border-4 w-2/4 justify-evenly min-h-1/2 text-center">
          <h1 className="text-3xl p-1 font-bold ">6 Mois</h1>
          <h1 className="text-green-800 text-xl p-1">120€</h1>
          <p className="p-2">
            Acces illimite au sujets ainsi que leurs corrections
          </p>
          <button
            onClick={(e) => getPlan(3)}
            className="bg-green-300 p-2 font-bold cursor-pointer hover:bg-green-100"
          >
            Souscrire
          </button>
        </div>

        <div className="flex m-1 flex-col bg-gray-600 text-white p-3 border-solid border-4 w-2/4 justify-evenly min-h-1/2 text-center">
          <h1 className="text-3xl p-1 font-bold ">1 Ans</h1>
          <h1 className="text-red-800 text-xl p-1">200€</h1>
          <p className="p-2">
            Acces illimite au sujets ainsi que leurs corrections
          </p>
          <button
            onClick={(e) => getPlan(4)}
            className="bg-green-300 p-2 font-bold cursor-pointer hover:bg-green-100"
          >
            Souscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
