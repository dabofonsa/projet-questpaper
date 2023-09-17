import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from 'react-icons/fa'

const Failed = () => {
  return (
    <div className="h-screen flex  flex-col justify-center text-center items-center ">
      <FaCheckCircle className="h-10 text-red-800 bg-white w-10" />
      <h1 className="text-3xl p-3">Echec De la transaction</h1>
      <Link
        className="bg-gray-800 text-white p-3 hover:bg-gray-600"
        to="/membership"
      >
        {" "}
        Retourner au choix de Votre Plan.
      </Link>
    </div>
  );
};

export default Failed;
