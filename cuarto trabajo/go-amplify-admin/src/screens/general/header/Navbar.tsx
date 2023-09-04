import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import logo from "../../../assets/logo.svg";
import Vector1 from "../../../assets/Vector.svg";
import { signOutWithAmazon } from "../../../redux/actions/authActions";
import NavbarM from "./NavbarM";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();

  return (
    <div className="bg-white min-w-[320px] w-full sticky inset-0 m-auto shadow-lg flex-col sm:flex px-5 md:px-5 z-[20] py-5 md:py-5 rounded-b-lg">
      <div className="max-w-[1750px] mx-auto w-full relative flex justify-between items-center ">
        <div className="flex w-full justify-between">
          <Link href={"/"}>
            <img
              src={logo.src}
              className="hover:scale-105 transition-all cursor-pointer w-[200px]"
              alt=""
            />
          </Link>
          <button onClick={() => signOutWithAmazon(dispatch)} className="flex justify-end sm:hidden">
            <Image
              src={Vector1.src}
              width={30}
              height={30}
              layout="fixed"
              className=""
            />
          </button>
        </div>

        <div className="sm:flex w-full max-w-[1500px] mx-auto items-center hidden justify-end gap-2 lg:gap-7">
          <Link href="/">
            <button
              className={`${pathname == "/"
                ? "border-b-2 border-[#9955D4] transition-opacity2"
                : "border-none"
                } flex mx-5`}
              type="button"
            >
              <a
                className={`${pathname == "/"
                  ? "text-[#9955D4] transition-opacity2"
                  : "text-gray-400"
                  } text-2xl font-semibold   transition-colors  flex justify-center items-center w-full`}
              >
                Campañas
              </a>
            </button>
          </Link>

          <Link href="/amplifiers">
            <button
              className={`${pathname == "/amplifiers"
                ? "border-b-2 border-[#9955D4] transition-opacity2"
                : "border-none"
                } flex mx-5`}
              type="button"
            >
              <a
                className={`${pathname == "/amplifiers"
                  ? "text-[#9955D4] transition-opacity2"
                  : "text-gray-400"
                  } text-2xl font-semibold   transition-colors  flex justify-center items-center w-full`}
              >
                Personas
              </a>
            </button>
          </Link>

          <Link href="/modificar-rifas">
            <button
              className={`${pathname == "/modificar-rifas"
                ? "border-b-2 border-[#9955D4] transition-opacity2"
                : "border-none"
                } flex mx-5`}
              type="button"
            >
              <a
                className={`${pathname == "/modificar-rifas"
                  ? "text-[#9955D4] transition-opacity2"
                  : "text-gray-400"
                  } text-2xl font-semibold   transition-colors  flex justify-center items-center w-full`}
              >
                Rifas
              </a>
            </button>
          </Link>
          <button onClick={() => signOutWithAmazon(dispatch)} className="flex justify-end">
            <Image
              src={Vector1.src}
              width={30}
              height={30}
              layout="fixed"
              className="" />
          </button>
        </div>
      </div>
      <div className="flex sm:hidden mx-auto flex-wrap">
        <NavbarM />
      </div>
    </div >
  );
};

export default Navbar;
