
import React, { useEffect, useState } from "react";

import LeftArrowIcon from "../src/assets/paginacion/iz.svg";
import RightArrowIcon from "../src/assets/paginacion/der.svg";


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
              ? "text-white border-[#9955D4] bg-gradient-to-r from-[#005C90] to-[#425AC5] "
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
