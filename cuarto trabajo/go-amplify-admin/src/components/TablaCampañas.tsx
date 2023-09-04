import Image from "next/image";
import React, { useEffect, useState } from "react";
import basura from "../assets/basura.svg";
import arriba from "../assets/arriba.svg";
import EliminarCampaña from "./EliminarCampaña";
import { PulseLoader } from "react-spinners";
import { exportarCampania, getCampanias } from "../redux/actions/campaniasActions";
import moment from "moment";
import { ORDENES } from "../enums/ordenes.enum";
import {
  CAMPAIGN_STATES_NAMES,
  ESTADOS_CAMPAÑA,
} from "../enums/estados-campaña.enum";
import { useDebounce } from "use-debounce";
import Paginacion from "./Paginacion";
import Link from "next/link";
import { S3_BUCKET_URL } from "../utils/constants";
import ImageWithFallback from "./ImageWithFalback";

const TablaCampañas = () => {
  const [campanias, setCampanias] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterState, setFilterState] = useState(ESTADOS_CAMPAÑA.INSCRIPCIONES);
  const [order, setOrder] = useState<ORDENES | null>(null);
  const [criterioOrden, setCriterioOrden] = useState<string | null>(null);
  const [campañaPorEliminar, setCampañaPorEliminar] = useState<any | null>(
    null
  );
  const [lastPage, setLastPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText] = useDebounce(searchText, 1000);

  const loadCampanias = async () => {
    setLoading(true);

    const res = await getCampanias(
      debouncedSearchText,
      currentPage,
      order,
      criterioOrden,
      filterState
    );
    setLastPage(res.lastPage);
    setCampanias(res.data);

    setLoading(false);
  };

  useEffect(() => {
    if (campanias) loadCampanias();
  }, [currentPage, order, criterioOrden, debouncedSearchText, filterState]);

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

  const getRangoHorarios = (horarios: any[]): string => {
    if (horarios.length === 0) return "-";

    const sortedHorarios = horarios.sort((a: any, b: any) => {
      if (a.fecha_hora <= b.fecha_hora) return -1;
      else return 1;
    });

    return (
      moment(sortedHorarios[0].fecha_hora).format("DD/MM/YYYY") +
      " - " +
      moment(sortedHorarios[sortedHorarios.length - 1].fecha_hora).format(
        "DD/MM/YYYY"
      )
    );
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
      <div className="lg:flex lg:justify-between md:mx-5 items-center md:my-10 lg:pt-2">
          <div className="flex justify-center">
            <button
              className={`${
                filterState === ESTADOS_CAMPAÑA.INSCRIPCIONES
                  ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                  : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              }  text-sm md:text-base rounded-lg py-2 px-1 md:px-4  font-myriad w-[104px] md:w-[124px] align-middle text-center my-5 mx-2`}
              onClick={() => setFilterState(ESTADOS_CAMPAÑA.INSCRIPCIONES)}
            >
              Inscripciones
            </button>
            <button
              className={`${
                filterState === ESTADOS_CAMPAÑA.EN_PROCESO
                  ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                  : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              } text-sm md:text-base rounded-lg py-2 px-1 md:px-4  font-myriad w-[104px] md:w-[124px] align-middle text-center my-5 mx-2`}
              onClick={() => setFilterState(ESTADOS_CAMPAÑA.EN_PROCESO)}
            >
              En proceso
            </button>
            <button
              className={`${
                filterState === ESTADOS_CAMPAÑA.TERMINADA
                  ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                  : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              } text-sm md:text-base rounded-lg py-2 px-1 md:px-4  font-myriad w-[104px] md:w-[124px] align-middle text-center my-5 mx-2`}
              onClick={() => setFilterState(ESTADOS_CAMPAÑA.TERMINADA)}
            >
              Completadas
            </button>
          </div>
          <div className="relative flex bg-white border-2 border-[#9955D4] rounded-3xl w-[85%] md:w-[40%] h-[40px] overflow-hidden px-2 mx-auto lg:mx-0">
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
        {/* Tabla */}
        {campanias?.length === 0 ? (
          <div className="flex justify-center mx-auto text-gray-200 text-center font-mono text-2xl md:text-2xl my-5 pt-2 py-20">
            <h1>No hay campañas que cumplan con estos criterios</h1>
            <br />
          </div>
        ) : (
          <div className="flex items-start py-5">
            {/* Izquierda */}

            <div className="w-1/2 max-w-[250px] lg:max-w-[300px] pl-4 divide-y">
              {/* Titulos izquierda */}

              <div className="flex text-left items-center h-[125px]">
                <button
                  className="text-[#425AC5] text-base font-semibold my-1 flex items-center"
                  onClick={() => changeOrder("titulo")}
                >
                  Nombre
                  {criterioOrden === "titulo" && (
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
                <Link href={`campaigns/${campaña.id}`} key={campaña.id}>
                  <div className="cursor-pointer">
                    <div className="flex py-2 box-content items-center h-[75px]">
                      <div className="hidden sm:block">
                        <ImageWithFallback
                          src={campaña.imgCampania}
                          width={60}
                          height={60}
                          className="rounded-full pt-5 z-10 md:block"
                          objectFit="cover"
                          objectPosition="center"
                        />
                      </div>
                      <div className="flex flex-col text-left sm:mx-5">
                        <h1 className="text-sm lg:text-base w-[120px] lg:block ">
                          {campaña.titulo}
                        </h1>
                        <h1 className=" pt-3 w-[120px] text-sm font-semibold lg:hidden">
                          {campaña.marca}
                        </h1>
                        <h1 className="w-[120px] text-xs text-blue-300 lg:hidden">
                          Cupos: {campaña.cupos}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Derecha */}
            <div className="w-1/2 overflow-x-scroll flex-grow">
              <div className="min-w-[650px] md:min-w-[975px] divide-y">
                {/* Titulos derecha */}
                <div className="flex items-center w-full gap-10 justify-between h-[125px]">
                  <h1
                    onClick={() => changeOrder("marca")}
                    className="cursor-pointer w-1/4 lg:w-1/6 text-[#425AC5] text-base font-semibold lg:flex lg:justify-center text-center hidden"
                  >
                    Marca
                    {criterioOrden === "marca" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <h1
                    onClick={() => changeOrder("fechaCierreInscripciones")}
                    className="cursor-pointer w-1/4 lg:w-1/6 text-[#425AC5] text-base font-semibold lg:flex lg:justify-center text-center flex"
                  >
                    Fecha de inscripción Primer/Ultima
                    {criterioOrden === "fechaCierreInscripciones" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <h1 className="cursor-default w-1/4 lg:w-1/6 text-[#425AC5] text-base font-semibold lg:flex lg:justify-center text-center flex">
                    Fecha de publicacion Primer/Ultima
                    {criterioOrden === "titulo" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <h1
                    onClick={() => changeOrder("cupos")}
                    className="cursor-pointer w-1/4 lg:w-1/6 text-[#425AC5] text-base font-semibold lg:flex lg:justify-center text-center hidden"
                  >
                    Personas/Cupos
                    {criterioOrden === "cupos" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <h1
                    onClick={() => changeOrder("estado")}
                    className="cursor-pointer w-1/4 lg:w-1/6 text-[#425AC5] text-base font-semibold text-center flex justify-center"
                  >
                    Estados
                    {criterioOrden === "estado" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${
                          order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <div className="w-1/4 lg:w-1/6"></div>
                </div>

                {/* Contenido derecha */}
                {campanias?.length != 0 ? (
                  campanias?.map((campaña) => (
                    <div
                      key={campaña.id}
                      className="flex items-center w-full gap-10 justify-between h-[75px] py-2 box-content"
                    >
                      <h1 className="cursor-pointer w-1/4 lg:w-1/6 text-base font-bold lg:block text-center hidden">
                        {campaña.marca}
                      </h1>
                      <div className="w-1/4 lg:w-1/6 flex justify-center text-center">
                        {campaña.fechaCreacion &&
                        campaña.fechaCierreInscripciones
                          ? moment(campaña.fechaCreacion).format("DD/MM/YYYY") +
                            "-" +
                            moment(campaña.fechaCierreInscripciones).format(
                              "DD/MM/YYYY"
                            )
                          : "-"}
                      </div>
                      <div className="w-1/4 lg:w-1/6 flex justify-center text-center">
                        {getRangoHorarios(campaña.horarios)}
                      </div>
                      <h1 className="cursor-pointer w-1/4 lg:w-1/6 text-lg text-center hidden lg:block">
                        {campaña.cupos_utilizados}/{campaña.cupos}
                      </h1>
                      <h1 className="cursor-pointer w-1/4 lg:w-1/6 text-lg lg:block bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5]  rounded-lg py-1 px-2 text-[#9955D4] font-myriad align-middle text-center my-5">
                        {CAMPAIGN_STATES_NAMES[campaña.estado].estado}
                      </h1>
                      {filterState !== ESTADOS_CAMPAÑA.INSCRIPCIONES && (<div className="w-1/4 lg:w-1/6 flex justify-center items-center"></div>)}
                     

                      <button
                        className={`w-1/4 lg:w-1/6 flex justify-center items-center ${
                          filterState === ESTADOS_CAMPAÑA.INSCRIPCIONES  ? "block" : "hidden"
                        }`}
                        onClick={() => setCampañaPorEliminar(campaña)}
                      >
                        <img
                          src={basura.src}
                          className="hover:scale-105 transition-all cursor-pointer w-[20px]"
                          alt=""
                          
                        />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center mx-auto text-gray-200 text-center font-mono text-6xl">
                    <h1>No hay campañas que cumplan con estos criterios</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {campañaPorEliminar && (
          <EliminarCampaña
            campaña={campañaPorEliminar}
            closeDialogue={() => setCampañaPorEliminar(null)}
            afterDelete={() => setCampanias(null)}
          />
        )}
      </div>

      <Paginacion
        currentPage={currentPage}
        lastPage={lastPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TablaCampañas;
