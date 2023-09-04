import Image from "next/image";
import React, { useEffect, useState } from "react";
import basura from "../assets/basura.svg";
import arriba from "../assets/arriba.svg";
import EliminarCampaña from "./EliminarCampaña";
import { PulseLoader } from "react-spinners";
import { getCampanias } from "../redux/actions/campaniasActions";
import moment from "moment";
import { ORDENES } from "../enums/ordenes.enum";
import {
  CAMPAIGN_STATES_NAMES,
  ESTADOS_CAMPAÑA,
} from "../enums/estados-campaña.enum";
import LeftArrowIcon from "../../src/assets/iz.svg";
import RightArrowIcon from "../../src/assets/der.svg";
import { useDebounce } from "use-debounce";

interface PaginacionProps {
  currentPage: number;
  lastPage: number;
  previousPage: () => void;
  nextPage: () => void;
  setCurrentPage: (newPage: number) => void;
}

const Paginacion = ({
  currentPage,
  lastPage,
  previousPage,
  nextPage,
  setCurrentPage
}: PaginacionProps) => {
  return (
    <div className="container mx-auto flex gap-2 my-5 justify-center">
      {currentPage > 1 && (
        <button
          onClick={previousPage}
          className="border-2 py-2 px-2 rounded-md  font-myriad w-[30px] h-[30px] text-center"
        >
          <img src={LeftArrowIcon.src} className="" alt="" />
        </button>
      )}
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page: number) => (
        <h1
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${
            currentPage == page
              ? "text-white border-[#9955D4] bg-gradient-to-r from-[#9955D4] to-[#425AC5] "
              : "bg-gray-200"
          } border rounded-md  font-myriad w-[30px] h-[30px] text-center items-center cursor-pointer`}
        >
          {page}
        </h1>
      ))}
      {currentPage < lastPage && (
        <button
          onClick={nextPage}
          className="border-2 py-2 px-2 rounded-md  font-myriad w-[30px] h-[30px]   text-center"
        >
          <img src={RightArrowIcon.src} className="" alt="" />
        </button>
      )}
    </div>
  );
};

export default Paginacion;
