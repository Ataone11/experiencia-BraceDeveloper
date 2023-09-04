import React, { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";

import x from "../../src/assets/x.svg";
import { aprobarUsuario, updateInstagram } from "../redux/actions/personasActions";
import { toast } from "react-toastify";

const ConfirmarSeguidores = ({
  id,
  closeDialogue,
  load,
}: {
  id: any;
  closeDialogue: () => void;
  load: () => void;
}) => {
  const [usuario, setUsuario] = useState<any>(null);
  const handleChange = (e: any) => {
    e.preventDefault();
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };
  
  const update = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await updateInstagram(id, usuario);
    await aprobarUsuario(id);
    setLoading(false);
    closeDialogue();
    toast.success("Instagram corregido!");
    load();
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      <div className="container shadow-2xl flex rounded-2xl justify-center mx-auto text-center bg-white px-6 md:px-10 md:py-3 max-w-[550px] my-2">
        <form onSubmit={update} className="flex flex-col justify-center gap-4">
          <div
            className="flex w-full justify-end mx-2 my cursor-pointer"
            onClick={closeDialogue}
          >
            <img src={x.src} className="flex justify-end my-2 cursor-pointer" alt="" />
          </div>
          <h1 className="text-blue-600 text-3xl font-semibold my-3">
            Aceptar Amplifier
          </h1>
          <h1 className="text-gray-400">
            Para aceptar a este usuario deberas validar los siguientes datos de
            forma manual:
          </h1>
          <div className="flex justify-start flex-col text-left text-red-500">
            Usuario de instagram
            <input
              className="border-b border-red-500  py-3 pl-3 focus:outline-none"
              name="instagram"
              onChange={handleChange}
              type="text"
              required
            />
            <br />
            Número de seguidores
            <input
              className="border-b border-red-500 py-3 pl-3 focus:outline-none"
              name="seguidores"
              onChange={handleChange}
              type="number"
              required
            />
          </div>

          {loading ? (
            <div className="flex justify-center w-full py-2 m-auto">
              <PulseLoader className="m-auto" color="#9955D4" />
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                type="submit"
                className="text-base rounded-lg py-2 px-0 lg:px-4  font-myriad w-[84px] md:w-[104px] align-middle text-center text-white my-5 mx-2 bg-gradient-to-r from-[#9955D4] to-[#425AC5]"
              >
                Aprobar
              </button>
              <button
                onClick={closeDialogue}
                className="text-base rounded-lg py-2 px-0 lg:px-4  font-myriad w-[84px] md:w-[104px] align-middle text-center my-5 mx-2 bg-white border-2 border-gradient-to-r from-[#9955D4] to-[#425AC5] text-[#9955D4]"
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ConfirmarSeguidores;
