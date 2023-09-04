import CerrarSesion from "../assets/CerrarSesion";
import Pagos from "../assets/Pagos";
import Categorias from "../assets/Categorias";
import Importadores from "../assets/Importadores";
import Ayuda from "../assets/Ayuda";
import Proveedor from "../assets/Proveedor";
import ButtonSidebar from "./ButtonSidebar";
import Productos from "../assets/Productos";
import colores from "../src/utils/colores";
import { useDispatch } from "react-redux";
import { signOutWithAmazon } from "../src/redux/actions/authActions";
import { useRouter } from "next/router";
import ShoppingCart from "../assets/shoppingCart";

const OPTIONS = [
  {
    Icon: Proveedor,
    name: "Providers",
    initialRoute: "/providers/approved",
    rootRoute: "/providers",
    options: [
      {
        route: "/providers/approved",
        name: "Aprobados",
      },
      {
        route: "/providers/waiting-approval",
        name: "Por aprobar",
      },
    ],
  },
  {
    Icon: Importadores,
    name: "Importadores",
    initialRoute: "/importers",
    rootRoute: "/importers",
  },
  {
    Icon: Categorias,
    name: "Categorías",
    initialRoute: "/categories",
    rootRoute: "/categories",
  },
  {
    Icon: ShoppingCart,
    name: "Shopping",
    initialRoute: "/shopping/orders",
    rootRoute: "/shopping",
    options: [
      {
        route: "/shopping/orders",
        name: "Pedidos",
      },
      {
        route: "/shopping/samples",
        name: "Muestras",
      },
    ],
  },
  {
    Icon: Ayuda,
    name: "Solicitudes de ayuda",
    initialRoute: "/help-requests",
    rootRoute: "/help-requests",
  },
  {
    Icon: Pagos,
    name: "Pagos",
    initialRoute: "/payments",
    rootRoute: "/payments",
  },
];

const SideBar = ({ showMenu }: { showMenu: boolean }) => {
  const dispatch = useDispatch();
  const redirect = useRouter();

  const logoutUser = async () => {
    const res = await signOutWithAmazon(dispatch);
    redirect.push("/");
  };

  return (
    <div
      className={`fixed z-[1] w-[229px] h-[calc(100vh-66px)] bg-white py-10 px-6 flex flex-col justify-between shadow-lg lg:shadow-transparent ${
        !showMenu ? "-left-full lg:left-0" : "left-0"
      } transition-all duration-500 ease-in-out border`}
    >
      <div className="">
        {OPTIONS.map((item) => (
          <ButtonSidebar key={item.name} button={item} />
        ))}
      </div>
      <button
        onClick={() => logoutUser()}
        className="flex items-center w-full gap-x-3 py-4 px-3 rounded-xl cursor-pointer"
      >
        <span>
          <CerrarSesion color={colores.Principal} />
        </span>
        <p className={`text-base w-full text-left font-bold text-Principal`}>
          Cerrar sesión
        </p>
      </button>
    </div>
  );
};

export default SideBar;
