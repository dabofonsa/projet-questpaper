import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Scrollchor } from "react-scrollchor";
import { useSelector } from "react-redux";

const Dropdown = ({showSidenav}) => {
  const loginStatus = useSelector((state) => state.login.value);



  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/";
    showSidenav()
  };

  

  return (
      <div className=" absolute flex min-h-3/4 flex-col top-12 p-3  w-1/2 right-0 z-10 bg-gray-800 opacity-1">
      
    <ul className={"p-3 relative h-full bg-transparent flex flex-col justify-evenly space-y-6 text-center items-center text-white"}>
      <li
        className="hover: cursor-pointer hover:text-red-200 "
      >
        <Scrollchor to="#hero">
          <Link onClick={showSidenav}  to="/">Home</Link>
        </Scrollchor>
      </li>

      {loginStatus && (
        <li className="hover: cursor-pointer hover:text-red-200">
          <Scrollchor to="#about">
            <Link onClick={showSidenav} exact to="/secondary">
              Chercher et Telecharger
            </Link>
          </Scrollchor>
        </li>
      )}

      {!loginStatus && (
        <li className={`hover: cursor-pointer hover:text-red-200`}>
          <Scrollchor to="#about">
            <Link onClick={showSidenav} exact to="/">
              A propos
            </Link>
          </Scrollchor>
        </li>
      )}

      {loginStatus && (
        <li className="hover: cursor-pointer hover:text-red-200">
          <Scrollchor to="#about">
            <Link onClick={showSidenav} exact to="/profile">
              Profile
            </Link>
          </Scrollchor>
        </li>
      )}

      {loginStatus && (
        <li className="hover: cursor-pointer hover:text-red-200">
          <Scrollchor to="#about">
            <Link onClick={showSidenav} exact to="/offers">
              Offers
            </Link>
          </Scrollchor>
        </li>
      )}

      {loginStatus && (
        <li className="hover: cursor-pointer hover:text-red-200">
          <Scrollchor to="#about">
            <Link onClick={showSidenav} exact to="/membership">
              Souscription
            </Link>
          </Scrollchor>
        </li>
      )}

      {!loginStatus && (
        <li className="hover: cursor-pointer hover:text-red-200">
          <Scrollchor to="#about">
            <Link onClick={showSidenav} exact to="/">
              Nos Services
            </Link>
          </Scrollchor>
        </li>
      )}

      {!loginStatus && (
        <li className="hover: cursor-pointer hover:text-red-200">
          <Scrollchor to="#contact">
            <Link onClick={showSidenav} exact to="/">
              Contact
            </Link>
          </Scrollchor>
        </li>
      )}

      {!loginStatus && (
        <li className="flex hover: cursor-point ser hover:text-red-200">
          <Link onClick={showSidenav} className="flex" exact to="/login">
            Se Connecter
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </Link>
        </li>
      )}

      {loginStatus && (
        <li 
          onClick={logOut}
          className="flex hover: cursor-pointer hover:text-red-200"
        >
          Se Deconnecter
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </div>
        </li>
      )}
    </ul>
    </div>
  );
};

export default Dropdown;
