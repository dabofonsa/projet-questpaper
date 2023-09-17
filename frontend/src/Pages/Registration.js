import React, { useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";





const Registration = () => {
  const [userData, setUserData] = useState();
  
  const [message, setMessage] = useState("");
  
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => setUserData(data);
  
  let history = useHistory();
  
  
  const postData = async () => {
    if (userData) {
      console.log(userData)
      const name = await userData.name;
      const sirname = await userData.sirname;
      const email = await userData.email;
      const password = await userData.password;
      const confirmPassword = await userData.pwdrepeat;
      const year = await userData.year;

      axios
        .post("http://localhost:5000/api/user/inscrire", {
          sirname: sirname,
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          year: year,
        })
        .then((response) => {
          setMessage(response.data);
         if(response.status == 200){
            history.push('/login')
         }
        });
    }
  };

  useEffect(() => {
    postData();
  }, [userData]);

  return (
    <div className="flex relative flex-col p-4 items-center min-h-screen  dark:bg-black">
      <div className="shadow-lg m-auto">
      <div className="flex flex-col p-3 bg-gray-500 w-full text-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" w-1/4 text-white  self-center"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        </div>
        <h1 className="text-red-800 text-center">{message}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col  bg-white p-8 justify-center min-h-full "
        >
          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="adresse">
              Année d'etude:
            </label>
            <select {...register('year')} className="p-2" id="year" name="year">
              <option value="1">License 1</option>
              <option value="2">License 2</option>
              <option value="3">License 3</option>
              <option value="4">Master 1</option>
              <option value="5">Master 2</option>
            </select>
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="name">
              Sirname:
            </label>
            <input
              className="p-2 border-2 w-full"
              {...register("sirname")}
              type="text"
              name="sirname"
            />
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="name">
              Name:
            </label>
            <input
              className="p-2 border-2 w-full"
              {...register("name")}
              type="text"
              name="name"
            />
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="email">
              Email:
            </label>
            <input
              className="p-2 border-2 w-full"
              {...register("email")}
              type="email"
              name="email"
            />
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="password">
              Mot de Passe:
            </label>
            <input
              className="p-2 border-2 w-full"
              {...register("password")}
              type="password"
              name="password"
            />
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="password">
              Confirmez le Mot de passe:
            </label>
            <input
              className="p-2 border-2 w-full"
              {...register("pwdrepeat")}
              type="password"
              name="pwdrepeat"
            />
          </div>

          <input
            className="cursor-pointer mx-auto mt-3 bg-gray-900 text-white p-3"
            type="submit"
            value="S'inscrire"
          />

          <p className="p-5 font-cookie text-xl text-center">
            Pas Encore Inscrit?
            <span className="text-green-800 hover: cursor-pointer hover:text-red-800">
              <Link to="/login"> Connectez-vous Maintenant.</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
