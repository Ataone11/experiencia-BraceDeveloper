import type { NextPage } from "next";
import Listar from "./nuevoNegocio";
import Pendiente from "./solicitudNegocio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasePage from "../../src/screens/general/base/BasePage";
import Link from "next/link";

const crearNegocio: NextPage = () => {
  return (
    <BasePage>
      <Listar />
    </BasePage>
  );
};

export default crearNegocio;
