import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Loader from "./Loader";

const Rexplorer = ({ request }) => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState();
  const [validate, setValidate] = useState()
  const [supprimer, setSupprimer] = useState()

  const provideData = (donn) => {
    setData(donn.result);
    console.log(donn.result);
  };



  const  getConfirmer = async(e) =>{
      const id = await e.target.id
       setValidate(id)
  }

  const  getAnnuler = async(e) =>{
    const id = await e.target.id

    setSupprimer(id)

    if(supprimer){
        console.log(supprimer)
    }
}



  useEffect(async() =>{
      
      if(validate){
          console.log(validate)
       axios.post(`http://localhost:5000/api/user/upvalidate/${validate}`).
       then(res =>console.log(res))
      }
  }, [validate])



  useEffect(async() =>{
    console.log("i fire rtwo")
}, [supprimer])


  useEffect(() => {
    if (request) {
      provideData(request);
      setisLoading(false);
    }
  }, [request]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-w-full overflow-x-auto"> 
      <table class="relative min-w-full  mx-auto sm:w-2/3">
        <thead className="border-2" >
          <tr className="justify-center">
            <th className="border-2 p-2">id_demande</th>
            <th className="border-2 p-2">Nom</th>
            <th className="border-2 p-2">Prenom</th>
            <th className="border-2 p-2">Confirmer</th>
            <th className="border-2 p-2">Refuser</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.user_id} className="border-2 ">
              <td className="text-center">
                {item.id_demande}
              </td>
              <td className="text-center ">
                {item.user_name}
              </td>
              <td className="text-center">
                {item.user_sirname}
              </td>
              <td className="text-center ">
                <button id={item.user_id} onClick={e => getConfirmer(e)} className="bg-green-500 p-2 cursor-pointer hover:bg-green-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </td>
              <td className="text-center " key="">
                <button id={item.user_id} onClick={e => getAnnuler(e)}  className="bg-red-500 p-2 cursor-pointer hover:bg-red-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rexplorer;
