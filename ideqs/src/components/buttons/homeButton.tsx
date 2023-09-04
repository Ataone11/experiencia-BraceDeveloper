import Home from "../../../src/assets/administrador/remision/Homei.svg";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const HomeButton = () => {
  const [hovering, setHovering] = useState(false);
  const hover = (e: any) => {
      e.preventDefault()
    setHovering(true);
  };
  const hoverout = (e: any) => {
      e.preventDefault()
    setHovering(false);
  };

  return (
      <Link href={"/administrador"} shallow>
          <button
            onMouseEnter={hover}
            onMouseLeave={hoverout}
            className="w-[55px] h-[55px] lg:hover:w-[100px] duration-300 lg:hover:flex lg:hover:justify-center  bg-azulPrimary900 rounded-full items-center lg:absolute lg:top-0 lg:right-0 lg:m-10"
          >
            {hovering && <span className=" text-white mx-2 hidden lg:inline">Inicio</span>}

            <Image src={Home} layout="fixed" className=" " alt="" />
          </button>
        </Link>
  );
};

export default HomeButton;