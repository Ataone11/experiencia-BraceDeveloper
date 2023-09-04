
import type { NextPage } from "next";
import { useState } from "react";
import BasePage from "../../../src/screens/general/base/BasePage";
import CrearCampaña from "../../crear/CrearCampaña";
import Home from "../../../src/components/persons";

const EditarCampaña: NextPage = () => {
  const [personas, setPersonas] = useState(false);
  return (
    <BasePage title="Editando campaña">
      <div className=" mx-auto flex justify-center lg:gap-32 py-10">
        <button
          className={`${personas === false
            ? "border-b-4 lg:border-b-2 border-[#9955D4] transition-opacity2"
            : "border-none"
            } flex mx-5`}
          type="button"
          onClick={() => setPersonas(false)}
        >
          <a
            className={`${personas === false
              ? "text-[#9955D4] transition-opacity2"
              : "text-gray-400"
              } lg:text-2xl font-semibold   transition-colors  flex justify-center items-center w-full`}
          >
            Detalle de campaña
          </a>
        </button>
        <button
          className={`${personas === true
            ? "border-b-4 lg:border-b-2 border-[#9955D4] transition-opacity2"
            : "border-none"
            } flex mx-5`}
          type="button"
          onClick={() => setPersonas(true)}
        >
          <a
            className={`${personas === true
              ? "text-[#9955D4] transition-opacity2"
              : "text-gray-400"
              } lg:text-2xl font-semibold   transition-colors  flex justify-center items-center w-full`}
          >
            Personas Inscritas
          </a>
        </button>

      </div>
      {!personas ? <CrearCampaña /> : <Home />}

    </BasePage>
  );
};
export default EditarCampaña;
