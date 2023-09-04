import React, { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";

import x from "../../src/assets/x.svg";
import { rechazarUsuario } from "../redux/actions/personasActions";
import { toast } from "react-toastify";

const ConfirmarRechazo = ({
  id,
  closeDialogue,
  reload,
}: {
  id: any;
  closeDialogue: () => void;
  reload: () => void;
}) => {
  const Rechazar = async (id: any) => {
    setLoading(true);
    await rechazarUsuario(id);
    setLoading(false);
    closeDialogue();
    toast.success("Usuario rechazado!");
    reload();
  };
  const [igual, setIgual] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      <div className="container shadow-2xl flex rounded-2xl justify-center mx-auto text-center bg-white px-6 md:px-10 md:py-3 max-w-[550px] my-2">
        {loading ? (
          <div className="flex justify-center w-full py-2 m-auto">
            <PulseLoader className="m-auto" color="#9955D4" />
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-4">
            <div
              className="cursor-pointer flex w-full justify-end mx-2 my"
              onClick={closeDialogue}
            >
              <img src={x.src} className="flex justify-end my-2" alt="" />
            </div>
            <h1 className="text-blue-600 text-3xl font-semibold my-3">
              Rechazar Amplifier
            </h1>
            <h1 className="text-gray-400">
              ¿Estas seguro de que quieres rechazar este Amplifier?
            </h1>

            <div className="flex justify-center">
              <button
                onClick={() => Rechazar(id)}
                className="text-base rounded-lg py-2 px-0 lg:px-4  font-myriad w-[84px] md:w-[104px] align-middle text-center text-white my-5 mx-2  bg-gradient-to-r from-[#9955D4] to-[#425AC5]"
              >
                Rechazar
              </button>
              <button
                onClick={() => closeDialogue()}
                className="text-base rounded-lg py-2 px-0 lg:px-4  font-myriad w-[84px] md:w-[104px] align-middle text-center  my-5 mx-2 bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmarRechazo;
