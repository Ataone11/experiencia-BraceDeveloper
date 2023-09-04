import Link from "next/link";
import Vector1 from "../../../assets/icons/Vector1.svg";
import Vector2 from "../../../assets/icons/VectorU.svg";
import Iconochat from "../../../assets/icons/Icono chat.svg";
import Vectorll from "../../../assets/icons/llave.svg";

const NavbarM = ({ id }: { id: number }) => {
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
      title: "Admin",
      icon: Vectorll,
    },
  ];
  return (
    <div className="">
      <div className="bg-white  w-full h-[60px]  flex z-[999]  md:hidden  items-center justify-center fixed bottom-0">
        <div className="flex w-full max-w-[1500px] items-center md:hidden shadow-lg">
          <Link href="/administrador">
            <a className="text-base font-semibold hover:text-redOmega transition-colors py-2  flex justify-center items-center w-full">
              <img
                src={Vector1.src}
                className="hover:scale-105 transition-all cursor-pointer stroke-black"
                alt=""
              />
            </a>
          </Link>

          <Link href="/asesorias">
            <a className="text-base font-semibold hover:text-redOmega transition-colors py-2  flex justify-center items-center w-full">
              <img
                src={dataSecure[id].icon.src}
                className="hover:scale-105 transition-all cursor-pointer"
                alt=""
              />
            </a>
          </Link>

          <Link href="/seguros">
            <a className="text-base font-semibold hover:text-redOmega transition-colors py-2 flex justify-center items-center w-full">
              <img
                src={Iconochat.src}
                className="hover:scale-105 transition-all cursor-pointer"
                alt=""
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarM;
