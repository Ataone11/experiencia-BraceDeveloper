import React, { useEffect, useState } from "react";

import x from "../../src/assets/x.svg";

import ImageWithFallback from "./ImageWithFalback";

const VerImagen = ({
  ruta,
  closeDialogue,
}: {
  ruta: any;
  closeDialogue: () => void;
}) => {

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      <div className="container shadow-2xl flex rounded-2xl justify-center mx-auto text-center bg-white px-6 md:px-10 md:py-3 w-fit my-2 relative h-fit min-h-[400px] min-w-[275px] md:min-w-[400px] md:min-h-[500px] lg:min-w-[500px] lg:min-h-[600px]">
        {/* <form className="flex flex-col justify-center gap-4 relative w-full"> */}
          <div
            className="absolute mx-2 my z-20 w-5 top-2 right-2"
            onClick={closeDialogue}
          >
            <img
              src={x.src}
              className="flex justify-end my-2 cursor-pointer"
              alt=""
            />
          </div>
          <ImageWithFallback
            src={ruta}
            layout="fill"
            className="rounded-md pt-5 z-10 min-h-[400px] min-w-[300px]"
            objectFit="cover"
            objectPosition="center-top"
          />
        {/* </form> */}
      </div>
    </div>
  );
};

export default VerImagen;
