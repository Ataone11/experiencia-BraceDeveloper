import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Vector1 from "../../../assets/Vector.svg";

const NavbarM = () => {
  const [count, setCount] = useState(0);
  const { pathname } = useRouter();
  return (
    <div className="flex w-full items-center md:hidden justify-center gap-2 pt-[15px] md:pt-[25px]">
      <Link href="/">
        <button
          className={`${
            pathname == "/" ? "border-b-4 border-[#9955D4]" : "border-none"
          } flex mx-5`}
          type="button"
          onClick={() => setCount(0)}
        >
          <a
            className={`${
              pathname == "/" ? "text-[#9955D4]" : "text-gray-400"
            } text-lg font-semibold   transition-colors  flex justify-center items-center w-full`}
          >
            Campañas
          </a>
        </button>
      </Link>

      <Link href="/amplifiers">
        <button
          className={`${
            pathname == "/amplifiers" ? "border-b-4 border-[#9955D4]" : "border-none"
          } flex mx-5`}
          type="button"
          onClick={() => setCount(1)}
        >
          <a
            className={`${
              pathname == "/amplifiers" ? "text-[#9955D4]" : "text-gray-400"
            } text-lg font-semibold   transition-colors  flex justify-center items-center w-full`}
          >
            Personas
          </a>
        </button>
      </Link>

      <Link href="/modificar-rifas">
        <button
          className={`${
            pathname == "/modificar-rifas" ? "border-b-4 border-[#9955D4]" : "border-none"
          } flex mx-5`}
          type="button"
          onClick={() => setCount(2)}
        >
          <a
            className={`${
              pathname == "/modificar-rifas" ? "text-[#9955D4]" : "text-gray-400"
            } text-lg font-semibold   transition-colors  flex justify-center items-center w-full`}
          >
            Rifas
          </a>
        </button>
      </Link>
    </div>
  );
};

export default NavbarM;
