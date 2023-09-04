import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import SortBy from "../../../components/SortBy";

const SORT_CRITERIAS: any = {
  0: {
    name: "Todos",
  },
  1: {
    name: "Proveedores",
  },
  2: {
    name: "Importadores",
  },
};

interface FiltersOptionsProps {
  filters: any;
  setFilters: any;
}

const FilterOptions = ({ filters, setFilters }: FiltersOptionsProps) => {
  const handleChangeKeyword = (e: any) => {
    setFilters({ ...filters, name: e.target.value });
  };
  const { t } = useTranslation();
  return (
    <div className="px-5 xl:px-[50px] pt-[25px] pb-5 xl:pb-[43px] flex flex-col w-full sm:w-[476px] box-border max-w-full">
      <form className="min-w-[230px] w-full">
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="textToSearch"
            onChange={handleChangeKeyword}
            // disabled={loading}
            value={filters.name}
            autoComplete="off"
            className="block p-3 pl-10 w-full text-sm text-Principal font-semibold bg-gray-100 rounded-lg focus:outline-none disabled:cursor-not-allowed"
            placeholder="Buscar en la tabla..."
          />
        </div>
      </form>
      <div className="flex flex-col items-center xs:flex-row sm:flex-col xl:flex-row mt-6 justify-between w-full ">
        <div className="flex justify-between">
          <button
            onClick={() =>
              setFilters((prev: any) => ({
                ...prev,
                status: prev.status === 1 ? null : 1,
              }))
            }
            className={`border rounded-lg px-[20px] py-[10px] text-sm font-semibold disabled:cursor-not-allowed mr-2 ${
              filters.status === 1
                ? "bg-Principal text-white border-Principal hover:bg-PrincipalHover hover:border-PrincipalHover"
                : "bg-white text-Principal hover:bg-[#F1F6FD] border-Principal"
            }`}
          >
            {t("chat:open")}
          </button>
          <button
            onClick={() =>
              setFilters((prev: any) => ({
                ...prev,
                status: prev.status === 2 ? null : 2,
              }))
            }
            className={`border rounded-lg px-[20px] py-[10px] text-sm font-semibold disabled:cursor-not-allowed ${
              filters.status === 2
                ? "bg-Principal text-white border-Principal hover:bg-PrincipalHover hover:border-PrincipalHover"
                : "bg-white text-Principal hover:bg-[#F1F6FD] border-Principal"
            }`}
          >
            {t("chat:closed")}
          </button>
        </div>
        <div className="mt-5 xs:mt-0 sm:mt-5 xl:mt-0">
          <SortBy
            selectedSortOrder={filters.role}
            setSelectedSortOrder={(role) => setFilters({ ...filters, role })}
            sortCriterias={SORT_CRITERIAS}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
