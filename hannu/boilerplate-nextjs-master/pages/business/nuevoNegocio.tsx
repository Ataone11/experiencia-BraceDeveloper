import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getLoadingLugares,
  getLugaresState,
  getErrorLugares,
} from "../../src/redux/reducers/lugaresReducer";
import { ACCESIBILIDADES, S3_BUCKET_URL } from "../../src/utils/constants";
import { NextPage } from "next";
import BasePage from "../../src/screens/general/base/BasePage";
import { getDepart } from "../../src/redux/actions/departamentosActions";
import {
  getDepartamentosState,
  getErrorD,
} from "../../src/redux/reducers/departamentosReducer";
import { ESTADOS_LUGAR } from "../../src/enums/estados.enum";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";
import Link from "next/link";
import Map from "../../src/assets/icons/map.svg";
import { createNegocio } from "../../src/redux/actions/negociosActions";

const Business = () => {
  const { lugares, lugaresCompletos } = useSelector(getLugaresState);
  const departamentos = useSelector(getDepartamentosState);
  const error = useSelector(getErrorLugares);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [oculto, setOculto] = useState(false);
  const [lugar, setLugar] = useState<any>({
    nombre: "",
    nit: "",
    telefono: "",
    correo: "",
    usuario: "",
    latitud: "",
    departamento: "",
  });

  useEffect(() => {
    if (!departamentos) {
      getDepart(dispatch);
    }
  }, [departamentos]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res: any = await createNegocio(lugar, dispatch);
    if (res.statusCode === 200) {
      setLoading(false);
      toast.success("Negocio creado exitosamente!");
      router.push("/administrador");
    } else {
      setLoading(false);
      console.log(res.data.response.data.message);
      toast.error(res.data.response.data.message);
    }
  };
  const handleChange = (e: any) => {
    setLugar({ ...lugar, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="container mx-auto my-5  flex w-[90%] md:w-[90%] lg:w-[80%]  flex-col"
      onSubmit={handleSubmit}
    >
      <h1 className="text-4xl mx-auto my-5 font-bold">Registra tu negocio</h1>
      <div className="xl:flex xl:flex-row xl:divide-x mx-5">
        <div className="w-full mx-5">
          <div className="w-full md:w-[80%] lg:w-[70%]  mx-auto">
            <h1 className="font-bold my-5">Nombre del negocio</h1>
            <input
              className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
              name="nombre"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-[80%] lg:w-[70%]  mx-auto">
            <h1 className="font-bold my-5">Nit</h1>
            <input
              className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
              name="nit"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-[80%] lg:w-[70%]  mx-auto">
            <h1 className="font-bold my-5">Correo electronico</h1>
            <input
              className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
              name="correo"
              type="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-[80%] lg:w-[70%]  mx-auto">
            <h1 className="font-bold my-5">Numero Celular</h1>
            <input
              className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
              name="telefono"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-[80%] lg:w-[70%]  mx-auto">
            <h1 className="font-bold my-5">Usuario</h1>
            <input
              className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
              name="usuario"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="w-full mx-5">
          <div className="w-full md:w-[80%] lg:w-[70%]  flex flex-row justify-center mx-auto">
            <h1 className="font-bold my-5">Dirección del sitio:</h1>
            <input
              className="border-black appearance-none block w-full h-[45px]  text-gray-700 border border-greyOmega rounded-lg my-5 mx-2  py-2 px-3 mb-3 leading-tight focus:outline-none "
              name="latitud"
              type="text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="justify-center my-5 mx-32 ">
            <Image
              src={Map}
              width={400}
              height={200}
              layout="fixed"
              className="rounded-xl pt-5 z-10 mx-auto"
              objectFit="cover"
              objectPosition="center-top"
            />
            <h1 className="text-xs w-[120px]">
              las cordenadas no son correctas?
            </h1>
          </div>
          <div className="w-full md:w-[80%] lg:w-[70%]  mx-auto">
            <h1 className="font-bold my-5">Despartamento</h1>
            <div className="w-full  mx-auto">
              <select
                className="border-black appearance-none block w-full h-[40px]  text-gray-700 border border-greyOmega rounded-lg my-5 mx-2  py-2 px-3 mb-3 leading-tight focus:outline-none "
                aria-label="Default select example"
                name="departamento"
                onChange={handleChange}
              >
                <option>Seleccione departamento</option>
                {departamentos?.map((categoria) => (
                  <option
                    value={categoria.id}
                    selected={lugar.categoria === categoria.id}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex justify-center my-5">
        <button
          className="bg-blueHannu rounded-full py-1 px-3 text-white font-myriad w-[154px] h-[35px] align-middle text-center my-5 mx-2"
          type="submit"
        >
          Registrar negocio
        </button>
      </div>
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
    </form>
  );
};

export default Business;
