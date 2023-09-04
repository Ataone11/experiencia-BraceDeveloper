import Image from "next/image";
import React, { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import {
  activarUsuario,
  aprobarUsuario,
  ocultarUsuario,
  rechazarUsuario,
} from "../redux/actions/personasActions";

import direccion from "../../src/assets/direccion.svg";
import identificacion from "../../src/assets/identificacion.svg";
import ubicacion from "../../src/assets/ubicacion.svg";
import whtsp from "../../src/assets/whtsp.svg";
import correo from "../../src/assets/correo.svg";
import instagram from "../../src/assets/instagram.svg";
import atras from "../../src/assets/atras.svg";
import { usuarioFind } from "../redux/actions/personasActions";
import CamnpañasAsociadas from "./CampañasAsociadas";
import { toast } from "react-toastify";
import ConfirmarSeguidores from "./ConfirmarSeguidores";
import ConfirmarRechazo from "./ConfirmarRechazo";
import mapa from "../assets/carlos.png";
import ardvertencia from "../assets/adver.svg";
import {
  ESTADOS_USUARIOS,
  USERS_STATES_NAMES,
} from "../enums/estados-usuarios.enum";
import Link from "next/link";
import ImageWithFallback from "./ImageWithFalback";
const Usuario = ({ id }: { id: any }) => {
  const [loading, setLoading] = useState(false);
  const [incompleto, setIncompleto] = useState(false);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [confirmarRechazar, setConfirmarRechazar] = useState(false);
  const loadUsuario = async () => {
    setLoading(true);
    const res = await usuarioFind(id);
    setUsuario(res);
    setLoading(false);
  };

  const aprobar = async (id: any) => {
    setLoading(true);
    await aprobarUsuario(id);
    setLoading(false);
    toast.success("Usuario aprobado!");
    loadUsuario();
  };

  const activar = async (id: any) => {
    setLoading(true);
    await activarUsuario(id);
    setLoading(false);
    toast.success("Usuario activado!");
    loadUsuario();
  };

  const ocultar = async (id: any) => {
    setLoading(true);
    await ocultarUsuario(id);
    setLoading(false);
    toast.success("Usuario ocultado!");
    loadUsuario();
  };

  useEffect(() => {
    console.log(usuario);
    if (!usuario && id) {
      loadUsuario();
    }
  }, [usuario, id]);

  if (loading) {
    return (
      <div className="flex justify-center w-full h-[1000px] m-auto">
        <PulseLoader className="m-auto" color="#9955D4" />
      </div>
    );
  }
  return (
    <div className="px-5 md:px-10 lg:max-w-[1250px] lg:mx-auto">
      <div className="lg:mx-auto flex lg:my-8 my-3">
        <Link href="/amplifiers">
          <img
            src={atras.src}
            className="flex justify-start my-2 mr-2 lg:mr-6 cursor-pointer"
            alt=""
          />
        </Link>
        <span
          className={`
          text-sm md:text-[15px] rounded-lg  font-myriad px-2 align-middle my-auto  text-center py-2  border border-[#425AC5] text-[#425AC5]`}
        >
          {USERS_STATES_NAMES[usuario?.estado]?.estado}
        </span>
        {(usuario?.estado === ESTADOS_USUARIOS.ESPERANDO_APROBACION || usuario?.estado === ESTADOS_USUARIOS.RECHAZADO) && (
          <button
            onClick={usuario?.seguidores === -1 ? () => setIncompleto(true) : () => aprobar(id)}
            className={`text-sm md:text-base rounded-lg py-2 px-1 md:px-4 font-myriad w-[104px] md:w-[124px] h-[40px] align-middle text-center my-5 mx-2 text-white bg-[#5AAB58]`}
          >
            Aprobar
          </button>
        )}
        {usuario?.estado === ESTADOS_USUARIOS.ESPERANDO_APROBACION && (
          <button
            onClick={() => setConfirmarRechazar(true)}
            className={`text-sm md:text-base rounded-lg py-2 px-1 md:px-4  font-myriad w-[104px] md:w-[124px] h-[40px] align-middle text-center my-5 mx-2 text-white bg-[#EC6363]`}
          >
            Rechazar
          </button>
        )}

        {usuario?.estado === ESTADOS_USUARIOS.ACTIVO && (
          <button
            onClick={() => ocultar(id)}
            className={`text-sm md:text-base rounded-lg py-2 px-1 md:px-4  font-myriad w-[134px] md:w-[164px] h-[40px] align-middle text-center my-5 mx-2 text-white bg-[#EC6363]`}
          >
            Desactivar
          </button>
        )}

        {usuario?.estado === ESTADOS_USUARIOS.OCULTO && (
          <button
            onClick={usuario?.seguidores === -1 ? () => setIncompleto(true) : () => activar(id)}
            className={`text-sm md:text-base rounded-lg py-2 px-1 md:px-4  font-myriad w-[134px] md:w-[164px] h-[40px] align-middle text-center my-5 mx-2 text-white bg-[#5AAB58]
           }`}
          >
            Activar
          </button>
        )}
      </div>

      <div className="container shdw flex rounded-xl flex-col justify-center mx-auto text-center bg-white my-2 ">
        <div className="flex flex-col justify-center gap-4  md:px-10 p-[13px] lg:p-0">
          <div className="flex box-content items-center">
            <div className="hidden lg:flex lg:flex-col text-[#9955D4] lg:px-10 border-r-2">
              <div className="flex flex-col justify-center mx-auto">
                <div className={`rounded-full flex justify-center items-center overflow-hidden ${usuario?.seguidores === -1
                  ? "shadow-md shadow-red-500"
                  : ""
                  }`}>
                  <ImageWithFallback
                    src={usuario?.urlFoto}
                    width={177}
                    height={177}
                    className={`md:block rounded-full`}
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>

              </div>
              {usuario?.seguidores === -1 && (
                <img
                  src={ardvertencia.src}
                  className="flex justify-center my-2 mx-auto lg:mx-6 h-5"
                  alt=""
                />
              )}
              {(usuario?.seguidores !== -1 && (
                Math.round(usuario?.seguidores / 1000) > 0
                  ? (usuario?.seguidores / 1000).toFixed(1)
                  : usuario?.seguidores

              ))}

              {Math.round(usuario?.seguidores / 1000) > 0
                ? "K"
                : ""}
              <h1 className="text-2xl text-[#425AC5] lg:text-2xl pt-2 w-[120px] mx-auto font-semibold">
                {usuario?.nombre}
              </h1>
              <h1 className="w-[120px] text-2xl text-[#9955D4]  mx-auto">
                {usuario?.apellido}
              </h1>
            </div>
            <div className="flex justify-between border-b lg:border-none lg:px-16 lg:my-5 w-full">
              <div className="flex flex-col text-left mx-1 sm:mr-5 min-w-[120px]  sm:w-full">
                <h1 className="text-2xl text-[#425AC5] lg:text-base w-[120px] lg:hidden ">
                  {usuario?.nombre + " "}
                </h1>

                <h1 className="w-[120px] text-base text-[#9955D4]  lg:hidden">
                  {usuario?.apellido}
                </h1>
                <h1 className=" text-base text-black   flex items-center gap-2">
                  <img
                    src={instagram.src}
                    className="flex justify-end my-2"
                    alt=""
                  />

                  {usuario?.seguidores === -1 ? (
                    <div className="text-red-400">@{usuario?.instagram}</div>
                  ) : (
                    <div>@{usuario?.instagram}</div>
                  )}
                  {usuario?.seguidores === -1 && (
                    <img
                      src={ardvertencia.src}
                      className="flex justify-start my-2 mx-2  h-5"
                      alt=""
                    />
                  )}
                </h1>
                <h1 className=" text-sm text-black   flex items-center gap-2">
                  <img
                    src={identificacion.src}
                    className="flex justify-end my-2"
                    alt=""
                  />{" "}
                  C.C {usuario?.numeroDocumento}
                </h1>
                <h1 className=" text-sm text-black flex items-center gap-2">
                  <img
                    src={whtsp.src}
                    className="flex justify-end my-2"
                    alt=""
                  />{" "}
                  +57 {usuario?.telefono}
                </h1>
                <h1 className=" text-sm text-black flex items-center gap-2">
                  <img
                    src={ubicacion.src}
                    className="flex justify-end my-2"
                    alt=""
                  />{" "}
                  {usuario?.ciudad.nombre}
                </h1>
                <h1 className=" text-sm text-black  flex items-center gap-2">
                  <img
                    src={direccion.src}
                    className="flex justify-end my-2"
                    alt=""
                  />{" "}
                  {usuario?.direccion}
                </h1>
                <div className="text-sm text-black items-center gap-2 flex">
                  <img
                    src={correo.src}
                    className="flex justify-end my-2"
                    alt=""
                  />{" "}
                  <p className="flex-grow ">
                    {usuario?.correo}
                  </p>
                </div>
                <div className="my-5 hidden lg:flex justify-between gap-x-20 items-center">
                  <h1 className="text-[#9955D4] text-xl">Tus puntos:</h1>
                  <div className="flex flex-col">
                    <h1 className="text-[#9955D4] text-xl font-bold mx-auto text-[24px]">
                      {usuario?.puntos_mes ? usuario?.puntos_mes : 0}
                    </h1>
                    <h1 className="text-[#707070] text-base mx-auto">julio</h1>
                    <h1 className="text-[#707070] text-base mx-auto">Mes</h1>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h1 className="text-[#9955D4] text-xl font-bold mx-auto text-[24px]">
                      {usuario?.puntos_semestre ? usuario?.puntos_semestre : 0}
                    </h1>
                    <h1 className="text-[#707070] text-base mx-auto">2021-1</h1>
                    <h1 className="text-[#707070] text-base mx-auto">
                      Semestre
                    </h1>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-[#9955D4] text-xl font-bold mx-auto text-[24px]">
                      {usuario?.puntos_año ? usuario?.puntos_año : 0}
                    </h1>
                    <h1 className="text-[#707070] text-base mx-auto">2022</h1>
                    <h1 className="text-[#707070] text-base  mx-auto">Año</h1>
                  </div>
                </div>
              </div>
              <div className="lg:hidden  sm:min-w-[122px] h-full  text-[#9955D4] md:flex flex-col text-[12px]">
                <div className={`rounded-full flex justify-center items-center overflow-hidden ${usuario?.seguidores === -1
                  ? "shadow-md shadow-red-500"
                  : ""
                  }`}>
                  <ImageWithFallback
                    src={usuario?.urlFoto}
                    width={132}
                    height={132}
                    className={`md:block rounded-full`}
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                <div>
                  {usuario?.seguidores === -1 && (
                    <img
                      src={ardvertencia.src}
                      className=" my-2 mx-auto lg:mx-6 h-5"
                      alt=""
                    />
                  )}

                  {!usuario?.seguidores && (
                    <button
                      onClick={() => setIncompleto(true)}
                      className="mx-auto"
                    >
                      <img
                        src={ardvertencia.src}
                        className="flex justify-start my-2 mx-2 lg:mx-6 h-5"
                        alt=""
                      />
                    </button>
                  )}
                </div>
                {(usuario?.seguidores !== -1 && (
                  Math.round(usuario?.seguidores / 1000) > 0
                    ? (usuario?.seguidores / 1000).toFixed(1)
                    : usuario?.seguidores

                ))}

                {Math.round(usuario?.seguidores / 1000) > 0
                  ? "K"
                  : ""}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="flex justify-start text-[#9955D4] text-[12px]  lg:hidden">
              Puntos:
            </h1>
            <div className="flex justify-around lg:hidden py-[13]">
              <div className="flex flex-col">
                <h1 className="text-[#9955D4] text-[15px]">
                  {" "}
                  {usuario?.puntos_mes ? usuario?.puntos_mes : 0}
                </h1>
                <h1 className="text-[#707070] text-[12px]">julio</h1>
                <h1 className="text-[#707070] text-[12px]">Mes</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#9955D4] text-[15px]">
                  {usuario?.puntos_semestre ? usuario?.puntos_semestre : 0}
                </h1>
                <h1 className="text-[#707070] text-[12px]">2021-1</h1>
                <h1 className="text-[#707070] text-[12px]">Semestre</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#9955D4] text-[15px]">
                  {usuario?.puntos_año ? usuario?.puntos_año : 0}
                </h1>
                <h1 className="text-[#707070] text-[12px]">2022</h1>
                <h1 className="text-[#707070] text-[12px]">Año</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {incompleto && (
        <ConfirmarSeguidores
          id={id}
          closeDialogue={() => setIncompleto(false)}
          load={loadUsuario}
        />
      )}
      {confirmarRechazar && (
        <ConfirmarRechazo
          id={id}
          closeDialogue={() => setConfirmarRechazar(false)}
          reload={loadUsuario}
        />
      )}
      {usuario?.estado === ESTADOS_USUARIOS.ACTIVO ||
        usuario?.estado === ESTADOS_USUARIOS.OCULTO ||
        usuario?.estado === ESTADOS_USUARIOS.SELECCION_INTERESES ? (
        <CamnpañasAsociadas usuarioId={id} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Usuario;
