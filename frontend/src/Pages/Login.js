import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";


//importing my action for the situation

import { situation } from "../features/Login";

const Login = () => {
 
  //To implement the user redirection fonctionality

  let history = useHistory();

  const dispatch = useDispatch();

  //getting login data through react hook forms and setting it using usestate
  const [logindata, setLoginData] = useState();

  //Dealing with the response i get back from the server after the login phase
  const [message, setMessage] = useState("");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => setLoginData(data);

  //https://questpaper.herokuapp.com/api/user/login

  const postLoginData = async () => {
    try {
      const email = await logindata.email;
      const password = await logindata.password;

      axios
        .post("http://localhost:5000/api/user/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.data.serverRes === "success") {
            dispatch(situation(true));
            localStorage.setItem("questoken", response.data.token);
            Cookies.set("loggedIn", "true");
            // const token = localStorage.getItem("token");
            // dispatch(tokenstate(token));
            history.push("/secondary");
          } else {
            console.log(response.data.message)
            setMessage(response.data.message);
            history.push("/login");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (logindata) {
      postLoginData();
    }
  }, [logindata]);

  return (
    <div className="flex relative flex-col p-4 items-center min-h-screen dark:bg-black">
      <div className=" shadow-lg m-auto">
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
          className="flex flex-col bg-white p-8 justify-center min-h-full "
        >
          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="email">
              Email:
            </label>
            <input
              className="p-1 sm:p-2 border-2 w-full"
              {...register("email")}
              required
              type="email"
              name="email"
            />
          </div>

          <div className="flex flex-col ">
            <label className="font-bold p-2" htmlFor="password">
              Password:
            </label>
            <input
              className="p-1 sm:p-2  border-2 w-full"
              {...register("password")}
              required
              type="password"
              name="password"
            />
          </div>

          <input
            className="cursor-pointer mx-auto my-3 bg-gray-900 text-white p-3"
            type="submit"
            value="Se connecter"
          />

          <p className="p-4 font-cookie text-xl text-center">
            Pas Encore Inscrit?{" "}
            <span className="text-green-800 hover: cursor-pointer hover:text-red-800">
              <Link exact to="register">
                Inscrivez-vous Maintenant.
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
