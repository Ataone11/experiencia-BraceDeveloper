import Image from "next/image";
import Link from "next/link";
import {
  getDepartamentosState,
  getErrorD,
} from "../../src/redux/reducers/departamentosReducer";
import {
  getCategoriaState,
  getErrorCategoria,
} from "../../src/redux/reducers/categoriaReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getDepart } from "../../src/redux/actions/departamentosActions";
import { getCategorias } from "../../src/redux/actions/categoriaActions";
import { createLugar } from "../../src/redux/actions/lugaresActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { ACCESIBILIDADES } from "../../src/utils/constants";
import { NextPage } from "next";
import BasePage from "../../src/screens/general/base/BasePage";
import { LugaresModel } from "../../src/models/LugaresModel";
import CrearEditarLugar from "../../src/screens/administrador/CrearEditarLugar";

const CrearLugar = () => {
  return (
    <BasePage>
      <CrearEditarLugar />
    </BasePage>
  );
};

export default CrearLugar;
