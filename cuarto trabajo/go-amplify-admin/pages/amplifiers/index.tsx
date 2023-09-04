import type { NextPage } from "next";
import { useEffect, useState } from "react";
import BasePage from "../../src/screens/general/base/BasePage";
import TablaPersonas from "../../src/components/TablaPersonas";
import Link from "next/link";

const Home: NextPage = () => {

  useEffect(() => { }, []);

  return (
    <BasePage>
      <div className="lg:px-10">
        <div className="flex justify-center items-center lg:justify-between mx-10 xl:mx-auto xl:container">
          <h1 className="text-3xl text-blue-600 hidden lg:block md:pt-10 font-semibold">Personas</h1>

        </div>
        <TablaPersonas />
      </div>
    </BasePage>
  );
};


export default Home;
