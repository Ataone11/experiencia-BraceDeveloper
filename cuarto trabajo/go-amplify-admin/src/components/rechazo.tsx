import Image from "next/image";
import React, { useEffect, useState } from "react";
import campaña from "../assets/campaña.svg";
import basura from "../assets/basura.svg";
import arriba from "../assets/arriba.svg";
import axios from "axios";
import { PulseLoader, ClipLoader } from "react-spinners";
import { estadoPantallazo } from "../redux/actions/personasActions";
import moment from "moment";
import x from "../../src/assets/x.svg";
import { S3_BUCKET_URL } from "../utils/constants";
import { json } from "stream/consumers";
import { toast } from "react-toastify";
import Router from "next/router";

const Rechazo = ({
  campañaId,
  usuario,
  closeDialogue,
  loadCampanias,
  aprobar
}: {
  campañaId: any;
  usuario: any;
  closeDialogue: () => void;
  loadCampanias: () => void;
  aprobar: ()=> void
}) => {
  const [loading, setLoading] = useState(false);
  const [pantallazo, setPantallazo] = useState<any>(null);

  useEffect(() => {
    if (!pantallazo) {
      setPantallazo({
        aprobar: false,
        razon_rechazo_pantallazos:
          "No cumple con los requerimientos de la usuario",
      });
    }
  }, [pantallazo]);
  const handleClick = async () => {
    setLoading(true);
    await estadoPantallazo(campañaId, usuario.usuario.id, pantallazo);
    setLoading(false);
    toast.success("Pantallazos rechazados!");
    loadCampanias();
    aprobar()
    closeDialogue();
  };

  const handleChange = (e: any) => {
    if (e.target.name === "razon_rechazo_pantallazos") {
      setPantallazo({ ...pantallazo, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      {loading ? (
        <div className="flex justify-center w-full py-2 m-auto">
          <PulseLoader className="m-auto" color="#9955D4" />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="container shadow-2xl flex rounded-2xl flex-col justify-center mx-auto text-center bg-white   max-w-[550px] my-2">
            <div className="flex flex-col justify-center gap-4  px-6 md:px-10 my-5">
              <div
                className="flex w-full justify-end mx-2 my cursor-pointer"
                onClick={closeDialogue}
              >
                <img src={x.src} className="flex justify-end my-2" alt="" />
              </div>
              <h1 className="text-blue-600 text-3xl font-semibold my-3">
                Opciones de rechazo
              </h1>
              <div className="flex flex-col">
                <div className="flex justify-start gap-5 my-4">
                  <input
                    type="radio"
                    name="razon_rechazo_pantallazos"
                    onChange={handleChange}
                    value={"No se ven visualizaciones"}
                  />
                  <h1>No se ven visualizaciones</h1>
                </div>
                <div className="flex justify-start gap-2 md:gap-5 my-4">
                  <input
                    type="radio"
                    name="razon_rechazo_pantallazos"
                    onChange={handleChange}
                    value={"No cumple con los requerimientos de la usuario"}
                  />
                  <h1>No cumple con los requerimientos de la usuario</h1>
                </div>
                <div className="flex justify-start gap-5 my-4">
                  <input
                    type="radio"
                    name="razon_rechazo_pantallazos"
                    onChange={handleChange}
                    value={"Las imagenes son de mala calidad"}
                  />
                  <h1>Las imagenes son de mala calidad</h1>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleClick()}
              className={`text-base rounded-lg py-2 px-4  font-myriad w-[124px] md:w-[164px] align-middle text-center my-5 mx-auto bg-[#425AC5] text-white`}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rechazo;
