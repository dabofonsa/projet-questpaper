import React, { useState} from "react";
import { Link } from "react-router-dom";
import { Scrollchor } from "react-scrollchor";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import Dropdown from "./Dropdown";

const Nav = () => {
  const loginStatus = useSelector((state) => state.login.value);

  const [click, setClick] = useState(false);

  const showSidenav = () => {
    setClick(!click);
    console.log(click)
  }
  
 

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
        <div className="flex bg-gray-800 flex-wrap place-items-center sticky z-10 top-0 p-4 justify-between text-white">
          <div>
            <Scrollchor to="#hero">
              <Link exact to="/">
                <h1 className="flex-1 font-cookie text-3xl">QuestPaper</h1>
              </Link>
            </Scrollchor>
          </div>

          {isMobile && click ?
        <Dropdown showSidenav={showSidenav} /> : 
        
        <ul className={"relative hidden sm:flex  space-x-2 text-center items-center"}>
        <li className="hover: cursor-pointer hover:text-red-200 ">
          <Scrollchor to="#hero">
            <Link to="/">Home</Link>
          </Scrollchor>
        </li>

        {loginStatus && (
          <li className="hover: cursor-pointer hover:text-red-200">
            <Scrollchor to="#about">
              <Link exact to="/secondary">
                Chercher et Telecharger
              </Link>
            </Scrollchor>
          </li>
        )}

        {!loginStatus && (
          <li className={`hover: cursor-pointer hover:text-red-200`}>
            <Scrollchor to="#about">
              <Link exact to="/">
                A propos
              </Link>
            </Scrollchor>
          </li>
        )}

        {loginStatus && (
          <li className="hover: cursor-pointer hover:text-red-200">
            <Scrollchor to="#about">
              <Link exact to="/profile">
                Profile
              </Link>
            </Scrollchor>
          </li>
        )}

        {loginStatus && (
          <li className="hover: cursor-pointer hover:text-red-200">
            <Scrollchor to="#about">
              <Link exact to="/offers">
                Offers
              </Link>
            </Scrollchor>
          </li>
        )}

        {loginStatus && (
          <li className="hover: cursor-pointer hover:text-red-200">
            <Scrollchor to="#about">
              <Link exact to="/membership">
                Souscription
              </Link>
            </Scrollchor>
          </li>
        )}

        {!loginStatus && (
          <li className="hover: cursor-pointer hover:text-red-200">
            <Scrollchor to="#about">
              <Link exact to="/">
                Nos Services
              </Link>
            </Scrollchor>
          </li>
        )}

        {!loginStatus && (
          <li className="hover: cursor-pointer hover:text-red-200">
            <Scrollchor to="#contact">
              <Link exact to="/">
                Contact
              </Link>
            </Scrollchor>
          </li>
        )}

        {!loginStatus && (
          <li className="flex hover: cursor-point ser hover:text-red-200">
            <Link className="flex" exact to="/login">
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
       }
          <div
            className="m-1 flex text-center items-center sm:hidden"
            onClick={showSidenav}
          >
            <svg  onClick={showSidenav}
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
  );
};

export default Nav;
