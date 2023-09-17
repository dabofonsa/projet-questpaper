import React, { useState, useEffect } from "react";
import Prodata from "../components/Prodata";

const Profile = () => {

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
  

  return (
    <div className="">
      <Prodata  decodedToken={data} />
    </div>
  );
};

export default Profile;
