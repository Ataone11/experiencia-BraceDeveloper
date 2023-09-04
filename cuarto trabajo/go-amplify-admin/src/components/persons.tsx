import type { NextPage } from "next";
import { useEffect, useState } from "react";
import BasePage from "../screens/general/base/BasePage";
import TablaPersonasInscritas from "./TablaPersonasInscritas";

const Home: NextPage = () => {

  useEffect(() => {}, []);

  return (
   <div>
     <div className="flex justify-center items-center lg:justify-between mx-10 xl:mx-auto xl:container">
        <h1 className="text-3xl text-blue-600 hidden lg:block md:pt-10 font-semibold">Personas inscritas</h1>
      </div>
      <TablaPersonasInscritas />
   </div>
  );
};
//<TablaCampañas />


export default Home;
