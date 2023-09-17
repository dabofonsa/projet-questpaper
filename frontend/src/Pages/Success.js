import React, { useState, useEffect }  from "react";
import { FaCheckCircle } from 'react-icons/fa'
import { Link } from "react-router-dom";
import Loader from "../components/Loader";



const Success = () => {



    const token = localStorage.getItem("questoken");
    const [Loading, setloading] = useState(true);

    const [data, setdata] = useState()
  
  
    //const mydecodedtoken = useJwt(token);
  
    const decodetoken = (token) =>{
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      console.log(JSON.parse(jsonPayload).data);
      setloading(false)
      setdata(JSON.parse(jsonPayload).data);
    }
  
    useEffect(async() => {  
     if(token){
       decodetoken(token)
     }
    },[])
    


  return (
    Loading?<Loader/> :
    <div className="h-screen flex  flex-col justify-center text-center items-center ">
        <h1 className="flex p-2">Merci <div>&nbsp;</div><span className=" block font-bold">{data.user_sirname} {data.user_name}</span><div>&nbsp;</div> Pour votre Souscription</h1>
     <FaCheckCircle className="h-10 text-green-800 bg-white w-10"/>
      <h1 className="text-3xl p-3">Success</h1>
      <Link className="bg-gray-800 text-white p-3 hover:bg-gray-600" to="/secondary"> Continuer à Chercher des Sujets.</Link>
    </div>
  );
};

export default Success;
