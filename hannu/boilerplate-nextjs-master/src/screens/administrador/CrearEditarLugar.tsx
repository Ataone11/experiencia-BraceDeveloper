import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { getCategorias } from "../../redux/actions/categoriaActions";
import { getCaracteristicas } from "../../redux/actions/caracteristicasActions";
import { getDepart } from "../../redux/actions/departamentosActions";
import {
  createLugar,
  editarLugarById,
  getLugaresById,
} from "../../redux/actions/lugaresActions";
import {
  getCategoriaState,
  getErrorCategoria,
} from "../../redux/reducers/categoriaReducer";
import {
  getCaracteristicaState,
  getErrorCaracteristica,
} from "../../redux/reducers/caracteristicasReducer";
import {
  getDepartamentosState,
  getErrorD,
} from "../../redux/reducers/departamentosReducer";
import Vector2 from "../../assets/icons/Vectoriz.svg";
import Vectorsb from "../../assets/icons/Vectorsb.svg";
import { ACCESIBILIDADES, S3_BUCKET_URL } from "../../utils/constants";
import Map from "../../assets/icons/Map.svg";
import { getLugarPendienteById } from "../../redux/reducers/pendientesReducer";
import { getLugaresPendientesState } from "../../redux/reducers/pendientesReducer";
import { getLugarActivoById } from "../../redux/reducers/lugaresReducer";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import {
  AccesibilidadModel,
  CaracteristicaModel,
} from "../../models/AccesibilidadModel";

const CrearEditarLugar = () => {
  const departamentos = useSelector(getDepartamentosState);
  const error = useSelector(getErrorD);
  const categorias = useSelector(getCategoriaState);
  const accesibilidades = useSelector(getCaracteristicaState);
  const errorac = useSelector(getErrorCaracteristica);
  const errorc = useSelector(getErrorCategoria);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const lugarId = router.query.id;

  useEffect(() => {
    if (!departamentos) {
      getDepart(dispatch);
    }

    if (!categorias) {
      getCategorias(dispatch);
    }

    if (!accesibilidades) {
      getCaracteristicas(dispatch);
    }

    console.log(departamentos);
  }, [departamentos, categorias, accesibilidades]);

  const currentLugarPendiente: any = useSelector((state: any) =>
    getLugarPendienteById(state, lugarId as any)
  );

  const currentLugarActivo: any = useSelector((state: any) =>
    getLugarActivoById(state, lugarId as any)
  );

  const currentLugar: any = currentLugarActivo || currentLugarPendiente;
  const [accecibilidad, setAccecibilidad] = useState<number>(0);
  let re = new RegExp("^https?://[w-]+(.[w-]+)+[/#?]?.*$");

  const [lugar, setLugar] = useState<any>({
    nombre: null,
    nit: null,
    correo: null,
    telefono: null,
    descripcion: null,
    descripcionInterpretada: null,
    latitud: null,
    longitud: null,
    departamento: null,
    video: null,
    categoria: null,
    accesibilidades: [],
    medias: [],
  });

  useEffect(() => {
    const verificarLugar = async () => {
      if (currentLugar) {
        setLugar({
          ...currentLugar,
          mediasBorrar: [],
          accesibilidades: currentLugar.accesibilidades.map(
            (accesibilidad: AccesibilidadModel) => ({
              ...accesibilidad,
              caracteristicas: accesibilidad.caracteristicas.map(
                (caracteristica) => caracteristica.id
              ),
            })
          ),
          categoria: currentLugar.categoria?.id,
          departamento: currentLugar.departamento?.id,
        });
      } else if (lugarId && !currentLugar) {
        // TODO: Traer lugar a editar
        setLoading(true);
        await getLugaresById(dispatch, lugarId as any);
        setLoading(false);
      }
    };
    verificarLugar();
  }, [currentLugar, lugarId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await createLugar(lugar, dispatch);
    setLoading(false);
    toast.success("Lugar creado exitos amente!");
    router.push("/administrador");
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await editarLugarById(
      {
        ...lugar,
        medias: lugar.medias.filter((media: any) => !media.id),
      },
      dispatch
    );
    setLoading(false);
    toast.success("Lugar editado exitosamente!");
    router.push("/administrador");
  };

  const deleteMedia = (indexToDelete: number) => {
    // Buscando la media que se desea borrar
    const mediaPorBorrar = lugar.medias.find(
      (media: any, index: number) => index === indexToDelete
    );

    // Quito la media por borrar de las que ve el usuario
    let newLugar = {
      ...lugar,
      medias: lugar.medias.filter(
        (media: any, index: number) => index !== indexToDelete
      ),
    };

    // Se identifica si la media si ya se subio o es un archivo que se desa subir
    // Si tiene id significa que esta subido
    if (mediaPorBorrar.id) {
      newLugar = {
        ...newLugar,
        mediasBorrar: [...lugar.mediasBorrar, mediaPorBorrar.ruta],
      };
    }

    setLugar(newLugar);
  };

  const handleChange = (e: any) => {
    if (e.target.name === "medias") {
      setLugar({
        ...lugar,
        [e.target.name]: [...lugar.medias, ...e.target.files],
      });
    } else if (e.target.name === "video") {
      setLugar({ ...lugar, [e.target.name]: e.target.files[0] });
    } else if (e.target.name === "video1") {
      setLugar({ ...lugar, video: e.target.value });
    } else if (e.target.name === "departamento") {
      setLugar({ ...lugar, [e.target.name]: parseInt(e.target.value) });
    } else {
      setLugar({ ...lugar, [e.target.name]: e.target.value });
    }
  };

  const handleClickAccesibilidad = (accesibilidad: number) => {
    setAccecibilidad(accesibilidad);
  };

  const toggleCaracteristica = (
    accesibilidadCaracteristica: AccesibilidadModel,
    caracteristicaId: number
  ) => {
    let accesibilidadesCopy = [...lugar.accesibilidades];
    let currentAccesibilidad = accesibilidadesCopy.find(
      (accesibilidad: AccesibilidadModel) =>
        accesibilidad.id === accesibilidadCaracteristica.id
    );

    if (!currentAccesibilidad) {
      currentAccesibilidad = {
        ...accesibilidadCaracteristica,
        caracteristicas: [],
      };
      accesibilidadesCopy = [...accesibilidadesCopy, currentAccesibilidad];
    }

    if (currentAccesibilidad.caracteristicas.includes(caracteristicaId)) {
      currentAccesibilidad.caracteristicas =
        currentAccesibilidad.caracteristicas.filter(
          (caracteristica: number) => caracteristica !== caracteristicaId
        );
    } else {
      currentAccesibilidad.caracteristicas = [
        ...currentAccesibilidad.caracteristicas,
        caracteristicaId,
      ];
    }

    setLugar({
      ...lugar,
      accesibilidades: accesibilidadesCopy,
    });
    debugger;
  };

  if ((!departamentos && error) || (!categorias && errorc)) {
    return <div>Errror</div>;
  }

  if (loading) {
    return (
      <div className="m-auto">
        <PulseLoader color="#3089b0" />
      </div>
    );
  }

  return (
    <div onSubmit={lugarId ? handleEdit : handleSubmit}>
      <form className=" container mx-auto my-5 shadow-md rounded flex justify-center w-[90%]">
        <div className="flex flex-col w-full px-5">
          <div className="flex flex-row  lg:mx-7 my-1 text-xs">
            <h1 className="text-gray-400 font-bold ">
              perfil de administrador{">"}
            </h1>

            <span className="text-black font-bold pl-2">Crear nuevo sitio</span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-row items-center">
              <Link href="/administrador">
                <img
                  src={Vector2.src}
                  className=" w-[20px] h-[25px] hover:scale-105 transition-all cursor-pointer"
                  alt=""
                />
              </Link>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-redOmega w-[95%] mx-4 lg:mx-7 py-2 md:w-[99%] text-center h-[100%] flex items-center">
                Agregar un nuevo sitio
              </h3>
            </div>
            <div className="hidden  lg:flex justify-end  flex-row text-sm ">
              <button
                className="bg-gray-500 hover:bg-blueHannu  rounded-full py-1 px-3 text-white font-myriad w-[154px] h-[35px] align-middle text-center my-5 mx-2"
                type="submit"
              >
                Guardar cambios
              </button>

              <Link href="/administrador">
                <button className="bg-blueHannu rounded-full py-1 px-3 text-white font-myriad w-[104px] h-[35px] align-middle text-center my-5 mx-2">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:pt-5 sm:w-full lg:mx-10  lg:flex lg:flex-row lg:divide-x">
            <div className="lg:w-[60%]">
              <h1 className="font-bold my-3">Nombre del sitio:</h1>
              <div className="flex flex-wrap  md:my-3">
                <div className="w-full md:w-[80%]">
                  <input
                    className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
                    name="nombre"
                    type="text"
                    value={lugar.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-row mb-6 md:my-3 items-baseline">
                <h1 className="font-bold">NIT</h1>
                <div className="w-full m-2 md:w-[40%]">
                  <input
                    className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="nit"
                    type="text"
                    value={lugar.nit}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <h1 className="font-bold mb-5">Subir video del sitio:</h1>

              <div className="flex flex-row mb-6 md:my-3 items-baseline">
                <h1 className="font-bold">URL:</h1>
                <div className="w-full m-2 md:w-[60%]">
                  <input
                    className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="video1"
                    type="text"
                    value={lugar.video?.name || lugar.video}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex justify-start flex-col">
                  <h1
                    className={`${
                      !re.test(lugar.video) ? "block" : "hidden"
                    } text-sm my-2 font-bold flex flex-row items-center`}
                  >
                    Nombre del archivo:&nbsp;
                    <span
                      className={`${
                        lugar.video ? "block" : "hidden"
                      } text-gray-400 block text-ellipsis overflow-hidden`}
                    >
                      {lugar.video?.name || lugar.video}
                    </span>
                    <span
                      className={`${
                        lugar.video ? "hidden" : "block"
                      } text-gray-400`}
                    >
                      Aun no se sube ningún archivo
                    </span>
                  </h1>
                  {lugar.video?.name && (
                    <h1 className="text-sm my-2 font-bold flex flex-row items-center">
                      Tamaño del archivo: &nbsp;
                      <span
                        className={`${
                          lugar.video ? "hidden" : "block"
                        } text-gray-400 mx-5`}
                      >
                        Aun no se sube ningún archivo
                      </span>
                      <span className="text-gray-400">{lugar.video?.size}</span>
                      &nbsp;
                      <span
                        className={`${
                          lugar.video ? "block" : "hidden"
                        } text-gray-400`}
                      >
                        Bytes
                      </span>
                    </h1>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blueHannu hover:bg-blueHannu flex  rounded-full py-1 px-3 text-white font-myriad w-[154px] h-[35px] align-middle text-center my-5"
                    type="button"
                    onClick={() =>
                      document.getElementById("inputVideo")?.click()
                    }
                  >
                    <img
                      src={Vectorsb.src}
                      className="hover:scale-105 transition-all cursor-pointer p-1"
                      alt=""
                    />
                    <h1 className="text-sm  mx-3 my-1">Subir archivo</h1>
                  </button>
                  <input
                    id="inputVideo"
                    type="file"
                    className="hidden"
                    name="video"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h1 className="font-bold pt-10">Añadir descripcion del sitio:</h1>
              <div className="flex flex-wrap mb-6 md:my-3">
                <div className="w-full md:w-[90%]">
                  <textarea
                    className="appearance-none block w-full text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="descripcion"
                    onChange={handleChange}
                    value={lugar.descripcion}
                  ></textarea>
                </div>
              </div>
              <h1 className="font-bold pt-2">
                Añadir interpretacion de la descripción:
              </h1>
              <div className="flex flex-wrap mb-6 md:my-3">
                <div className="w-full md:w-[90%]">
                  <textarea
                    className="appearance-none block w-full text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="descripcionInterpretada"
                    onChange={handleChange}
                    value={lugar.descripcionInterpretada}
                  ></textarea>
                </div>
              </div>
              <h1 className="font-bold pt-2">Agregar imagenes:</h1>
              {lugar.medias?.map((media: any, index: number) => (
                <div className="w-[90%]">
                  <div className="md:flex md:flex-row flex-col items-center gap-5">
                    <div className="flex flex-wrap justify-center mb-6 md:my-3 ">
                      <div className="w-full ">
                        <Image
                          src={
                            media.id
                              ? `${S3_BUCKET_URL}${media.ruta}`
                              : URL.createObjectURL(media)
                          }
                          width={140}
                          height={100}
                          layout="fixed"
                          className="rounded-xl pt-5 z-10"
                          objectFit="cover"
                          objectPosition="center-top"
                        />
                      </div>
                    </div>

                    <div className="flex justify-start flex-col ">
                      <div className="flex items-center">
                        <h1 className="text-sm  mx-1 my-2 font-bold">
                          Nombre del archivo:
                        </h1>
                        <span className="mx-5 flex-wrap max-w-[400px] md:max-w-[200px] block text-ellipsis overflow-hidden">
                          {media.name ?? media.ruta}
                        </span>
                      </div>
                      {media.size && (
                        <h1 className="text-sm  mx-1 my-2 font-bold">
                          Tamaño del archivo:
                          <span className="mx-5">{media.size}</span>
                          <span className="text-gray-400">Bytes</span>
                        </h1>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteMedia(index)}
                      className="bg-blueHannu hover:bg-blueHannu ml-auto rounded-full py-1 px-3 text-white font-myriad w-[120px] h-[35px] align-middle items-center text-center my-5"
                    >
                      Eliminar
                    </button>
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
                  <hr className=" w-full my-5 text-gray-500" />
                </div>
              ))}

              <div className="flex justify-center">
                <button
                  className="bg-blueHannu hover:bg-blueHannu flex  rounded-full py-1 px-3 text-white font-myriad w-[154px] h-[35px] align-middle text-center my-5"
                  onClick={() =>
                    document.getElementById("inputImagen")?.click()
                  }
                  type="button"
                >
                  <h1 className="text-sm text-center mx-3 my-1">
                    Agregar imagen
                  </h1>
                </button>
                <input
                  id="inputImagen"
                  type="file"
                  className="hidden"
                  name="medias"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="lg:w-[40%] lg:pl-10">
              <div className="flex flex-row mb-6 lg:my-3 items-baseline">
                <h1 className="font-bold w">Direccion del sitio</h1>
                <div className="w-full m-2 lg:w-[40%]">
                  <input
                    className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none"
                    name="latitud"
                    type="text"
                    onChange={handleChange}
                    value={lugar.latitud}
                  />
                </div>
              </div>
              <div className=" m-5 lg:w-full flex justify-start ">
                <div className="w-full ">
                  <Image
                    src={Map.src}
                    width={320}
                    height={150}
                    layout="fixed"
                    className="rounded-xl pt-5 z-10"
                    objectFit="cover"
                    objectPosition="center-top"
                  />
                </div>
              </div>
              <h1 className="font-bold pt-2">Información del contacto:</h1>
              <div className="flex flex-row mb-6 md:my-3 items-baseline">
                <h1 className="font-bold w">Número del contacto </h1>
                <div className="w-full m-2 lg:w-[40%]">
                  <input
                    className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="telefono"
                    type="text"
                    onChange={handleChange}
                    value={lugar.telefono}
                  />
                </div>
              </div>
              <div className="flex flex-row mb-6 lg:my-3 items-baseline">
                <h1 className="font-bold w">Correo </h1>
                <div className="w-full m-2 lg:w-[40%]">
                  <input
                    className="border-black appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="correo"
                    type="text"
                    onChange={handleChange}
                    required
                    value={lugar.correo}
                  />
                </div>
              </div>
              <h1 className="font-bold pt-2">Información de accesibilidad:</h1>

              <div className="flex flex-wrap gap-3">
                {accesibilidades?.map((accecibilidadd: any) => (
                  <div>
                    <button
                      className={`${
                        accecibilidadd.id == accecibilidad ? "bg-blueHannu" : ""
                      }  flex items-center rounded-full py-1 px-3 font-myriad h-[35px] align-middle text-center my-5t border border-black my-5`}
                      type="button"
                      name="accesibilidades"
                      onClick={() =>
                        handleClickAccesibilidad(accecibilidadd.id)
                      }
                    >
                      <h1
                        className={`${
                          accecibilidadd.id == accecibilidad
                            ? "text-white"
                            : "text-black"
                        } text-sm mx-3`}
                      >
                        {accecibilidadd.nombre}
                      </h1>
                    </button>
                  </div>
                ))}
              </div>

              {accesibilidades?.map((accesibilidad) => {
                const currentAccesibilidad = lugar.accesibilidades?.find(
                  (accesibilidadLugar: AccesibilidadModel) =>
                    accesibilidadLugar.id === accesibilidad.id
                );

                return (
                  <label
                    className={`${
                      accesibilidad.id == accecibilidad ? "bg-blueHannu" : ""
                    }items-center rounded-full py-1 px-6 font-myriad h-[25px] align-middle text-center  border border-black my-5 mx-3`}
                  >
                    {currentAccesibilidad?.caracteristicas.length || 0}/
                    {accesibilidad.caracteristicas.length}
                  </label>
                );
              })}
              <div className="flex flex-wrap my-2">
                {accesibilidades?.map((accesibilidad: AccesibilidadModel) => (
                  <div className="form-check">
                    {accesibilidad.caracteristicas.map(
                      (caracteristica: CaracteristicaModel) => {
                        const currentAccesibilidad =
                          lugar.accesibilidades?.find(
                            (accesibilidadLugar: AccesibilidadModel) =>
                              accesibilidadLugar.id === accesibilidad.id
                          );
                        return (
                          <div
                            className={`${
                              accesibilidad.id == accecibilidad
                                ? "block"
                                : "hidden"
                            } flex cursor-pointer my-2 items-center`}
                            onClick={() =>
                              toggleCaracteristica(
                                accesibilidad,
                                caracteristica.id
                              )
                            }
                          >
                            <div
                              className={`${
                                currentAccesibilidad?.caracteristicas.includes(
                                  caracteristica.id
                                )
                                  ? "bg-blue-500"
                                  : "bg-white border-black border"
                              } rounded-full w-[15px] h-[15px] mx-2`}
                            ></div>
                            <label className="form-check-label inline-block text-gray-800 ">
                              {caracteristica.nombre}
                            </label>
                          </div>
                        );
                      }
                    )}
                  </div>
                ))}
              </div>

              <h1 className="font-bold pt-2">Seleccionar departamento:</h1>
              <div className="grid grid-cols-2 gap-5 lg:w-[60%] my-5">
                {departamentos?.map((departamento) => (
                  <div className="form-check">
                    <input
                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      type="radio"
                      name="departamento"
                      value={departamento.id}
                      onChange={handleChange}
                      checked={lugar.departamento === departamento.id}
                    />
                    <label className="form-check-label inline-block text-gray-800">
                      {departamento.nombre}
                    </label>
                  </div>
                ))}
              </div>
              <h1 className="font-bold pt-2">Seleccionar Categoría:</h1>
              <div className="flex flex-row mb-6 md:my-3 items-baseline">
                <h1 className="font-bold">Categorías:</h1>
                <div className="w-full m-2 lg:w-[40%]">
                  <div className="flex justify-center">
                    <div className="mb-3 xl:w-96">
                      <select
                        className="form-select appearance-none block  w-full  px-3 py-1.5  text-basefont-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300 rounded transition  ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                        name="categoria"
                        onChange={handleChange}
                      >
                        <option>Seleccione categoria</option>
                        {categorias?.map((categoria) => (
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
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center  flex-row text-sm  lg:hidden">
        <button
          className="bg-gray-500 hover:bg-blueHannu  rounded-full py-1 px-3 text-white font-myriad w-[154px] h-[35px] align-middle text-center my-5 mx-2"
          type="submit"
        >
          Guardar cambios
        </button>
        <Link href="/">
          <button className="bg-blueHannu rounded-full py-1 px-3 text-white font-myriad w-[104px] h-[35px] align-middle text-center my-5 mx-2">
            Cancelar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CrearEditarLugar;
