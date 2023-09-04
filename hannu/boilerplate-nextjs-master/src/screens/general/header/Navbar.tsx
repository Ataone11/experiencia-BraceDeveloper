import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/icons/Logo Hannulg.svg";
import Vector1 from "../../../assets/icons/VectorU.svg";
import Vector2 from "../../../assets/icons/Vector2.svg";
import Iconochat from "../../../assets/icons/Icono chat.svg";
import Vectorll from "../../../assets/icons/llave.svg";

const Navbar = ({ id }: { id: number }) => {
  interface Props {
    title?: string;
    icon: any | string;
    id: number;
  }
  if (id > 2) {
    id = 2;
  }

  const dataSecure: Props[] = [
    {
      id: 1,
      title: "Cliente",
      icon: Vector1,
    },
    {
      id: 2,
      title: "Bussines",
      icon: Vector2,
    },
    {
      id: 3,
      title: "Administador",
      icon: Vectorll,
    },
  ];
  return (
    <div className="">
      <div className="bg-white  w-full h-[70px]  sticky inset-0 m-auto shadow-lg flex px-5 z-[999]">
        <div className="max-w-[1750px] mx-auto w-full relative flex flex-row justify-between items-center ">
          <div className="flex justify-center">
            <a href="www.facebook.com" target="_blank">
              <img
                src={logo.src}
                className="hover:scale-105 transition-all cursor-pointer"
                alt=""
              />
            </a>
          </div>
          <div className="md:flex w-full max-w-[1500px] mx-auto items-center hidden justify-end">
            <Link href="/administrador">
              <div className="flex mx-5">
                <svg
                  width="39"
                  height="36"
                  viewBox="0 0 29 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.176348 12.9753C0.176348 13.8776 0.905516 14.5844 1.7319 14.5844H3.28746L3.25343 22.6103C3.25343 22.7507 3.26315 22.881 3.27774 23.0163V23.8284C3.27774 24.9363 4.14787 25.8337 5.22218 25.8337H5.99996C6.05343 25.8337 6.1069 25.7885 6.16038 25.8286C6.22843 25.7885 6.29649 25.8337 6.36454 25.8337H9.11107C10.1854 25.8337 11.0555 24.9363 11.0555 23.8284V19.417C11.0555 18.5297 11.7507 17.8128 12.6111 17.8128H15.7222C16.5826 17.8128 17.2777 18.5297 17.2777 19.417V23.8284C17.2777 24.9363 18.1479 25.8337 19.2222 25.8337H21.9395C22.0125 25.8337 22.0854 25.8286 22.1583 25.8236C22.2166 25.8286 22.275 25.8337 22.3333 25.8337H23.1111C24.1849 25.8337 25.0555 24.9363 25.0555 23.8284V18.2139C25.0555 18.1687 25.0541 18.1186 25.0511 18.0735V14.5844H26.6086C27.4851 14.5844 28.1666 13.8776 28.1666 12.9753C28.1666 12.5241 28.0206 12.123 27.68 11.7721L15.2166 0.568836C14.8763 0.217223 14.4875 0.166992 14.1472 0.166992C13.8069 0.166992 13.418 0.267453 13.1215 0.518605L0.711071 11.7721C0.322182 12.123 0.122875 12.5241 0.176348 12.9753Z"
                    fill="gray"
                  />
                </svg>
                <a className="text-base font-semibold hover:text-redOmega transition-colors  flex justify-center items-center w-full">
                  Inicio
                </a>
              </div>
            </Link>

            <Link href="/crear-lugar">
              <div className="flex mx-5">
                <img
                  src={dataSecure[id].icon.src}
                  className="hover:scale-105 transition-all cursor-pointer mx-3"
                  alt=""
                />
                <a className="text-base font-semibold hover:text-redOmega transition-colors py-2  flex justify-center items-center w-full">
                  {dataSecure[id].title}
                </a>
              </div>
            </Link>

            <Link href="/seguros">
              <div className="flex mx-5">
                <img
                  src={Iconochat.src}
                  className="hover:scale-105 transition-all cursor-pointer mx-3"
                  alt=""
                />
                <a className="text-base font-semibold hover:text-redOmega transition-colors py-2  flex justify-center items-center w-full">
                  Chat
                </a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
