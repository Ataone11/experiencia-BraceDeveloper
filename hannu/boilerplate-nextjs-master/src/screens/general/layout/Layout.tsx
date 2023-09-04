import Insta from "../../../assets/icons/Component3AUDI.svg";
import Map from "../../../assets/icons/Map.svg";
import { useState } from "react";

const Layout = ({ children }: any) => {
  const [sent, setSent] = useState<boolean>(false);
  return (
    <div className="relative min-h-screen flex flex-col">
      <div
        className={`${
          sent == true ? "opacity-100" : "opacity-0"
        } transition-all duration-300 ease-in-out `}
      >
        <img
          className="w-[280px] lg:w-[310px] mr-8  fixed z-[100] top-[55%] md:top-[62%] right-0"
          src={Map.src}
        />
      </div>
      <div
        className=" bg-[#3ed2b5] gap-3 py-2 lg:py-3 pl-4 pr-8 rounded-l-full flex justify-center items-center fixed z-[100] top-[80%] right-0 cursor-pointer translate-x-[9.2em] hover:translate-x-0 transition-all duration-500 ease-in-out"
        onClick={() => setSent(!sent)}
      >
        <img className="w-8 lg:w-10 mr-8" src={Insta.src} alt="Whatsapp" />
        <span className="text-white">Ayuda visual</span>
      </div>
      {children}
    </div>
  );
};

export default Layout;
