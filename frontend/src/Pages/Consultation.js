import axios from "axios";
import React, { useState, useEffect } from "react";
import Rexplorer from "../components/Rexplorer";

const Consultation = () => {
  const [data, setData] = useState();


  const getData = async () => {
    const req = await axios.get("http://localhost:5000/api/user/consulter");
    const res = req.data;
    if(res){
        setData(res)
    }
    //console.log(res)
  };

  useEffect(async () => {
    getData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-col place-items-center">
        <h1 className="p-3 text-2xl font-bold">Demande Pour Role Enseignant</h1>
      </div>
       <Rexplorer request = {data}/>
    </div>
  );
};

export default Consultation;
