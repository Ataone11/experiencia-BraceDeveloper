import Image from "next/image";
import React, { useEffect, useState } from "react";
import descarga from "../assets/descarga.svg";
import arriba from "../assets/arriba.svg";
import { PulseLoader } from "react-spinners";
import moment from "moment";
import { ORDENES } from "../enums/ordenes.enum";
import instagram from "../../src/assets/instagram.svg";
import LeftArrowIcon from "../../src/assets/iz.svg";
import RightArrowIcon from "../../src/assets/der.svg";
import { useDebounce } from "use-debounce";
import { S3_BUCKET_URL } from "../utils/constants";
import { getPersonas, aprobarUsuario, exportarUsuario} from "../redux/actions/personasActions";
import { toast } from "react-toastify";
import Link from "next/link";
import ConfirmarRechazo from "./ConfirmarRechazo";
import ImageWithFallback from "./ImageWithFalback";


enum OPTIONS_STATES {
  SOLICITUDES = "solicitudes",
  ACEPTADOS = "aceptados",
  RECHAZADOS = "rechazados",
}
const TablaPersonas = () => {
  const [campanias, setCampanias] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState<OPTIONS_STATES>(
    OPTIONS_STATES.SOLICITUDES
  );
  const [order, setOrder] = useState<ORDENES | null>(null);
  const [criterioOrden, setCriterioOrden] = useState<string | null>(null);
  const [lastPage, setLastPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [path, setPath] = useState<string>("");
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const [confirmarRechazar, setConfirmarRechazar] = useState(0);

  const loadCampanias = async () => {
    setLoading(true);

    const res = await getPersonas(
      debouncedSearchText,
      currentPage,
      order,
      criterioOrden,
      estado
    );
    setLastPage(res.lastPage);
    setCampanias(res.data);

    setLoading(false);
  };

  useEffect(() => {
    if (campanias) loadCampanias();
  }, [currentPage, order, criterioOrden, debouncedSearchText, estado]);

  useEffect(() => {
    if (!campanias) {
      loadCampanias();
    }
  }, [campanias]);

  const changeOrder = (newCriterioOrden: string) => {
    if (criterioOrden === newCriterioOrden) {
      if (order === ORDENES.ASC) {
        setOrder(ORDENES.DESC);
      } else if (order === ORDENES.DESC) {
        setOrder(null);
        setCriterioOrden(null);
      } else {
        setOrder(ORDENES.ASC);
      }
    } else {
      setCriterioOrden(newCriterioOrden);
      setOrder(ORDENES.ASC);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center w-full h-[1000px] m-auto">
        <PulseLoader className="m-auto" color="#9955D4" />
      </div>
    );
  }
  const Descargar = async () => {
    setLoading(true);
    const res = await exportarUsuario();
    setLoading(false);
    setPath(res.data)
    window.open(`${S3_BUCKET_URL}${res.data.path}`);
  };

  const Aprobar = async (id: any) => {
    setLoading(true);
    await aprobarUsuario(id);
    setLoading(false);
    toast.success("Usuario aprobado!");
    loadCampanias();
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="">
      <div className="lg:container lg:mx-auto lg:my-10 lg:shadow-md lg:rounded lx:w-[90%]">
        <div className="lg:flex lg:justify-between md:mx-5 items-center md:my-10 lg:my-0 lg:pt-2">
          <div className="flex justify-center px-[20.0px] lg:px-[60.0px]">
            <button
              className={`${
                estado == OPTIONS_STATES.SOLICITUDES
                  ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                  : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              } text-sm md:text-base rounded-lg py-1 px-1 md:px-4 font-myriad w-[104px] md:w-[114px] align-middle text-center my-5 mx-2`}
              onClick={() => setEstado(OPTIONS_STATES.SOLICITUDES)}
            >
              Solicitudes
            </button>
            <button
              className={`${
                estado == OPTIONS_STATES.ACEPTADOS
                  ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                  : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              } text-sm md:text-base rounded-lg py-2 px-1 md:px-4 font-myriad w-[104px] md:w-[124px] align-middle text-center my-5 mx-2`}
              onClick={() => setEstado(OPTIONS_STATES.ACEPTADOS)}
            >
              Aceptados
            </button>
            <button
              className={`${
                estado == OPTIONS_STATES.RECHAZADOS
                  ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                  : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              } text-sm md:text-base rounded-lg py-2 px-1 md:px-4  font-myriad w-[104px] md:w-[124px] align-middle text-center my-5 mx-2`}
              onClick={() => setEstado(OPTIONS_STATES.RECHAZADOS)}
            >
              Rechazados
            </button>
          </div>
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-x-[30px] lg:w-[50%]">
            <div className="flex">
              <button onClick={()=>Descargar()} className="bg-[#425AC5] mx-auto lg:mx-2 mx flex justify-center items-center gap-2 lg:text-sm  rounded-md py-2 px-4 text-white font-myriad w-[204px] lg:w-[224px] lg:py-3 align-middle text-center my-5 ">
                Descargar
                <img src={descarga.src} className=" " alt="" />
              </button>
            </div>
            
       
            <div className="relative flex bg-white border-2 border-[#9955D4] rounded-3xl w-[80%] lg:w-full flex-grow h-[40px] overflow-hidden px-2 mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Buscar"
                value={searchText}
                onChange={(e: any) => setSearchText(e.target.value)}
                className="lg:w-full flex-grow outline-none"
              />
              <div className="flex items-center pointer-events-none w-[25px]">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Tabla */}
        {campanias?.length === 0 ? (
          <div className="flex justify-center mx-auto text-gray-200 text-center font-mono text-2xl md:text-4xl lg:text-3xl my-5 py-20">
            <h1>No hay personas que cumplan con estos criterios</h1>
            <br />
          </div>
        ) : (
          <div className="flex items-start py-5 px-[20.0px] lg:px-[60.0px] ">
            {/* Izquierda */}

            <div className="cursor-pointer w-1/2 max-w-[250px] lg:max-w-[300px] pl-4 divide-y">
              {/* Titulos izquierda */}

              <div className="flex text-left items-center h-[85px]">
                <button
                  className="text-[#425AC5] text-base font-semibold my-1 flex items-center"
                  onClick={() => changeOrder("nombre")}
                >
                  Nombre
                  {criterioOrden === "nombre" && (
                    <img
                      src={arriba.src}
                      className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${
                        order === ORDENES.DESC ? "rotate-180" : ""
                      }`}
                      alt=""
                    />
                  )}
                </button>
              </div>
              {/* Contenido Izquierda */}
              {campanias?.map((campaña) => (
                <div key={campaña.id}>
                  <Link href={`/amplifiers/${campaña.id}`}>
                    <div className="flex py-2 box-content items-center h-[75px] max-h-[75px]">
                      <div className="hidden   sm:flex flex-col justify-center">
                        <ImageWithFallback
                          src={campaña.urlFoto}
                          width={60}
                          height={60}
                          className="rounded-full pt-5 z-10 md:block"
                          objectFit="cover"
                          objectPosition="center"
                        />
                        <h1 className="mx-auto text-[10px] text-[#9955D4] lg:hidden">
                          {Math.round(campaña?.seguidores / 1000) > 0
                            ? (campaña?.seguidores / 1000).toFixed(1)
                            : campaña?.seguidores}{" "}
                          {Math.round(campaña?.seguidores / 1000) > 0
                            ? "K"
                            : ""}
                        </h1>
                      </div>
                      <div className="flex flex-col text-left sm:mx-5 w-full">
                        <h1 className="text-sm lg:text-base w-[120px] lg:block ">
                          {campaña.nombre + " "}
                          {campaña.apellido}
                        </h1>
                        <div className=" text-base text-black flex items-center gap-2 lg:hidden flex-grow overflow-hidden">
                          <img
                            src={instagram.src}
                            className="flex justify-end my-2"
                            alt=""
                          />{" "}
                          <p className="text w-full">
                            @{campaña?.instagram}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* Derecha */}
            <div className="w-1/2 overflow-x-scroll flex-grow">
              <div className="min-w-[950px] divide-y">
                {/* Titulos derecha */}
                <div className="flex items-center w-full   justify-start lg:justify-end h-[85px] ">
                  <h1
                    onClick={() => changeOrder("instagram")}
                    className="cursor-pointer w-1/5  text-[#425AC5] text-base font-semibold flex justify-center text-center"
                  >
                    Instagram
                    {criterioOrden === "instagram" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-1 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <h1
                    onClick={() =>
                      changeOrder(
                        estado === OPTIONS_STATES.SOLICITUDES ||
                          estado === OPTIONS_STATES.RECHAZADOS
                          ? "seguidores"
                          : "campanias_activas"
                      )
                    }
                    className="cursor-pointer w-1/5  text-[#425AC5] text-base font-semibold flex justify-center text-center"
                  >
                    {estado === OPTIONS_STATES.SOLICITUDES ||
                    estado === OPTIONS_STATES.RECHAZADOS
                      ? "Seguidores"
                      : "Activas"}
                    {criterioOrden === "seguidores" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-1 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                    {criterioOrden === "campanias_activas" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-1 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <div
                    onClick={() => changeOrder("campanias_terminadas")}
                    className={`w-1/5 ${
                      estado !== OPTIONS_STATES.ACEPTADOS
                        ? "hidden"
                        : "flex justify-center"
                    }`}
                  >
                    <h1 className="cursor-pointer text-[#425AC5] text-base font-semibold lg:flex justify-center text-center mx-5 xl:mx-16">
                      Completadas
                      {criterioOrden === "campanias_terminadas" && (
                        <img
                          src={arriba.src}
                          className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-1 ${
                            order === ORDENES.DESC ? "rotate-180" : ""
                          }`}
                          alt=""
                        />
                      )}
                    </h1>
                  </div>

                  <h1
                    onClick={estado === OPTIONS_STATES.SOLICITUDES ? ()=> null :() => changeOrder("fechaSolicitud")}
                    className={`${estado === OPTIONS_STATES.SOLICITUDES? "" : "cursor-pointer"} w-1/5  text-[#425AC5] text-base font-semibold text-center flex justify-center  lg:pl-0`}
                  >
                    {estado === OPTIONS_STATES.SOLICITUDES ? "Estado" : ""}
                    {estado === OPTIONS_STATES.ACEPTADOS ? "Seguidores" : ""}
                    {estado === OPTIONS_STATES.RECHAZADOS
                      ? "Fecha de solicitud"
                      : ""}
                    {criterioOrden === "fechaSolicitud" &&
                      estado != OPTIONS_STATES.SOLICITUDES && (
                        <img
                          src={arriba.src}
                          className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-1 ${
                            order === ORDENES.DESC ? "rotate-180" : ""
                          }`}
                          alt=""
                        />
                      )}
                  </h1>
                 
                 
                </div>

                {/* Contenido derecha */}
                {campanias?.length != 0 ? (
                  campanias?.map((campaña) => (
                    <div
                      key={campaña.id}
                      className="flex items-center w-full  justify-start lg:justify-end h-[75px] py-2 box-content"
                    >
                      <div
                        className={`w-1/5  text-center flex justify-center`}
                      >
                        @{campaña.instagram}
                      </div>
                      <div
                        className={`w-1/5   text-center ${
                          estado === OPTIONS_STATES.ACEPTADOS
                            ? "flex justify-center"
                            : "hidden"
                        }`}
                      >
                        <h1 className="cursor-pointer w-1/5 text-lg text-center ">
                          {campaña.campanias_activas
                            ? campaña.campanias_activas
                            : 0}
                        </h1>
                      </div>
                      <div
                        className={`w-1/5  text-center ${
                          estado === OPTIONS_STATES.ACEPTADOS
                            ? "flex justify-center"
                            : "hidden"
                        }`}
                      >
                        {campaña.campanias_terminadas
                          ? campaña.campanias_terminadas
                          : 0}
                      </div>
                      <h1 className={`cursor-pointer w-1/5 text-lg text-center`}>
                        {campaña?.seguidores ? "" : 0}
                        {Math.round(campaña?.seguidores / 1000) > 0
                          ? (campaña?.seguidores / 1000).toFixed(1)
                          : campaña?.seguidores}{" "}
                        {Math.round(campaña?.seguidores / 1000) > 0 ? "K" : ""}
                      </h1>

                      <div
                        className={` w-1/5  text-center pl-24 md:pl-0 ${
                          estado === OPTIONS_STATES.SOLICITUDES
                            ? "flex justify-center"
                            : "hidden"
                        }`}
                      >
                        <button
                          onClick={() => Aprobar(campaña.id)}
                          className="text-base rounded-lg py-2 px-2 lg:px-4  font-myriad w-[94px] md:w-[104px] align-middle text-center text-white my-5 mx-2 bg-[#5AAB58]"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() =>
                            setConfirmarRechazar(campaña.id as any)
                          }
                          className="text-base rounded-lg py-2 px-2 lg:px-4  font-myriad w-[94px] md:w-[104px] align-middle text-center  text-white my-5 mx-2 bg-[#EC6363]"
                        >
                          Rechazar
                        </button>
                      </div>
                      {confirmarRechazar != 0 && (
                        <ConfirmarRechazo
                          id={confirmarRechazar}
                          closeDialogue={() => setConfirmarRechazar(0)}
                          reload={loadCampanias}
                        />
                      )}
                      <div
                        className={` w-1/5  text-center ${
                          estado === OPTIONS_STATES.RECHAZADOS
                            ? "flex justify-center"
                            : "hidden"
                        }`}
                      >
                        {moment(campaña.fechaDeNacimiento).format("DD/MM/YYYY")}
                      </div>
                      <div className="w-1/5 lg:w-0.5"></div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center mx-auto text-gray-200 text-center font-mono text-6xl">
                    <h1>No Hay Campañas que cumplan con estos criterios</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto flex gap-2 my-5 justify-center">
        {campanias?.map((page) => {
          console.log(page);
          for (var i = 1; i <= page.nextPage; i++) {
            <h1
              className={`${
                page == i
                  ? "text-white border-[#9955D4] bg-gradient-to-r from-[#9955D4] to-[#425AC5] "
                  : "bg-gray-200"
              } border rounded-md  font-myriad w-[30px] h-[30px] text-center items-center`}
            >
              {i}as
            </h1>;
          }
        })}
        {currentPage > 1 && (
          <button
            onClick={previousPage}
            className="border-2 py-2 px-2 rounded-md  font-myriad w-[30px] h-[30px] text-center"
          >
            <img src={LeftArrowIcon.src} className="" alt="" />
          </button>
        )}
        {Array.from({ length: lastPage }, (_, i) => i + 1).map(
          (page: number) => (
            <h1
              key={page}
              onClick={() => setCampanias(null)}
              className={`${
                currentPage == page
                  ? "text-white border-[#9955D4] bg-gradient-to-r from-[#9955D4] to-[#425AC5] "
                  : "bg-gray-200"
              } border rounded-md  font-myriad w-[30px] h-[30px] text-center items-center cursor-pointer`}
            >
              {page}
            </h1>
          )
        )}
        {currentPage < lastPage && (
          <button
            onClick={nextPage}
            className="border-2 py-2 px-2 rounded-md  font-myriad w-[30px] h-[30px]   text-center"
          >
            <img src={RightArrowIcon.src} className="" alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TablaPersonas;
