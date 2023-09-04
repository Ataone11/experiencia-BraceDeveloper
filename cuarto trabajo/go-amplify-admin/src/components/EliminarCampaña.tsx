
import React, { useEffect, useState } from "react";

import { PulseLoader } from "react-spinners";
import {
  deleteCampanias,

} from "../redux/actions/campaniasActions";

import x from "../../src/assets/x.svg";
import { ERROR } from "../utils/constants";
import { toast } from "react-toastify";

const EliminarCampaña = ({
  campaña,
  closeDialogue,
  afterDelete,
}: {
  campaña: any;
  closeDialogue: () => void;
  afterDelete: () => void;
}) => {
  const [igual, setIgual] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleClick = async (id: number) => {
    setLoading(true)
    const res = await deleteCampanias(id);
    setLoading(false)

    if(res.status === ERROR) {
      toast.error(res?.data?.response?.data?.message);
      return;
    }
    
    closeDialogue();
    afterDelete();
  };
  const handleChange = (e: any) => {
    if (e.target.value === campaña.titulo) {
      setIgual(false);
    } else {
      setIgual(true);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      <div className="container shadow-2xl flex rounded-2xl justify-center mx-auto text-center bg-white px-6 md:px-10 md:py-3 max-w-[550px] my-2">
        <div className="flex flex-col justify-center gap-4">
          <div
            className="flex w-full justify-end mx-2 my cursor-pointer"
            onClick={closeDialogue}
          >
            <img src={x.src} className="flex justify-end my-2" alt="" />
          </div>
          <h1 className="text-blue-600 text-3xl font-semibold my-3">
            Eliminar Campaña
          </h1>
          <h1 className="text-gray-400">
            Si estas seguro de borrar esta campaña por favor escribe en el
            siguiente recuadro &quot;{campaña.titulo}&quot;
          </h1>
          <input
            className="border border-[#9955D4] rounded-md py-3 pl-3"
            name="titulo"
            onChange={handleChange}
            type="text"
          />
          {loading ? (
            <div className="flex justify-center w-full py-2 m-auto">
              <PulseLoader className="m-auto" color="#9955D4" />
            </div>
          ) : (
            <button
              onClick={() => handleClick(campaña.id )}
              disabled={igual}
              className={`${
                igual
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white"
              }  text-base rounded-lg py-2 px-4  font-myriad w-[124px] md:w-[124px] align-middle text-center my-5 mx-auto`}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EliminarCampaña;
