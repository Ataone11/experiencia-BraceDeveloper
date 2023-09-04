import type { NextPage } from "next";
import { useEffect, useState } from "react";
import BasePage from "../src/screens/general/base/BasePage";
import TablaCampañas from "../src/components/TablaCampañas";
import CrearCampaña from "./crear/CrearCampaña";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <BasePage title="Campañas">
      <div className="px-2 md:px-10">
        <div className="flex justify-center items-center lg:justify-between mx-10 xl:mx-auto xl:container">
          <h1 className="text-3xl text-blue-600 hidden lg:block">Campañas</h1>
          <Link href="/crear">
            <button className="bg-gradient-to-r from-[#9955D4] to-[#425AC5] lg:text-sm text-base rounded-md py-2 px-4 text-white font-myriad w-[264px] lg:w-[224px] lg:py-3 align-middle text-center my-5 mx-2">
              Nueva campaña +
            </button>
          </Link>
        </div>
        <TablaCampañas />
      </div>
    </BasePage>
  );
};
//<TablaCampañas />


export default Home;
