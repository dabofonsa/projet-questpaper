import React from "react";
import CountUp from "react-countup";

const Join = () => {
  return (
    <div className="flex flex-col text-center p-2 bg-gray-800 text-white">
      <h1 className="p-2 text-2xl font-bold sm:p-5">Rejoignez Nous Dès Aujourd'hui</h1>

      <div className=" p-4 flex flex-col sm:flex-row justify-around sm:p-8">
        <div className="p-3">
          <p className="text-3xl font-bold">
            <CountUp end={50} duration={2} />+
          </p> 
          <p>Nouveaux Utilisateurs Journalier</p>
        </div>

        <div className="p-3">
          <p className="text-3xl font-bold">
            <CountUp end={60} duration={2} />+ 
          </p>
          <p>Experts A votre Service</p>
        </div>

        <div className="p-3">
          <p className="text-3xl font-bold">
            <CountUp end={100} duration={1.8} />%
          </p>
          <p>De Nos clients Satisfaits</p>
        </div>
      </div>
    </div>
  );
};

export default Join;
