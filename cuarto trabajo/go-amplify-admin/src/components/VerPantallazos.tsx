import React, { useEffect, useState } from "react";
import { PulseLoader, ClipLoader } from "react-spinners";
import { estadoPantallazo } from "../redux/actions/personasActions";

import x from "../../src/assets/x.svg";
import { toast } from "react-toastify";
import ImageWithFallback from "./ImageWithFalback";
import { USER_CAMPAIGN_STATES } from "../utils/states-usuario-campaña";
import VerImagen from "./VerImagen";

const VerPantallazos = ({
  campañaId,
  campaña,
  closeDialogue,
  setAprobar,
  loadCampanias,
}: {
  campañaId: any;
  campaña: any;
  closeDialogue: () => void;
  setAprobar: () => void;
  loadCampanias: () => Promise<any>;
}) => {
  const [loading, setLoading] = useState(false);
  const [pantallazoPorVer, setPantallazoPorVer] = useState<any>(null);

  const handleClick = async (id: number) => {
    setLoading(true);
    await estadoPantallazo(id, campaña.usuario.id, {
      aprobar: true,
      razon_rechazo_pantallazos: null,
    });
    setLoading(false);
    toast.success("Pantallazos aceptados!");
    await loadCampanias();
    closeDialogue();
  };

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      <div className="container shadow-2xl flex rounded-2xl flex-col justify-center mx-auto text-center bg-white   max-w-[550px] my-2">
        <div className="flex flex-col justify-center gap-4  px-6 md:px-10 my-5">
          <div
            className="flex w-full justify-end mx-2 cursor-pointer"
            onClick={closeDialogue}
          >
            <img src={x.src} className="flex justify-end my-2" alt="" />
          </div>
          <h1
            className="text-blue-600 text-3xl font-semibold my-3"
          >
            Imagenes Subidas
          </h1>
          <div className="flex flex-col gap-y-2">
            {campaña.pantallazos
              .filter((p: any) => p.aprobado !== false)
              .map((pantallazo: any, index: number) => (
                <div
                  onClick={() => setPantallazoPorVer(pantallazo)}
                  className="flex justify-between items-center gap-x-2 cursor-pointer"
                  key={index}
                >
                  <ImageWithFallback
                    src={pantallazo.ruta}
                    width={80}
                    height={60}
                    layout="fixed"
                    className="rounded-md pt-5 z-10"
                    objectFit="cover"
                    objectPosition="center-top"
                  />
                  <h1 className="max-w-[80%] text-ellipsis overflow-hidden ">
                    {
                      pantallazo.ruta.split("/")[
                      pantallazo.ruta.split("/").length - 1
                      ]
                    }
                  </h1>
                </div>
              ))}
          </div>
        </div>
        {
          loading ?
            <div className="flex justify-center w-full py-10 m-auto">
              <PulseLoader className="m-auto" color="#9955D4" />
            </div> :
            <div className="container rounded-b-2xl  bg-gray-100  overflow-x-scroll md:overflow-hidden flex justify-around items-center">
              <div className="flex justify-start text-gray-400">
                {campaña.pantallazos.filter((p: any) => p.aprobado !== false)
                  .length + " "}{" "}
                items
              </div>

              <div
                className={`${campaña.estado === USER_CAMPAIGN_STATES.PANTALLAZOS_EN_REVISION
                    ? "flex justify-end"
                    : "hidden"
                  }`}
              >
                <button
                  onClick={() => handleClick(campañaId)}
                  className="text-base rounded-lg py-2 px-0 lg:px-4  font-myriad w-[84px] md:w-[104px] align-middle text-center text-white my-5 mx-2 bg-[#5AAB58]"
                >
                  Aprobar
                </button>
                <button
                  onClick={setAprobar}
                  className="text-base rounded-lg py-2 px-0 lg:px-4  font-myriad w-[84px] md:w-[104px] align-middle text-center  text-white my-5 mx-2 bg-[#EC6363]"
                >
                  Rechazar
                </button>
              </div>
            </div>
        }

      </div>
      {pantallazoPorVer && (
        <VerImagen
          ruta={pantallazoPorVer.ruta}
          closeDialogue={() => setPantallazoPorVer(null)}
        />
      )}
    </div>
  );
};

export default VerPantallazos;
