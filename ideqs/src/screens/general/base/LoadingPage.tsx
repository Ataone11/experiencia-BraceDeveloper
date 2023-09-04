import React from "react";
import { useSelector } from "react-redux";
import { selectLoadingSatate } from "../../../redux/reducers/pageReducer";

const LoadingPage = () => {
  const loading = useSelector(selectLoadingSatate);
  if (!loading) return <></>;
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-25 w-full h-full z-40 justify-center items-center flex text-azulPrimary900 ">
      Cargando...
    </div>
  );
};

export default LoadingPage;
