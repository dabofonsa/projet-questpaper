import React, { useState, useEffect } from "react";
import Doc from "../doc/formulaire.pdf";
import Viewer from "../components/Viewer";
import { Link } from "react-router-dom";
import axios from "axios";

const Secondary = () => {
  const [docs, setDoc] = useState([]);
  const [year, setYear] = useState();
  const [domaine, setDomaine] = useState("");
  const [subscribed, setSubscribed] = useState(false);


  const token = localStorage.getItem("questoken");

  const [data, setdata] = useState()


  //const mydecodedtoken = useJwt(token);

  const decodetoken = (token) =>{
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    //console.log(JSON.parse(jsonPayload).data);
    setdata(JSON.parse(jsonPayload).data);
  }

  useEffect(async() => {  
   if(token){
     decodetoken(token)
   }
 
  },[])


const getSubscriptionData = async(id) =>{
  await axios.get( `http://localhost:5000/api/user/transaction/${id}`).
  then((res) => {if(res){
    setSubscribed(true)
  } })
}



  const getdocs = async () => {
    if (domaine && year) {
      const result = await axios.get(
        `http://localhost:5000/api/user/files/${domaine}/${year}`
      );
      setDoc(result.data);
    }
  };

  const getAlldocs = async () => {
    const result = await axios.get(`http://localhost:5000/api/user/files`);

    if (result.data) {
      setDoc(result.data);
    } else {
      setDoc({ data: "no data found" });
    }
  };

  const getBydomaine = async () => {
    const result = await axios.get(
      `http://localhost:5000/api/user/secteur/${domaine}`
    );
    if (result.data) {
      setDoc(result.data);
    } else {
      setDoc({ data: "no data found" });
    }
  };

  const getByYear = async () => {
    if (year) {
      const result = await axios.get(
        `http://localhost:5000/api/user/annee/${year}`
      );
      if (result.data) {
        setDoc(result.data);
      } else {
        setDoc({ data: "no data found" });
      }
    }
  };

  useEffect(() => {
    if (year && domaine) {
      getdocs();
    }
  }, [year, domaine]);

  useEffect(() => {
    if (!year && !domaine) {
      getAlldocs();
    }
  }, []);

  useEffect(() => {
    getBydomaine();
  }, [domaine]);

  useEffect(() => {
    getByYear();
  }, [year]);



  useEffect(async() =>{
if(data){
  const id = await(data.user_id)
  getSubscriptionData(id)
}
  },[data])

  return (
    <div className="flex m-3  flex-col items-center  min-h-screen ">
      <div className="relative flex sm:flex-col min-h-1/2  w-full m-4 p-5">
        <Link
          className="w-1/5 flex justify-center sm: absolute  left-2  -top-4 p-3 bg-gray-400 hover:bg-gray-200"
          to="/upload"
        >
          <div className="flex text-sm">
            <p>Upload</p>
          </div>
        </Link>
        {subscribed ? (
          <Link
            className="w-1/5 flex justify-center sm: absolute  right-2  -top-4 p-3   bg-gray-400 hover:bg-gray-200"
            to="/corriger"
          >
            <div className="flex text-sm">
              <p>Corriger</p>
            </div>
          </Link>
        ) : (
        <div></div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row w-full p-3 mb-8 bg-gray-800 text-white justify-evenly">
        <div>
          <p className="font-bold">Filtrer Par:</p>
        </div>
        <div className="flex flex-col ">
          <label className="font-bold p-2" htmlFor="adresse">
            Année d'etude:
          </label>
          <select
            onChange={(e) => setYear(e.target.value)}
            className="p-2 text-black"
            id="year"
            name="year"
          >
            <option value="none" selected disabled hidden>
              -------Sélectionner----------
            </option>
            <option value="1">License 1</option>
            <option value="2">License 2</option>
            <option value="3">License 3</option>
            <option value="4">Master 1</option>
            <option value="5">Master 2</option>
          </select>
        </div>

        <div className="flex flex-col ">
          <label className="font-bold p-2" htmlFor="Specialite">
            Specialite:
          </label>
          <select
            onChange={(e) => setDomaine(e.target.value)}
            className="p-2 text-black "
            id="specialite"
            name="specialite"
            required
          >
            <option value="none" selected disabled hidden>
              -------Sélectionner----------
            </option>
            <option value="anglais">Anglais</option>
            <option value="informatique">Informatique</option>
            <option value="biologie">Biologie</option>
            <option value="commerce">commerce</option>
            <option value="droit">Droit</option>
          </select>
        </div>
      </div>

      <div className="relative  min-h-screen ">
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          {docs ? (
            docs.map((doc) => (
              <Viewer
                key={doc.sujet_id}
                id={doc.sujet_id}
                Doc={`https://questpaper-subjects.s3.eu-west-3.amazonaws.com/${doc.nom_sujet}`}
              />
            ))
          ) : (
            <h1>No data found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Secondary;
