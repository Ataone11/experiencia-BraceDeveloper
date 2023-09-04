import Image from "next/image";
import React, { useEffect, useState } from "react";
import descarga from "../assets/descarga.svg";
import arriba from "../assets/arriba.svg";
import { PulseLoader } from "react-spinners";
import { getPersonas, getPersonasInscritas } from "../redux/actions/personasActions";
import moment from "moment";
import { useRouter } from "next/router";
import { ORDENES } from "../enums/ordenes.enum";
import { ESTADOS_CAMPAÑA } from "../enums/estados-campaña.enum";
import pantallazo from "../../src/assets/pantall.svg";
import instagram from "../../src/assets/instagram.svg";
import { useDebounce } from "use-debounce";
import Paginacion from "./Paginacion";
import { S3_BUCKET_URL } from "../utils/constants";
import { USER_CAMPAIGN_STATES_NAMES } from "../utils/states-usuario-campaña";
import VerPantallazos from "./VerPantallazos";
import opcionesRechazo from "./rechazo";
import Rechazo from "./rechazo";
import ImageWithFallback from "./ImageWithFalback";
import Link from "next/link";
import { exportarCampania } from "../redux/actions/campaniasActions";

const TablaPersonasInscritas = () => {
  const [personas, setPersonas] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [aprobar, setAprobar] = useState(true);
  const [porRevisar, setPorRevisar] = useState(false);
  const [order, setOrder] = useState<ORDENES | null>(null);
  const [criterioOrden, setCriterioOrden] = useState<string | null>(null);
  const [lastPage, setLastPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText] = useDebounce(searchText, 1000);
  const [pantallazosPorVer, setPantallazosPorVer] = useState<any | null>(
    null
  );
  const router = useRouter();
  const campañaId = router.query.id;

  const loadCampanias = async () => {
    setLoading(true);
    const res = await getPersonasInscritas(
      campañaId,
      debouncedSearchText,
      currentPage,
      order,
      criterioOrden,
      porRevisar
    );
    setLastPage(res.lastPage);
    setPersonas(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (personas) loadCampanias();
  }, [currentPage, order, criterioOrden, debouncedSearchText, porRevisar]);

  useEffect(() => {
    if (!personas) {
      loadCampanias();
    }
  }, [personas]);

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
  const Descargar = async () => {
    setLoading(true);
    const res = await exportarCampania(campañaId);
    setLoading(false);
    window.open(`${S3_BUCKET_URL}${res.data.path}`);
  };
  return (
    <div className="">
      <div className="lg:container lg:mx-auto lg:my-10 lg:shadow-md lg:rounded lx:w-[90%] px-[60px]">
        <div className="lg:flex lg:justify-between items-center md:my-10 lg:my-0 lg:pt-2">
          <div className="flex justify-center my-5 gap-x-4">
            <button
              className={`${porRevisar == false
                ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
                } text-sm md:text-base rounded-lg py-1 px-1 md:px-4 font-myriad w-[104px] md:w-[104px] align-middle text-center`}
              onClick={() => setPorRevisar(false)}
            >
              Todas
            </button>
            <button
              className={`${porRevisar == true
                ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white "
                : "bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
                } text-sm md:text-base rounded-lg py-2 px-1 md:px-4 font-myriad w-[104px] md:w-[124px] align-middle text-center`}
              onClick={() => setPorRevisar(true)}
            >
              Por revisar
            </button>
          </div>
          <div className="xl:translate-x-60 flex">
            <button onClick={()=>Descargar()} className="bg-[#425AC5] mx-auto lg:mx-2 mx flex justify-center items-center gap-2 lg:text-sm  rounded-md py-2 px-4 text-white  font-myriad w-[204px] lg:w-[224px] lg:py-3 align-middle text-center my-5 ">
              Exportar
              <img src={descarga.src} className=" " alt="" />
            </button>
          </div>

          <div className="relative flex bg-white border-2 border-[#9955D4] rounded-3xl w-[80%] md:w-[30%] h-[40px] overflow-hidden px-2 mx-auto lg:mx-0">
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
        {personas?.length === 0 ? (
          <div className="flex justify-center mx-auto text-gray-200 text-center font-mono text-2xl md:text-2xl my-5 py-20">
            <h1 className="my-5">No Hay Personas que cumplan con estos criterios</h1>
          </div>
        ) : (
          <div className="flex items-start py-5">
            {/* Izquierda */}

            <div className="w-1/2 max-w-[250px] lg:max-w-[300px] divide-y">
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
                      className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${order === ORDENES.DESC ? "rotate-180" : ""
                        }`}
                      alt=""
                    />
                  )}
                </button>
              </div>
              {/* Contenido Izquierda */}
              {personas?.map((userCampaign: any) => (
                <Link href={`/amplifiers/${userCampaign.usuario.id}`} key={userCampaign.id}>
                  <div className="flex py-2 items-center h-[75px] max-h-[75px] cursor-pointer">
                    <div className="hidden sm:block f">
                      <ImageWithFallback
                        src={userCampaign.usuario.urlFoto}
                        width={60}
                        height={60}
                        className="rounded-full pt-5 z-10  md:block"
                        objectFit="cover"
                        objectPosition="center" />

                    </div>
                    <div className="flex flex-col text-left sm:mx-5 ">
                      <h1 className="text-sm lg:text-base w-[120px] lg:block ">
                        {userCampaign.usuario.nombre} {userCampaign.usuario.apellido}
                      </h1>
                      <h1 className=" pt-3 w-[200px]  text-sm lg:hidden">
                        <img src={instagram.src} className={``} alt="" />@
                        {userCampaign.usuario.instagram}
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Derecha */}
            <div className="w-1/2 overflow-x-scroll flex-grow">
              <div className="min-w-[700px] lg:min-w-[650px] divide-y">
                {/* Titulos derecha */}
                <div className="flex items-center w-full gap-6 justify-end lg:justify-end h-[85px]">
                  <h1 className="cursor-default w-1/5 text-[#425AC5] text-base font-semibold lg:flex lg:justify-center text-center">
                    Codigo asignado
                  </h1>
                  <h1
                    onClick={() => changeOrder("fecha_inscripcion")}
                    className="cursor-pointer  w-1/5 text-[#425AC5] text-base font-semibold lg:flex lg:justify-center text-center"
                  >
                    Fecha de publicacion
                    {criterioOrden === "fecha_inscripcion" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${order === ORDENES.DESC ? "rotate-180" : ""
                          }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <h1 className="cursor-default w-1/5 text-[#425AC5] text-base font-semibold text-center lg:flex justify-center ">
                    Pantallazos
                  </h1>
                  <h1 onClick={() => changeOrder("telefono")} className="cursor-default w-1/5 text-[#425AC5] text-base font-semibold lg:flex lg:justify-center text-center justify-center">
                    Whatsapp
                    {criterioOrden === "telefono" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${order === ORDENES.DESC ? "rotate-180" : ""
                          }`}
                        alt=""
                      />
                    )}
                  </h1>
                  <h1
                    onClick={() => changeOrder("estado")}
                    className="cursor-pointer w-1/5 text-[#425AC5] text-base font-semibold text-center lg:flex justify-center"
                  >
                    Estado
                    {criterioOrden === "estado" && (
                      <img
                        src={arriba.src}
                        className={`hover:scale-105 transition-all cursor-pointer w-[8px] mx-3 ${order === ORDENES.DESC ? "rotate-180" : ""
                          }`}
                        alt=""
                      />
                    )}
                  </h1>
                </div>

                {/* Contenido derecha */}
                {personas?.length != 0 ? (
                  personas?.map((persona) => (
                    <div
                      key={persona.id}
                      className="flex items-center w-full gap-6 justify-end lg:justify-end h-[75px] py-2"
                    >
                      <div
                        className={` w-1/5 text-center lg:flex justify-center`}
                      >
                        {persona.codigo ? persona.codigo.codigo : "-"}
                      </div>
                      <div
                        className={` w-1/5 text-center lg:flex justify-center`}
                      >
                        {moment(persona.fecha_inscripcion).format("DD/MM/YYYY")}
                      </div>

                      <h1 onClick={() => setPantallazosPorVer(persona)} className="cursor-pointer  w-1/5 text-lg text-center">
                        {persona.pantallazos?.filter((p: any) => p.aprobado !== false).length === 0 ? (
                          "Sin archivos"
                        ) : (
                          <img
                            src={pantallazo.src}
                            className=" mx-auto "
                            alt=""
                          />
                        )}
                      </h1>
                      <h1 className="cursor-pointer w-1/5 text-lg text-center ">
                        {persona.usuario.telefono}
                      </h1>

                      <h1 className="cursor-pointer w-1/5 text-lg bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5]  rounded-lg py-1 px-2 text-[#9955D4] font-myriad align-middle text-center my-5">
                        {
                          USER_CAMPAIGN_STATES_NAMES[persona.estado]
                        }
                      </h1>
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
        {pantallazosPorVer && (
          aprobar ? <VerPantallazos
            campañaId={campañaId}
            campaña={pantallazosPorVer}
            closeDialogue={() => setPantallazosPorVer(null)}
            setAprobar={() => setAprobar(false)}
            loadCampanias={loadCampanias}
          /> : <Rechazo
            campañaId={campañaId}
            usuario={pantallazosPorVer}
            closeDialogue={() => setPantallazosPorVer(null)}
            loadCampanias={loadCampanias}
            aprobar={() => setAprobar(true)}
          />
        )}
      </div>
      <Paginacion
        currentPage={currentPage}
        lastPage={lastPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TablaPersonasInscritas;
