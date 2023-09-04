import Image from "next/image";
import video from "../../src/assets/icons/Group 7v.svg";
import basura from "../../src/assets/icons/Group 121basura.svg";
import editar from "../../src/assets/icons/Group 127editar.svg";
import visual from "../../src/assets/icons/invisibleojo.svg";
import visualO from "../../src/assets/icons/Groupvisual.svg";
import oculto1 from "../../src/assets/icons/oculto.svg";
import frame from "../../src/assets/icons/Frameframe.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getLoadingLugares,
  getLugaresState,
  getErrorLugares,
} from "../../src/redux/reducers/lugaresReducer";
import { ACCESIBILIDADES, S3_BUCKET_URL } from "../../src/utils/constants";
import { NextPage } from "next";
import BasePage from "../../src/screens/general/base/BasePage";
import { deleteData } from "../../src/proxy/BackRest";
import {
  deleteLugarById,
  getLugares,
  ocultarHabilitarLugarById,
} from "../../src/redux/actions/lugaresActions";
import { ESTADOS_LUGAR } from "../../src/enums/estados.enum";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import Link from "next/link";

const listar = () => {
  const { lugares, lugaresCompletos } = useSelector(getLugaresState);
  const error = useSelector(getErrorLugares);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [oculto, setOculto] = useState(false);
  let nombre = "";

  useEffect(() => {
    if (!lugaresCompletos) {
      getLugares(dispatch, nombre);
    }
  }, [lugaresCompletos]);

  const deleteLugar = async (idLugar: number) => {
    setLoading(true);
    swal({
      title: "Eliminar",
      text: "Desea eliminar el sitio?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        deleteLugarById(idLugar, dispatch);
        setLoading(false);
        swal({ text: "El sitio ha sido borrado con exito", icon: "success" });
      }
    });
  };
  const handleChange = async (e: any) => {
    getLugares(dispatch, e.target.value);
  };
  const ocultarHabilitarLugar = async (lugar: any) => {
    setLoading(true);
    const res = await ocultarHabilitarLugarById(lugar, dispatch);
    setLoading(false);
    if (res && res.error) {
      toast.error(res.message);
    } else {
      const mensaje =
        lugar.estado === ESTADOS_LUGAR.OCULTO
          ? "El lugar fue habilitado exitosamente"
          : "El lugar fue ocultado exitosamente";
      toast.success(mensaje);
    }
  };

  return (
    <div className="container mx-auto my-5 shadow-md rounded flex w-[90%] flex-col ">
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none mx-5 md:mx-20 lg:mx-32">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar lugar"
          onChange={handleChange}
          className="rounded-3xl mx-5 md:mx-20 lg:mx-32 my-5 bg-gray-200 w-[55%] lg:w-[35%] h-10 pl-10"
        />{" "}
      </div>

      {lugares?.map((lugar: any, index: number) => (
        <div className="flex flex-col mx-auto w-[90%]  lg:h-[175px] my-5">
          <div className="flex flex-col md:flex-row mx-auto justify-start  md:justify-around items-center">
            <div className=" min-w-[200px] w-[160px] relative hidden md:block lg:pb-14 h-[80%] mx-automd:block">
              <Image
                src={
                  lugar.medias.length > 0
                    ? `${S3_BUCKET_URL}${lugar.medias[0].ruta}`
                    : video
                }
                width={180}
                height={100}
                layout="responsive"
                className="rounded-xl pt-5 z-10  md:block"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <div className="min-w-[300px] w-[200px] relative md:hidden lg:pt-8 h-[80%] mx-auto ">
              <Image
                src={
                  lugar.medias.length > 0
                    ? `${S3_BUCKET_URL}${lugar.medias[0].ruta}`
                    : video
                }
                width={260}
                height={100}
                className="mx-auto z-10 w-[80%] h-[50%] relative rounded-xl"
                alt=""
                layout="fixed"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>

            <div className="flex flex-col  md:mx-5 w-[95%] md:w-[380px] xl:w-[900px] justify-start  ">
              <div className="my-5 md:my-0 md:mx-2 text-lg font-bold text-gray-600 flex flex-wrap">
                {lugar.nombre}
              </div>
              <div className="md:mx-2  w-[200px]  lg:w-full text-base my-2 ">
                <p className="flex flex-wrap resize w-[250px]  md:w-[380px] xl:w-[900px] break-all">
                  {lugar.descripcion}
                </p>
              </div>
              <div className="md:mx-2 text-gray-500 font-bold text-sm">
                Accsesibilidad:
              </div>

              <div className="flex flex-row md:mx-2 items-center">
                <img src={frame.src} className="my-3" alt="" />

                <div className="w-[40%]">
                  <div className="mx-3 flex flex-row gap-4">
                    {lugar.accesibilidades?.map(
                      (accesibilidad: { id: number }) => {
                        const ImagenAccecisibilidad =
                          ACCESIBILIDADES[accesibilidad.id].imagen;
                        return (
                          <ImagenAccecisibilidad
                            color="#cb6f47"
                            className="w-[20px] h-[25px] hover:scale-105 transition-all cursor-pointer"
                          />
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="flex flex-row md:flex-col lg:flex-row gap-2 md:hidden w-[60%]">
                  <div>
                    <Link href={`/administrador/lugares/${lugar.id}`}>
                      <button>
                        <img src={editar.src} alt="" className="w-8 " />
                      </button>
                    </Link>
                  </div>
                  <div>
                    <button onClick={() => deleteLugar(lugar.id)}>
                      <img src={basura.src} alt="" className="w-8" />
                    </button>
                  </div>
                  <div>
                    <button onClick={() => ocultarHabilitarLugar(lugar)}>
                      <img
                        src={`${oculto ? visualO.src : visual.src}`}
                        alt=""
                        className="w-8"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:flex-col lg:flex-row gap-3  items-center">
              <Link href={`/administrador/lugares/${lugar.id}`}>
                <button>
                  <div className="w-[30px] relative   h-[30px] ">
                    <Image src={editar} alt="" />
                  </div>
                </button>
              </Link>
              <button onClick={() => deleteLugar(lugar.id)}>
                <div className="w-[30px] relative   h-[30px] ">
                  <Image src={basura} alt="" />
                </div>
              </button>
              <button onClick={() => ocultarHabilitarLugar(lugar)}>
                <div className="w-[30px] relative   h-[30px] ">
                  <Image
                    src={
                      lugar.estado == ESTADOS_LUGAR.OCULTO ? oculto1 : visual
                    }
                    alt=""
                  />
                </div>
              
              </button>
            </div>
          </div>
          <hr className=" w-[95%] my-5 text-gray-500 m-auto" />
        </div>
      ))}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default listar;
