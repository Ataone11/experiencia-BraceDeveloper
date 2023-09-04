import x from "../../src/assets/icons/x.svg";
import editar from "../../src/assets/icons/Group 127editar.svg";
import chulo from "../../src/assets/icons/chulo.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getLoadingLugares,
  getLugaresState,
  getErrorLugares,
} from "../../src/redux/reducers/lugaresReducer";
import {
  getPendientes,
  habilitarLugarById,
  rechazarLugarById,
} from "../../src/redux/actions/lugaresActions";
import { ESTADOS_LUGAR } from "../../src/enums/estados.enum";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import { getLugaresPendientesState } from "../../src/redux/reducers/pendientesReducer";
import CrearLugar from "../crear-lugar";
import Link from "next/link";

const pendientes = () => {
  const { lugares, lugaresCompletos } = useSelector(getLugaresPendientesState);
  const error = useSelector(getErrorLugares);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lugaresCompletos) {
      getPendientes(dispatch);
    }
  }, [lugaresCompletos]);

  const habilitarLugar = async (lugar: any) => {
    setLoading(true);
    const res = await habilitarLugarById(lugar, dispatch);
    setLoading(false);
    if (res && res.error) {
      toast.error(res.message);
    } else {
      const mensaje = "El lugar fue habilitado exitosamente";
      toast.success(mensaje);
    }
  };
  const rechazarLugar = async (lugar: any) => {
    setLoading(true);
    const res = await rechazarLugarById(lugar, dispatch);
    setLoading(false);
    if (res && res.error) {
      toast.error(res.message);
    } else {
      const mensaje = "El lugar fue rechazado";
      toast.success(mensaje);
    }
  };

  return (
    <div className="container mx-auto my-5 shadow-lg rounded flex w-[90%] flex-col ">
      {lugares?.map((lugar: any) => (
        <div className="flex flex-col mx-auto w-[90%] h-[68px] md:h-[75px] my-5">
          <div className="flex flex-row justify-between items-center">
            <div className="my-5 md:my-0 md:mx-8 text-lg font-bold text-gray-600 max-w-[50%] break-all">
              {lugar.nombre}
            </div>

            <div className="md:flex flex-row gap-x-5">
              <Link href={`/administrador/lugares/${lugar.id}`}>
                <button className="mx-1">
                  <img src={editar.src} alt="" className="w-8 " />
                </button>
              </Link>
              <button
                className="md:hidden mx-1"
                onClick={() => habilitarLugar(lugar)}
              >
                <img src={chulo.src} alt="" className="w-8 " />
              </button>
              <button
                className="md:hidden mx-1"
                onClick={() => rechazarLugar(lugar)}
              >
                <img src={x.src} alt="" className="w-8 " />
              </button>
              <button
                onClick={() => habilitarLugar(lugar)}
                className="bg-[#3ed2b5] hidden md:block rounded-full py-1 px-3 text-white font-myriad w-[104px] h-[35px] align-middle text-center my-5 mx-2"
              >
                Aprobar
              </button>
              <button
                onClick={() => rechazarLugar(lugar)}
                className="bg-red-400 hidden md:block rounded-full py-1 px-3 text-white font-myriad w-[104px] h-[35px] align-middle text-center my-5 mx-2"
              >
                Rechazar
              </button>
            </div>
          </div>
          <hr className=" w-[95%] my-5 text-gray-500 m-auto" />
        </div>
      ))}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default pendientes;
