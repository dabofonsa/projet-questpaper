import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Viewer from "../components/Viewer";
import axios from 'axios';

const Corriger = () => {
     


    const[value, setValue] = useState()
    const [docs, setDoc] = useState([]);

    const getAlldocs = async () => {
      try {
        console.log(value)
        const result = await axios.get(`http://localhost:5000/api/user/correction/single/${value}`);
        if (result.data.result[0]) {
          console.log(result)
          setDoc(result.data.result[0]);
        } else {
          setDoc("");
        }
      } catch (error) {
        console.log(error)
      }
      };


      useEffect(() =>{
        if(value){
          getAlldocs()
        }
      },[value])
    

    return (
        <div className="flex m-3  flex-col items-center  min-h-screen ">
      
  
        <div className="flex flex-col sm:flex-row w-full p-3 mb-8 bg-gray-800 text-white justify-evenly">
          <div>
            <p className="font-bold">Filtrer Par:</p>
          </div>
          <div className="flex flex-col ">
            <label className="font-bold p-2" >
              Id unique du Sujets:
            </label>
            <input
             placeholder="Renseignez l'id du sujet (ex:  200)"
              className="text-black p-1 sm:p-2  border-2 w-full"
              onChange={e => setValue(e.target.value)}
              type="number"
            />
          </div>
        </div>
  
        <div className="relative  min-h-screen ">
          {docs ?
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
           
                <Viewer
                  key={docs.sujet_id}
                  id={docs.sujet_id}
                  Doc={`https://questpaper-subjects.s3.eu-west-3.amazonaws.com/${docs.nom_correction}`}
                />
          </div> : <div className="h-screen"><h1>Pas de corriger disponible</h1></div>
}
        </div>
      </div>
    )
}

export default Corriger
