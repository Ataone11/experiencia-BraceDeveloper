import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getLugaresById } from "../../src/redux/actions/negociosActions";
import { getNegocioById } from "../../src/redux/reducers/negocioReducer";
import { ESTADOS_LUGAR } from "../../src/enums/estados.enum";

import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const pendiente = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const lugarId = router.query.id;
  const currentLugar: any = useSelector((state: any) =>
    getNegocioById(state, lugarId as any)
  );

  console.log(currentLugar);

  useEffect(() => {
    if (!currentLugar && lugarId) {
      getLugaresById(dispatch, lugarId as any);
    }
  }, [currentLugar, lugarId]);

  return (
    <div>
      <div className="container mx-auto flex md:justify-center">
        <h1 className="text-2xl md:text-4xl lg:mx-5 mx-auto my-10 font-bold">
          Registra tu negocio
        </h1>
      </div>
      <div className="lg:flex lg: flex-row gap-5">
        <div className="container mx-auto lg:mx-10 my-5 shadow-md rounded  w-[90%]">
          <h1 className="text-gray-400 font-semibold text-lg mx-5 lg:mx-14 my-5">
            {moment(currentLugar?.fechaRegistro).format("DD/MM/YYYY")}
          </h1>
          <h1 className="font-bold text-lg lg:mx-14 mx-5">
            Solicitud del registro
          </h1>
          <h1 className="my-5 text-sm mx-5 flex flex-wrap resize break-all lg:mx-14 w-[90%] lg:w-[70%]">
            {currentLugar?.estado == ESTADOS_LUGAR.PENDIENTE
              ? "En este momento estamos evaluando tu solicitud, por favor regrasa luego para conocer el resultado de esta y ser parte del equipo Hannu."
              : "Tu establecimiento a sido aprobado, gracias a las caracteristicas de accesibilidad y la adaptacion de tu personal con las que cuentas. para ver tu establecimiento dentro de Hannu continúa y verifica que toda la información del lugar."}
          </h1>
          <br className="lg:hidden" />
        </div>
        <div className="container mx-auto lg:mx-10 my-5 shadow-md rounded flex justify-center  w-[90%] lg:w-[20%] flex-col">
          <div className="mx-auto my-10">
            <h1 className="text-orange-600 font-bold lg:font-semibold">
              Estado de solicitud:
            </h1>
            <div
              className={`${
                currentLugar?.estado == ESTADOS_LUGAR.PENDIENTE ||
                currentLugar?.estado == ESTADOS_LUGAR.OCULTO
                  ? "block"
                  : "hidden"
              } `}
            >
              <p
                className={`${
                  currentLugar?.estado == ESTADOS_LUGAR.PENDIENTE
                    ? "bg-gray-100 text-gray-400"
                    : "bg-black"
                } rounded-xl py-1 px-3 text-white font-myriad w-[144px] h-[30px] text-sm align-middle text-center my-5 mx-auto`}
              >
                {currentLugar?.estado == ESTADOS_LUGAR.OCULTO
                  ? "Oculto"
                  : "Pendiente"}
              </p>
            </div>
            <div
              className={`${
                currentLugar?.estado == ESTADOS_LUGAR.APROBADO ||
                currentLugar?.estado == ESTADOS_LUGAR.DENEGADO
                  ? "block"
                  : "hidden"
              } `}
            >
              <p
                className={`${
                  currentLugar?.estado == ESTADOS_LUGAR.APROBADO
                    ? "bg-[#3ed2b5]"
                    : "bg-red-400"
                } rounded-xl py-1 px-3 text-white font-myriad w-[144px] h-[30px] text-sm align-middle text-center my-5 mx-auto`}
              >
                {currentLugar?.estado == ESTADOS_LUGAR.APROBADO
                  ? "Aprobado"
                  : "Denegado"}
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex justify-center my-5"></div>
      </div>
      <div className="mx-auto flex justify-center my-5">
        <button
          className={`${
            currentLugar?.estado == ESTADOS_LUGAR.APROBADO ||
            currentLugar?.estado == ESTADOS_LUGAR.DENEGADO
              ? "block"
              : "hidden"
          } bg-blueHannu rounded-full py-1 px-3 text-white font-myriad w-[154px] h-[35px] text-sm align-middle text-center my-5 mx-auto`}
        >
          Ver sitio en hannu
        </button>
      </div>
    </div>
  );
};

export default pendiente;
