import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import subida from "../../src/assets/subida.svg";
import { toast } from "react-toastify";
import { crearCampaña } from "../../src/redux/actions/campaniasActions";
import { getCiudad } from "../../src/redux/actions/ciudadesActions";
import { getCategorias } from "../../src/redux/actions/categoriaActions";
import {
  getCampania,
  getCampaignCodes,
  updateCampania,
} from "../../src/redux/actions/campaniasActions";
import moment from "moment";
import { getCiudadesState } from "../../src/redux/reducers/ciudadesReducer";
import { getCategoriaState } from "../../src/redux/reducers/categoriaReducer";
import { PulseLoader } from "react-spinners";
import { XMarkIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import { ERROR, MAX_IMAGE_SIZE, S3_BUCKET_URL } from "../../src/utils/constants";
import readXlsxFile, { Row } from 'read-excel-file';
import SeeCodes from "../../src/components/SeeCodes";
import { Position } from "geojson";

interface PasoApaso {
  id: number;
  paso: string;
}

const pasoApaso: PasoApaso[] = [
  {
    id: 1,
    paso: "Informacion básica",
  },
  {
    id: 2,
    paso: "Recompenzas, fechas, horarios",
  },
  {
    id: 3,
    paso: "Contenido de la campaña",
  },
  {
    id: 4,
    paso: "Limitacion geografica",
  },
];

const CrearCampaña = () => {
  const imgCampaniaRef: any = useRef();
  const imgMuestraRef: any = useRef();
  const materialGraficoRef: any = useRef();
  const codesRef: any = useRef();
  const MultiPolygonCreator = useMemo(
    () =>
      dynamic(
        () => import("../../src/components/MultiPolygonCreator"), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    []
  );

  const ciudades = useSelector(getCiudadesState);
  const categorias = useSelector(getCategoriaState);
  const dispatch = useDispatch();
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [campaña, setCampaña] = useState<any>(null);
  const [codesFile, setCodeFile] = useState<null | File>(null);
  const [codes, setCodes] = useState<null | number[]>(null);
  const [seeCodes, setSeeCodes] = useState<boolean>(false);

  // Horarios
  const [horarios, setHorarios] = useState<any[]>([]);
  const [existentHorarios, setExistentHorarios] = useState<string[]>([]);
  const [horarioInput, setHorarioInput] = useState<any>(null);
  const [horariosBorrar, setHorariosBorrar] = useState<any>([]);
  const [horariosAgregar, setHorariosAgregar] = useState<any>([]);
  const router = useRouter();
  const campañaId = router.query.id;
  const [multiPolygon, setMultiPolygon] = useState<number[][][]>([]);

  useEffect(() => {
    if (!ciudades) {
      getCiudad(dispatch);
    }
    if (!categorias) {
      getCategorias(dispatch);
    }
  }, [ciudades, categorias]);

  const runValidations = () => {
    if (horarios.length === 0) {
      toast.warning("Por favor agrega al menos un horario");
      return false;
    } else if (!campaña.categoria) {
      toast.warning("Por selecciona la categoría");
      return false;
    } else if (!campaña.imgCampania) {
      toast.warning("Por favor elige una imagen para campaña");
      return false;
    } else if (campaña.muestra && !campaña.imgMuestra) {
      toast.warning("Por favor elige una imagen para la muestra");
      return false;
    } else if (campaña.ciudades.length === 0 && multiPolygon.length === 0) {
      toast.warning(
        "Selecciona al menos una ciudad o define el area de cobertura en el mapa"
      );
      return false;
    } else if (campaña.codigoUnico && !codes) {
      toast.warning(
        "Por favor, selecciona un archivo con los códigos correspondientes a esta campaña"
      );
      return false;
    } else if (campaña.codigoUnico && codes?.length !== parseInt(campaña.cupos)) {
      toast.warning(
        "Asegurate que el número de códigos que subiste sea igual al número de cupos de la campaña"
      );
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const valid = runValidations();
    if (!valid) return

    setLoading(true);

    const campañaToCreate = {
      ...campaña,
      horarios,
      areaCampania: multiPolygon,
    };

    if (campaña.codigoUnico) {
      campañaToCreate.codigos = codes;
    }

    const res = await crearCampaña(campañaToCreate);
    setLoading(false);
    if (res.status === ERROR) {
      toast.error("Ocurrio un error por favor intentalo de nuevo");
    } else {
      toast.success("Campaña creado exitosamente!");
      router.push("/");
    }
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const valid = runValidations();
    if (!valid) return

    setLoading(true);

    const campañaToEdit = {
      ...campaña,
      horariosAgregar,
      horariosBorrar,
      areaCampania: multiPolygon,
    };

    if (campaña.codigoUnico) {
      campañaToEdit.codigos = codes;
    }

    const res = await updateCampania(campañaId as any, campañaToEdit);

    setLoading(false);
    if (res.status === ERROR) {
      toast.error("Ocurrio un error por favor intentalo de nuevo");
    } else {
      toast.success("Campaña editada exitosamente!");
      router.push("/");
    }
  };

  const loadCurrentCampaña = async () => {
    setLoading(true);
    const res = await getCampania(campañaId as any);
    const codesRes = await getCampaignCodes(campañaId as string);
    setExistentHorarios(res.horarios?.map((horario: any) => horario.fecha_hora));
    setHorarios(res.horarios?.map((horario: any) => horario.fecha_hora));
    setCampaña({
      ...res,
      fechaCierreInscripciones: moment(res.fechaCierreInscripciones).format("YYYY-MM-DD"),
      currentCiudades: res.ciudadesCampañas?.map(
        (ciudadC: any) => ciudadC.ciudad.id
      ),
      ciudades: res.ciudadesCampañas?.map((ciudadC: any) => ciudadC.ciudad.id),
      ciudadesBorrar: [],
      ciudadesAgregar: [],
      categoria: res.categoria?.id,
    });
    if (codesRes.length > 0) {
      setCodes(codesRes.map((c: any) => c.codigo));
    }
    if (res.areaCampaña) {
      setMultiPolygon(res.areaCampaña.coordinates[0]?.map((currentPolygon: Position[]) => (currentPolygon.map((coordinates: Position) => ([coordinates[1], coordinates[0]])))) || [])
    }

    setLoading(false);
  };

  useEffect(() => {
    if (campañaId) {
      loadCurrentCampaña();
    } else if (!campaña && !campañaId) {
      setCampaña({
        titulo: null,
        marca: null,
        cupos: null,
        estado: null,
        mensajeWhatsapp: null,
        horarios: [],
        horariosBorrar: [],
        ciudades: [],
        descripcion: null,
        puntos: null,
        requisitos: null,
        imgCampania: null,
        instrucciones: null,
        muestra: false,
        imgMuestra: null,
        codigoUnico: false,
        fechaCierreInscripciones: null,
        puntosAsignados: null,
        urlInstagram: null,
        imgInstagram: null,
        areaCampaña: null,
        materialGrafico: null,
        categoria: null,
      });
    }
  }, [campañaId]);

  const handleCodigos = async (e: any) => {
    setCodeFile(e.target.files[0]);

    const rows = await readXlsxFile(e.target.files[0])
    setCodes(rows.map((row: any) => row[0]));
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    if (
      e.target.name === "imgCampania" ||
      e.target.name === "imgMuestra" ||
      e.target.name === "materialGrafico"
    ) {
      const fileToAdd = e.target.files[0];

      if (["imgCampania", "imgMuestra"].includes(e.target.name) && fileToAdd?.size > MAX_IMAGE_SIZE) {
        toast.error("Por favor adjunte una imagen que pese menos de un 1MB");
        return;
      }
      setCampaña({
        ...campaña,
        [e.target.name]: fileToAdd,
      });
    } else if (e.target.name === "fechaCierreInscripciones") {
      let validDate = true;
      const newFechaCiereDate = moment(e.target.value);
      
      horarios.forEach((horario: string) => {
        validDate = validDate && moment(horario).isAfter(newFechaCiereDate);
      });

      if(!validDate) {
        toast.error("La fecha de cierre de inscripciones debe ser menor a todos los horarios");
        return;
      }

      setCampaña({
        ...campaña,
        [e.target.name]: e.target.value,
      });
    } else {
      setCampaña({ ...campaña, [e.target.name]: e.target.value });
    }
  };

  const handleChangeCiudades = (id: number) => {
    if (campaña.ciudades.includes(id)) {
      const newCiudades = [...campaña.ciudades];
      const ciudadesFiltradas = newCiudades.filter(
        (ciudad: number) => ciudad !== id
      );

      const newCiudadesBorrar = [...(campaña.ciudadesBorrar || [])];
      if (
        !newCiudadesBorrar.includes(id) &&
        campaña.currentCiudades?.includes(id)
      ) {
        newCiudadesBorrar.push(id);
      }

      setCampaña({
        ...campaña,
        ciudades: ciudadesFiltradas,
        ciudadesBorrar: newCiudadesBorrar,
        ciudadesAgregar: campaña.ciudadesAgregar.filter(
          (ciudad: number) => id !== ciudad
        ),
      });
    } else {
      const newCiudadesAgregar = [...(campaña.ciudadesAgregar || [])];

      if (!campaña.currentCiudades?.includes(id)) {
        newCiudadesAgregar.push(id);
      }

      setCampaña({
        ...campaña,
        ciudades: [...campaña.ciudades, id],
        ciudadesBorrar: campaña.ciudadesBorrar?.filter(
          (ciudad: number) => id !== ciudad
        ),
        ciudadesAgregar: newCiudadesAgregar,
      });
    }
  };

  const borrarHorario = (hora: string) => {
    if (horarios.includes(hora)) {
      const horariosFiltradas = horarios.filter(
        (horario: string) => horario !== hora
      );
      const newHorariosBorrar = [...horariosBorrar];

      if (existentHorarios.includes(hora)) {
        newHorariosBorrar.push(hora);
      }
      setHorariosBorrar(newHorariosBorrar);
      setHorarios(horariosFiltradas);
      setHorariosAgregar(horariosAgregar.filter((h: string) => h !== hora));
    }
  };

  const addHorario = () => {
    // Validar que no se este agregando el mismo horario dos veces
    const newHorario = new Date(horarioInput).toISOString();
    if(!campaña.fechaCierreInscripciones) {
      toast.error("Primero debe existir una fecha de cierre de inscripciones");
      return;
    }
    let validDate = true;
   
      validDate = validDate && moment(newHorario).isAfter(campaña.fechaCierreInscripciones);
  

    if(!validDate) {
      toast.error("Los horarios deben ser después de la fecha de cierre de inscripciones");
      return;
    }else{
      if (newHorario && !horarios.includes(newHorario)) {
        setHorarios([...horarios, newHorario]);
      }
      if (!existentHorarios.includes(newHorario))
      setHorariosAgregar([...horariosAgregar, newHorario]);

    if (horariosBorrar.includes(newHorario))
      setHorariosBorrar(horariosBorrar.filter((h: string) => h !== newHorario));
    }

   

  
  };

  if (loading || !campaña) {
    return (
      <div className="flex justify-center w-full h-[1000px] m-auto">
        <PulseLoader className="m-auto" color="#9955D4" />
      </div>
    );
  }

  const fieldsDisabled = !!campañaId && campaña.inscritos > 0;

  return (
    <form
      className="w-full h-full bg-white lg:bg-white"
      onSubmit={campañaId ? handleEdit : handleSubmit}
    >
      <h3 className="text-[#425AC5] text-2xl  uppercase tracking-[0.2em] font-bold w-10/12 lg:w-full mx-auto text-center lg:hidden pt-[15px]">
        {
          campañaId ?
            "Editando campaña" :
            "Nueva Campaña"
        }
      </h3>
      {/* Indicador de pasos */}
      <div className="lg:hidden overflow-x-scroll px-[40px]">
        <div className="relative flex justify-between items-center flex-row mx-auto min-w-[350px] max-w-[600px] pt-[10px] pb-14">
          <div className={`h-[3px] w-full absolute z-0 ${"bg-gray-300"}`} />
          {pasoApaso.map((item) => (
            <div key={item.id} className="flex flex-row justify-start relative">
              <div
                onClick={() => setPaso(item.id)}
                className="flex relative flex-row items-center justify-center w-auto"
              >
                <div
                  className={`relative w-9 h-9 ${paso >= item.id
                    ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] border-[5px] border-gray-100 ring-1 ring-[#9955D4] "
                    : "bg-[#C4C4C4] border-4 bg-border-[#EEEEEE] lg:hover:bg-white hover:border-2 hover:border-gray-500 transition-all ring-1 ring-gray-300"
                    } rounded-full cursor-pointer flex justify-center items-center p-2 text-white font-semibold`}
                >
                  {item.id}
                  <span
                    className={`absolute top-[135%] text-xs text-center ${paso >= item.id ? "text-[#425AC5]" : "text-gray-600 "
                      }  tracking-[0.2em] text-[10px] md:text-[12px] min-w-[110px]`}
                  >
                    {item.paso}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-[20px] md:mx-[40px] 2xl:mx-auto max-w-[1300px]">
        <div
          className={`${paso === 1 ? "block" : "hidden lg:block"
            }  flex justify-center mx-auto pt-[30px] md:pt-[50px] lg:pt-[60px]`}
        >
          <h1 className="text-[#425AC5] text-lg  font-semibold w-10/12 lg:w-full mx-auto text-center lg:text-left lg:text-3xl">
            {
              `Información básica${campañaId ? ` (${campaña.inscritos} inscrito(s))` : ""}`
            }
          </h1>
        </div>
        <div
          className={`${paso === 1 ? "block" : "hidden lg:block"
            } mx-auto my-3 custom-shadow rounded-md w-full bg-white lg:grid lg:grid-cols-2 lg:my-5`}
        >
          <div className="flex flex-col gap-y-2 w-full lg:w-[80%] lg:mx-10 lg:pt-[25px]">
            <div className="mx-4 my-2">
              <h1 className="text-[#425AC5] text-xs md:text-[17px]  u w-10/12 lg:w-full text-left ">
                Titulo de campaña
              </h1>
              <input
                disabled={fieldsDisabled}
                className={`w-full focus:outline-none my-1 ${fieldsDisabled ? "bg-white" : "border-gray-300 border-b-2"}`}
                type="text"
                name="titulo"
                value={campaña.titulo}
                onChange={handleChange}
                placeholder="Titulo"
                required
              />
            </div>
            <div className="mx-4 my-2">
              <h1 className="text-[#425AC5] text-xs md:text-[17px]  w-10/12 lg:w-full text-left ">
                Nombre de la marca
              </h1>
              <input
                disabled={fieldsDisabled}
                className={`w-full focus:outline-none my-1 ${fieldsDisabled ? "bg-white" : "border-gray-300 border-b-2"}`}
                type="text"
                value={campaña.marca}
                name="marca"
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>
            <div className="mx-4 my-2">
              <h1 className="text-[#425AC5] text-xs md:text-[17px]  w-10/12 lg:w-full text-left ">
                Instagram de la marca
              </h1>
              <input
                disabled={fieldsDisabled}
                className={`w-full focus:outline-none my-1 ${fieldsDisabled ? "bg-white" : "border-gray-300 border-b-2"}`}
                type="url"
                pattern="https://.*"
                value={campaña.urlInstagram}
                name="urlInstagram"
                onChange={handleChange}
                placeholder="URL del instagram"
                required
              />
            </div>
            <div className="mx-4 my-2">
              <h1 className="text-[#425AC5] text-xs  md:text-[17px] w-10/12 lg:w-full text-left ">
                Puntos
              </h1>
              <input
                disabled={fieldsDisabled}
                className={`w-full focus:outline-none my-1 ${fieldsDisabled ? "bg-white" : "border-gray-300 border-b-2"}`}
                type="number"
                name="puntos"
                value={campaña.puntos}
                onChange={handleChange}
                placeholder="Numero de puntos"
                required
              />
            </div>
            <div className="mx-4 my-2">
              <h1 className="text-[#425AC5] text-xs md:text-[17px]  w-10/12 lg:w-full text-left ">
                Cupos
              </h1>
              <input
                disabled={fieldsDisabled}
                className={`w-full focus:outline-none my-1 ${fieldsDisabled ? "bg-white" : "border-gray-300 border-b-2"}`}
                type="number"
                name="cupos"
                value={campaña.cupos}
                onChange={handleChange}
                placeholder="Cupos"
                required
              />
            </div>
            <div className="mx-4 my-2">
              <h1 className="text-[#425AC5] text-xs md:text-[17px] w-10/12 lg:w-full text-left ">
                Fecha de cierre de inscripcion
              </h1>
              <input
                disabled={fieldsDisabled}
                className={`w-full focus:outline-none my-1 ${fieldsDisabled ? "bg-white" : "border-gray-300 border-b-2"}`}
                type="date"
                min={moment().format("YYYY-MM-DD")}
                name="fechaCierreInscripciones"
                value={campaña.fechaCierreInscripciones}
                onChange={handleChange}
                placeholder="Fecha"
                required
              />
            </div>
            <div className="flex flex-row mb-6 md:my-3 items-baseline mx-4 my-2">
              <h1 className="text-[#425AC5] text-xs md:text-[17px] ">
                Categoría:
              </h1>
              <div className="w-full m-2 lg:w-[40%]">
                <div className="flex justify-center">
                  <div className="mb-3 xl:w-96">
                    <select
                      disabled={fieldsDisabled}
                      className="form-select appearance-none block  w-full  px-3 py-1.5  text-basefont-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat  border border-solid border-gray-300 rounded transition  ease-in-out m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="Default select example"
                      name="categoria"
                      onChange={handleChange}
                      required
                    >
                      <option>Seleccione categoria</option>
                      {categorias?.map((categoria) => (
                        <option
                          key={categoria.id}
                          selected={campaña.categoria == categoria.id}
                          value={categoria.id}
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
          <div className="flex flex-col my-5">
            <div className="mx-4 lg:pt-[15px]">
              <h1 className="text-[#425AC5] text-xs md:text-[17px]  w-10/12 lg:w-full text-left ">
                Descripción de la campaña
              </h1>
              {
                fieldsDisabled ? <p className="mt-2">
                  {campaña.descripcion}
                </p> :
                  <textarea
                    className="form-control ease-in-out  block w-full text-normal border border-blue-800 rounded-xl my-2 h-[140px] lg:h-[110px] py-2  px-3 leading-tight focus:outline-none"
                    name="descripcion"
                    value={campaña.descripcion}
                    onChange={handleChange}
                    required
                  ></textarea>
              }
            </div>
            <div className="mx-4 lg:pt-[25px]">
              <h1 className="text-[#425AC5] text-xs md:text-[17px]  w-10/12 lg:w-full text-left ">
                Mensaje para WhatsApp
              </h1>
              {
                fieldsDisabled ? <p className="mt-2">
                  {campaña.mensajeWhatsapp}
                </p> :
                  <textarea
                    className="form-control ease-in-out  block w-full text-ms border border-blue-800 rounded-xl my-2  h-[140px]  lg:h-[110px]  py-2  px-3 leading-tight focus:outline-none "
                    name="mensajeWhatsapp"
                    value={campaña.mensajeWhatsapp}
                    onChange={handleChange}
                    required
                  ></textarea>
              }
            </div>
            <div className="mx-auto">
              <h1 className="text-[#425AC5] text-xs md:text-[17px] w-10/12 lg:w-full text-left mt-2">
                Imagen para Campaña
              </h1>
              <input
                disabled={fieldsDisabled}
                ref={imgCampaniaRef}
                className={`hidden`}
                type="file"
                accept="image/*"
                name="imgCampania"
                onChange={handleChange}
              />
              <button
                onClick={() => !fieldsDisabled && imgCampaniaRef.current.click()}
                type="button"
                style={{
                  cursor: fieldsDisabled ? "auto" : "pointer"
                }}
                className={`${!campaña.imgCampania ? "" : "bg-[#9955D4]"
                  } box-dashed rounded-[5px] py-1 px-3 text-white font-myriad w-[250px] md:w-[330px] h-[55px] align-middle text-center my-5 mx-auto`}
              >
                {!campaña.imgCampania ? (
                  <div className="flex justify-center items-center gap-2">
                    <h1 className="text-sm md:text-xs lg:text-xs xl:text-base text-gray-400">
                      Subir Archivo
                    </h1>
                    <img
                      src={subida.src}
                      className="flex justify-end my-2"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-x-2">
                    <Image
                      src={
                        campaña.imgCampania?.name
                          ? URL.createObjectURL(campaña.imgCampania)
                          : `${S3_BUCKET_URL}${campaña.imgCampania}`
                      }
                      width={60}
                      height={40}
                      layout="fixed"
                      className="rounded-md pt-5 z-10"
                      objectFit="cover"
                      objectPosition="center-top"
                    />
                    <h1 className="max-w-[80%] text-ellipsis overflow-hidden">
                      {campaña.imgCampania.name
                        ? campaña.imgCampania.name
                        : campaña.imgCampania}
                    </h1>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaso(paso + 1)}
          className={`${paso === 1 ? "lg:hidden" : "hidden"
            }  bg-[#425AC5] flex justify-center mx-auto   text-base rounded-md py-2 px-2 text-white font-myriad w-[184px]  align-middle text-center my-10`}
        >
          Siguiente
        </button>
        <div
          className={`${paso === 2 ? "block" : "hidden lg:block"
            }flex flex-col-reverse lg:grid lg:grid-cols-2  pt-[40px] lg:pt-[20px] gap-x-[32px]`}
        >
          <div className="flex flex-col">
            <div className="flex justify-start mx-auto  my-2 w-full">
              <h1 className="text-[#425AC5] text-lg  font-semibold w-10/12 lg:w-full mx-auto text-center lg:text-left lg:text-3xl">
                Recompensas
              </h1>
            </div>
            <div className=" mx-auto my-3 custom-shadow rounded-md w-full min-h-[200px] bg-white divide-y ">
              <div className="mx-4 my-2 flex justify-end text-gray-300 ">
                <h1 className="mx-12">Si</h1> <h1 className="mx-9">No</h1>
              </div>
              <div className="mx-5 lg:mx-12 my-2 flex justify-between">
                <h1 className="text-[#425AC5] text-xs lg:text-base md:text-[18px]  w-10/12 lg:w-full text-left my-2">
                  Muestra
                </h1>
                <div className="flex gap-x-2 mx-auto justify-end">
                  <input
                    disabled={fieldsDisabled}
                    className="border-b-2 border-gray-300 w-full mx-10 lg:mx-16"
                    type="radio"
                    name="muestra"
                    onChange={() =>
                      setCampaña({
                        ...campaña,
                        muestra: true,
                      })
                    }
                    checked={campaña.muestra === true}
                    placeholder=""
                  />
                  <input
                    disabled={fieldsDisabled}
                    className="border-b-2 border-gray-300 w-full mx-10 lg:mx-3 "
                    type="radio"
                    name="muestra"
                    onChange={() =>
                      setCampaña({
                        ...campaña,
                        muestra: false,
                      })
                    }
                    checked={
                      campaña.muestra === false || campaña.muestra === null
                    }
                    placeholder=""
                  />
                </div>
              </div>
              <div
                className={`${campaña.muestra == true ? "block" : "hidden"
                  } mx-auto lg:mx-7 divide-y-0 px-5 `}
              >
                <div className="my-5">
                  {" "}
                  <h1 className="text-[#425AC5] text-xs md:text-[18px] w-10/12 lg:w-full text-left ">
                    Imagen para la Muestra
                  </h1>
                  <input
                    disabled={fieldsDisabled}
                    ref={imgMuestraRef}
                    className={`hidden`}
                    type="file"
                    accept="image/*"
                    name="imgMuestra"
                    onChange={handleChange}
                  />
                  <button
                    disabled={fieldsDisabled}
                    type="button"
                    onClick={() => imgMuestraRef.current.click()}
                    className={`${!campaña.imgMuestra ? "" : "bg-[#9955D4]"
                      }  box-dashed rounded-[5px] py-1 px-3 text-white font-myriad w-[250px] md:w-[330px] h-[55px] align-middle text-center my-5 mx-auto`}
                  >
                    {!campaña.imgMuestra ? (
                      <div className="flex justify-center items-center gap-2">
                        <h1 className="text-sm md:text-xs lg:text-xs xl:text-base text-gray-400">
                          Subir Archivo
                        </h1>
                        <img
                          src={subida.src}
                          className="flex justify-end my-2"
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <Image
                          src={
                            campañaId
                              ? `${S3_BUCKET_URL}${campaña.imgMuestra}`
                              : URL.createObjectURL(campaña.imgMuestra)
                          }
                          width={60}
                          height={40}
                          layout="fixed"
                          className="rounded-md pt-5 z-10"
                          objectFit="cover"
                          objectPosition="center-top"
                        />
                        <h1 className="max-w-[80%] text-ellipsis overflow-hidden">
                          {campaña.imgMuestra.name
                            ? campaña.imgMuestra.name
                            : campaña.imgMuestra}
                        </h1>
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="mx-5 lg:mx-12  flex justify-between divide-y">
                <h1 className="text-[#425AC5] text-xs lg:text-base md:text-[18px]  w-10/12 lg:w-full text-left my-2">
                  Incluir código de envio único
                </h1>
                <div className="flex gap-x-2 mx-auto justify-end">
                  <input
                    disabled={fieldsDisabled}
                    className="border-b-2 border-gray-300 w-full mx-10 lg:mx-16 "
                    type="radio"
                    name="codigoUnico"
                    onChange={() => setCampaña({ ...campaña, codigoUnico: true })}
                    checked={campaña.codigoUnico}
                    placeholder=""
                  />
                  <input
                    disabled={fieldsDisabled}
                    className="border-b-2 border-gray-300 w-full mx-10 lg:mx-3 "
                    type="radio"
                    name="codigoUnico"
                    onChange={() => setCampaña({ ...campaña, codigoUnico: false })}
                    checked={!campaña.codigoUnico}
                    placeholder=""
                  />
                </div>
              </div>
              <div
                className={`${campaña.codigoUnico ? "flex" : "hidden"
                  } mx-auto lg:mx-12`}
              >
                <div className="my-5 w-full">
                  <h1 className="text-[#425AC5] text-xs  md:text-[15px] w-10/12 lg:w-full text-left mb-5">
                    Agregar archivo excel con códigos de envio unico
                  </h1>
                  <input
                    ref={codesRef}
                    className={`hidden`}
                    type="file"
                    name="codigos"
                    onChange={handleCodigos}
                    accept=".xlsx, .xls, .csv"
                  />
                  <div className="flex items-center justify-between">
                    {
                      !fieldsDisabled &&
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => codesRef.current.click()}
                          className={`${!codesFile ? "" : "bg-[#9955D4]"
                            } box-dashed rounded-[5px] px-3 text-white font-myriad w-[250px] md:w-[330px] h-[55px] align-middle text-center `}
                        >
                          {
                            !codesFile ?
                              <div className="flex justify-center items-center gap-2">
                                <h1 className="text-sm md:text-xs lg:text-xs xl:text-base text-gray-400">
                                  Subir Archivo
                                </h1>
                                <img
                                  src={subida.src}
                                  className="flex justify-end my-2"
                                  alt=""
                                />
                              </div> :
                              (
                                <div className="flex justify-between items-center gap-x-2">
                                  <h1 className="max-w-[80%] text-ellipsis overflow-hidden">
                                    {codesFile?.name}
                                  </h1>
                                </div>
                              )
                          }
                        </button>
                      </div>
                    }
                    {
                      codes &&
                      <button
                        className={`bg-[#425AC5] flex justify-center mx-auto text-base rounded-md py-2 px-2 text-white font-myriad w-[184px] align-middle text-center self-center`}
                        type="button"
                        onClick={() => setSeeCodes(true)}
                      >
                        Ver códigos
                      </button>
                    }
                  </div>
                  {
                    codes &&
                    <span className="text-[#707070] text-[12px] w-[250px] md:w-[330px]">{codes.length} códigos subidos
                      {
                        codes.length !== parseInt(campaña.cupos) && <span className="text-red-500"> (Asegurate que el número de códigos sea igual al número de cupos)</span>
                      }
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-start mx-auto w-full my-2">
              <h1 className="text-[#425AC5] text-lg  font-semibold w-10/12 lg:w-full mx-auto text-center lg:text-left lg:text-3xl">
                Horarios
              </h1>
            </div>
            <div className=" mx-auto my-3 custom-shadow rounded-md w-full min-h-[200px] bg-white py-[25px] px-[28px]">
              <div className="lg:flex lg:justify-center gap-x-2 ">
                <div className="flex flex-col xl:grid xl:grid-cols-2 gap-2 mx-auto pl-0 w-full">
                  {
                    !fieldsDisabled &&
                    <>
                      <input
                        onChange={(e: any) => setHorarioInput(e.target.value)}
                        name="horarios"
                        min={moment().add(1, "days").format("YYYY-MM-DDT00:00")}
                        value={horarioInput || ""}
                        className="py-2 px-2 align-middle text-center border-2 border-[#9955D4] rounded-md mx-auto w-full"
                        type="datetime-local"
                      />
                      <button
                        type="button"
                        onClick={addHorario}
                        className="bg-[#425AC5] flex justify-center mx-auto text-sm rounded-md py-2 px-2 text-white font-myriad h-[45px] items-center align-middle text-center my-2 lg:my-0 w-full"
                      >
                        Agregar Fecha +
                      </button>
                    </>
                  }
                  {horarios?.map((horario) => (
                    <div
                      key={horario}
                      className="flex justify-between relative"
                    >
                      <h1 className="static  py-2 px-2 align-middle text-center border-2 bg-gradient-to-r from-[#9955D4] to-[#425AC5] rounded-md items-center mx-auto text-white w-full">
                        {moment(horario).format("DD/MM/YYYY hh:mm")}
                      </h1>
                      {
                        !fieldsDisabled &&
                        <button
                          type="button"
                          onClick={() => borrarHorario(horario)}
                          className="absolute border-[1px] top-[-5px] right-[-5px] border-gray-800 rounded-full h-4 w-4 text-center items-center text-x bg-white"
                        >
                          <XMarkIcon />
                        </button>
                      }
                    </div>
                  ))}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaso(paso + 1)}
          className={`${paso === 2 ? "lg:hidden" : "hidden"
            }  bg-[#425AC5] flex justify-center mx-auto   text-base rounded-md py-2 px-2 text-white font-myriad w-[184px]  align-middle text-center my-10`}
        >
          Siguiente
        </button>
        <div
          className={`${paso === 3 ? "block" : "lg:block hidden"
            } flex flex-col lg:my-5 pt-[30px] lg:pt-[20px]`}
        >
          <div className="flex flex-col">
            <div className="flex justify-start mx-auto my-2 w-full">
              <h1 className="text-[#425AC5] text-lg  font-semibold w-10/12 lg:w-full mx-auto text-center lg:text-left lg:text-3xl">
                Contenido de la Campaña
              </h1>
            </div>
            <div className=" mx-auto my-3 custom-shadow rounded-md w-full pb-[25px] bg-white ">
              <div className="flex flex-col lg:grid lg:grid-cols-2">
                <div className="mx-4 my-2 p-2 lg:pt-[25px]">
                  <h1 className="text-[#425AC5] text-xs md:text-[18px]  w-10/12 lg:w-full text-left ">
                    Requisitos
                  </h1>
                  {
                    fieldsDisabled ?
                      <p className="mt-2">
                        {
                          campaña.requisitos
                        }
                      </p> :
                      <textarea
                        className="form-control ease-in-out  block w-full text-ms border border-blue-800 rounded-xl my-2  h-[140px]  lg:h-[250px]  py-2  px-3 leading-tight focus:outline-none "
                        name="requisitos"
                        value={campaña.requisitos}
                        onChange={handleChange}
                        required
                      ></textarea>
                  }
                </div>
                <div className="mx-4 my-2 p-2 lg:pt-[25px]">
                  <h1 className="text-[#425AC5] text-xs  md:text-[18px] w-10/12 lg:w-full text-left ">
                    Instrucciones
                  </h1>
                  {
                    fieldsDisabled ?
                      <p className="mt-2">
                        {
                          campaña.instrucciones
                        }
                      </p> :
                      <textarea
                        className="form-control ease-in-out  block w-full text-ms border border-blue-800 rounded-xl my-2  h-[160px]  lg:h-[250px]  py-2  px-3 leading-tight focus:outline-none "
                        name="instrucciones"
                        onChange={handleChange}
                        value={campaña.instrucciones}
                        required
                      ></textarea>
                  }
                </div>
              </div>
              {
                ((fieldsDisabled && campaña.materialGrafico) || !fieldsDisabled) &&
                <div className="mx-auto flex justify-center">
                  <div>
                    <h1 className="text-[#425AC5] text-xs md:text-[18px]  w-10/12 lg:w-full text-left ">
                      Material Grafico
                    </h1>
                    <input
                      disabled={fieldsDisabled}
                      ref={materialGraficoRef}
                      className="hidden"
                      type="file"
                      name="materialGrafico"
                      onChange={handleChange}
                    />
                    <button
                      disabled={fieldsDisabled}
                      type="button"
                      onClick={() => materialGraficoRef.current.click()}
                      className={`${!campaña.materialGrafico ? "" : "bg-[#9955D4]"
                        }  box-dashed rounded-[5px] py-1 px-3 text-white font-myriad w-[250px] md:w-[330px] h-[55px] align-middle text-center my-5 mx-auto`}
                    >
                      {!campaña.materialGrafico ? (
                        <div className="flex justify-center items-center gap-2">
                          <h1 className="text-sm md:text-xs lg:text-xs xl:text-base text-gray-400">
                            Subir Archivo
                          </h1>
                          <img
                            src={subida.src}
                            className="flex justify-end my-2"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <Image
                            src={
                              campañaId
                                ? `${S3_BUCKET_URL}${campaña.materialGrafico}`
                                : URL.createObjectURL(campaña.materialGrafico)
                            }
                            width={60}
                            height={40}
                            layout="fixed"
                            className="rounded-md pt-5 z-10"
                            objectFit="cover"
                            objectPosition="center-top"
                          />
                          <h1 className="max-w-[80%] text-ellipsis overflow-hidden">
                            {campaña.materialGrafico.name
                              ? campaña.materialGrafico.name
                              : campaña.materialGrafico}
                          </h1>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <button
          onClick={() => setPaso(paso + 1)}
          type="button"
          className={`${paso === 3 ? "lg:hidden" : "hidden"
            }  bg-[#425AC5] flex justify-center mx-auto   text-base rounded-md py-2 px-2 text-white font-myriad w-[184px]  align-middle text-center my-10`}
        >
          Siguiente
        </button>
        <div
          className={`${paso === 4 ? "block" : "hidden lg:flex flex-col"
            } flex justify-start mx-auto my-2 w-full`}
        >
          <h1 className="text-[#425AC5] text-lg  font-semibold w-10/12 lg:w-full mx-auto text-center lg:text-left lg:text-3xl">
            Limitación geográfica
          </h1>
        </div>
        <div className={`lg:my-5 pt-[30px]`}>
          <div
            className={`${paso === 4 ? "flex flex-col" : "hidden lg:flex flex-col"
              } lg:flex lg:flex-row gap-y-5 md:gap-x-5`}
          >
            <div className="flex flex-col">
              <div className=" mx-auto custom-shadow rounded-md w-full md:w-full lg:min-h-[422px] bg-white flex-grow p-5">
                <div className="mx-auto my-2 flex">
                  <h1 className="text-xs md:text-[15px] lg:w-full text-left text-gray-400">
                    {
                      fieldsDisabled ? "Ciudades asignadas a esta campaña" : "Seleccione la ciudad donde se llevara acabo la campaña"
                    }
                  </h1>
                </div>
                <div className="grid grid-cols-2 gap-4 mx-auto justify-center lg:grid lg:grid-cols-2 lg:mx-16 mt-[30px]">
                  {ciudades?.map((ciudad) => (
                    <button
                      key={ciudad.id}
                      disabled={fieldsDisabled}
                      className={`${campaña.ciudades.includes(ciudad.id)
                        ? "bg-gradient-to-r from-[#9955D4] to-[#425AC5] text-white"
                        : "border border-black"
                        }  flex items-center rounded-lg py-1 px-3 font-myriad h-[35px] min-w-full md:min-w-[130px] align-middle text-center w-full max-w-[150px] mx-auto`}
                      type="button"
                      onClick={() => handleChangeCiudades(ciudad.id)}
                    >
                      <h1
                        className={`${campaña.ciudades.includes(ciudad.id)
                          ? "text-white"
                          : "text-gray-500"
                          } text-sm text-center w-full overflow-ellipsis whitespace-nowrap`}
                      >
                        {ciudad.nombre}
                      </h1>
                    </button>
                  ))}
                </div>
                <br />
              </div>
            </div>
            {
              ((fieldsDisabled && multiPolygon.length !== 0) || !fieldsDisabled) &&
              <div className="flex flex-col h-full lg:mx-0 flex-grow">
                <div className=" mx-auto custom-shadow rounded-md w-full lg:w-full bg-white p-5 ">
                  <h1 className="text-[#425AC5] text-xs md:text-[17px] w-10/12 lg:w-full text-left mb-[15px]">
                    Seleccione el area en el mapa
                  </h1>
                  <MultiPolygonCreator
                    multiPolygon={multiPolygon}
                    setMultiPolygon={setMultiPolygon}
                    viewOnly={fieldsDisabled}
                  />
                </div>
              </div>
            }
          </div>
        </div>
        {
          !fieldsDisabled &&
          <button
            className={`${paso === 4 ? "block" : "hidden lg:block"
              }  bg-[#425AC5] flex justify-center mx-auto   text-base rounded-md py-2 px-2 text-white font-myriad w-[184px]  align-middle text-center my-10`}
            type="submit"
          >
            Guardar
          </button>
        }
      </div>
      {
        seeCodes && codes &&
        <SeeCodes codes={codes} close={() => setSeeCodes(false)} />
      }
    </form>
  );
};

export default CrearCampaña;
