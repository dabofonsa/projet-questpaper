import axios from "axios";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useJwt } from "react-jwt";

const Uploadcore = () => {



  const [donneeform, setDonneeForm] = useState([]);

  const [idcorriger, setIdcorriger] = useState()

  const [upconfirm, setupConfirm] = useState();

  const [filename, setFilename] = useState("..");

  //file data to be appended
  const [file, setFile] = useState();

  //level and speciality data

  const [specialite, setSpecialite] = useState();
  const [level, setLevel] = useState();

  const { register, handleSubmit , reset} = useForm();
  const onSubmit = (data) => {
    setDonneeForm(data)
    
    //reset();
  };



  const getIdcorriger = async() =>{
      await axios.get('http://localhost:5000/api/user/idsujet').then((res) =>
       setIdcorriger(res.data.result))
  }



useEffect(() =>{
    getIdcorriger()
}, [])




  const [tokenvalue, setToken] = useState();
  const { decodedToken, isExpired } = useJwt(tokenvalue);

  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [updata, setUpdata]= useState('');

  const sendData = async (formData) => {
    try {
      const options = {
        onUploadProgress: (ProgressEvent) => {
          const { loaded, total } = ProgressEvent;
          let percent = Math.floor((loaded * 100) / total);
          setUpdata(`${loaded}kb of ${total}kb| ${percent}`);
          if (percent < 100) {
            setUploadPercentage(percent);
          }else if(percent = 100){
            //history.push('/secondary');
          }
        },
      };
     
 
      await axios
        .post("http://localhost:5000/api/user/upload/corriger", formData, options)
        .then((res) => setupConfirm(res.data.message), reset)
        .catch((err) => console.log(err));
      setUploadPercentage(100, () => {
        setTimeout(() => {
          setUploadPercentage(0);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(uploadPercentage);

  useEffect(async () => {
    try {
      if (donneeform) {
        const { user_email} = await decodedToken.data;
        console.log(donneeform.file[0]);
        setFilename(donneeform.file[0].name);
        setFile(donneeform.file[0]);
        setLevel(donneeform.year);
        setSpecialite(donneeform.specialite);

        const formData = new FormData();

        formData.append("name", filename);

        formData.append("user_email", user_email);

        formData.append("subject", file);

        formData.append("year", level);

        formData.append("domaine", specialite);

        sendData(formData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [donneeform]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

    return (
        <div className="h-screen p-4 lg:w-1/2 mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-full p-2 flex flex-col justify-evenly"
      >
        <p className="text-green-800 text-xl">{upconfirm}</p>
       
        <div className="flex flex-col ">
          <label htmlFor="Specialite">Id sujet:</label>
          <select
            {...register("specialite")}
            className="p-2 bg-gray-500 text-white"
            id="specialite"
            name="specialite"
            required
          >
            <option value="none" selected disabled hidden>
              Selectionnez l'id du sujet
            </option>
            {
                idcorriger && idcorriger.map(item => 
                <option value={item.id_sujet}>{item.sujet_id}</option>
                )
            }
          </select>
        </div>

        <div className="relative h-2/6 flex flex-col ">
          <input
            className="p-2 shadow-lg cursor-pointer h-5/6 text-white border-2 border-dotted border-gray-300"
            type="file"
            accept=".pdf"
            name="subject"
            {...register("file")}
            required
          />
          <label htmlFor="filelabel">{filename}</label>
        </div>
        {/* progress bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-gray-800">
                {uploadPercentage}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
            <div
              style={{ width: `${uploadPercentage}%`}}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-800"
            ></div>
          </div>
          {updata}
        </div>
        <input
          className="p-3 cursor-pointer bg-gray-200 m-3 hover:bg-gray-600"
          type="submit"
          value="Upload"
        />
      </form>
    </div>
    )
}

export default Uploadcore
