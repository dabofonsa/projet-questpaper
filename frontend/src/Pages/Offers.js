import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import { useForm } from "react-hook-form";

const Offers = () => {
  const [search, setSearch] = useState('frontend');
  const [offers, setOffers] = useState();
  const [loading, setisLoading] = useState(true);

  const { register, handleSubmit} = useForm();
  const onSubmit = data => setSearch(data.searchitem);



  const getData = async () => {
    const req = await axios.get(
      `https://api.adzuna.com/v1/api/jobs/fr/search/8?app_id=a8d2c594&app_key=16b7abd53d888e1013c9c8735e92b9af&title_only=${search}`,
    );

    const res = await req.data;
    if (res) {
      setisLoading(false);
      setOffers(res.results);
      //console.log(offers)
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (loading?<Loader/> :
    <div className="min-h-screen m-4 p-4 sm:w-3/3 mx-auto  flex flex-col justify-items-center">
      <div className="flex flex-col items-center text-center justify-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-2/3 p-3 my-4 mx-1  sm:mx-auto w-full sm:w-1/2 shadow-md  bg-gray-100 justify-center">
        <input placeholder="Entrer un mot cle(ex: chauffeur , electricien etc...)" {...register("searchitem")}  className="w-2/3 p-2 outline-none " type="text" />
        <input
          className="p-2 cursor-pointer bg-gray-700 hover:bg-gray-500 text-white"
          type="submit"
          name="Search"
          value="Search"
        />
      </form>
        {offers?.map(item => (
           <div className="flex flex-col p-2 m-3 my-8 border-2 w-full ">
             <h1 className=" text-4xl p-2 font-bold">{item.company.display_name}</h1>
             <h4 className="italic">{item.location.area}</h4>
             <h2 className="text-xl p-2">{item.title}</h2>
             <h3 className="text-gray-600">{item.description}</h3>
              <h3 className="flex justify-center text-center p-2"><a className="text-blue-400 flex flex-col text-center "target="_blank" href={item.redirect_url}>Consulter l'offre</a></h3>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Offers;
