import Image from "next/image";
import React, { useState } from "react";
import SortIcon from "./../../assets/sort.svg";

const SORT_CRITERIAS: any = {
  DESC: {
    name: "Más reciente",
  },
  ASC: {
    name: "Más antiguo",
  },
};

interface SortByParams {
  selectedSortOrder: string | any;
  setSelectedSortOrder: (newSelectedSortOrder: any) => void;
  sortCriterias?: any;
}

const SortBy = ({
  selectedSortOrder,
  setSelectedSortOrder,
  sortCriterias = SORT_CRITERIAS,
}: SortByParams) => {
  const [open, setOpen] = useState(false);

  const selectCriteria = (newCriteria: string) => {
    if (newCriteria === selectedSortOrder) setSelectedSortOrder(null);
    else setSelectedSortOrder(newCriteria);

    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        type="submit"
        className="bg-Claro text-Oscuro text-[0.9rem] px-[1rem] h-[2.3rem] rounded-[0.5rem] flex justify-center items-center"
      >
        <p className="mr-[0.5rem]">
          {selectedSortOrder
            ? sortCriterias[selectedSortOrder].name
            : "Ordenar"}
        </p>
        <Image
          alt=""
          src={SortIcon}
          className={`${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="rounded-[10px] border-[1px] border-backgroundPage overflow-hidden flex flex-col absolute z-10 bg-white top-[120%] w-[130px]">
          {Object.keys(sortCriterias).map((key: string) => (
            <span
              key={key}
              className={`px-[20px] py-[7.5px] text-[13px] text-Principal cursor-pointer hover:font-bold ${
                selectedSortOrder === key ? "font-bold" : ""
              }`}
              onClick={() => selectCriteria(key)}
            >
              {sortCriterias[key].name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
