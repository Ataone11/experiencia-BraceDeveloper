import type { NextPage } from "next";
import Listar from "./listar-lugares";
import Pendientes from "./listar-pendientes";
import "react-toastify/dist/ReactToastify.css";
import BasePage from "../../src/screens/general/base/BasePage";
import Link from "next/link";

const AdministradorSitios: NextPage = () => {
  return (
    <BasePage>
      <div className="container mx-auto">
        <div className="pt-5 flex flex-col lg:flex-row lg:justify-between items-center">
          <h3 className="text-2xl lg:text-4xl text-black font-bold lg:pl-24 my-8">
            Administrador de sitios
          </h3>
          <div className="lg:pr-20 flex flex-row-reverse">
            <Link href="/crear-lugar">
              <button className="bg-blueHannu rounded-full py-1 px-3 text-white font-myriad md:w-[154px]  align-middle text-center my-5 mx-2 text-base lg:pl-30">
                Crear nuevo sitio
              </button>
            </Link>
            <Link href="/">
              <button className="bg-blueHannu rounded-full py-1 px-3 text-white font-myriad w-[204px] md:w-[204px] align-middle text-center my-5 mx-2 lg:pl-30">
                Salir del administrador
              </button>
            </Link>
          </div>
        </div>
        <div className="pt-5">
          <h3 className="text-2xl text-orange-700 font-semibold mx-5 md:pl-[5%] lg:pl-30">
            Solicitudes pendientes
          </h3>
        </div>
        <Pendientes />
        <div className="pt-5">
          <h3 className="text-2xl text-orange-700 font-semibold mx-5 md:pl-[5%] lg:pl-30">
            Sitios creados
          </h3>
        </div>
        <Listar />
      </div>
    </BasePage>
  );
};

export default AdministradorSitios;
