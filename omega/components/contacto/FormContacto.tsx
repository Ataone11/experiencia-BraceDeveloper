import Image from 'next/image'
import { useState } from 'react'
import contacto from '../../assets/images/contacto/Contacto_Formulario_1.jpg'
import iconVida from '../../assets/icons/vida.svg'
import iconHouse from '../../assets/icons/hogar.svg'
import iconPymes from '../../assets/icons/pymes.svg'
import iconCar from '../../assets/icons/car.svg'
import iconPlus from '../../assets/icons/plus.svg'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { PulseLoader } from 'react-spinners'

interface Props {
  title?: string
  icon: any | string
  id: number
}

const dataSecure: Props[] = [
  {
    id: 1,
    title: 'Vida',
    icon: iconVida
  },
  {
    id: 2,
    title: 'Hogar',
    icon: iconHouse
  },
  {
    id: 3,
    title: 'PYMES',
    icon: iconPymes
  },
  // {
  //   id: 4,
  //   title: 'Estatales',
  //   icon: iconBills
  // },
  {
    id: 5,
    title: 'Automovíles',
    icon: iconCar
  },
  {
    id: 6,
    title: 'Otros',
    icon: iconPlus
  }
]

const FormContacto = () => {
  const [servicios, setServicios] = useState(dataSecure[0])
  const [descarga, setDescarga] = useState(false)
  const [data, setData] = useState<any>({
    nombre: '',
    correo: '',
    contacto: '',
    mensaje: '',
    asesoria: '',
    seguro: dataSecure[0].title,
    tipoPersona: 'Empresa'
  })

  const [sent, setSent] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [completeFields, setCompleteFields] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleServicios = (item: any) => {
    setServicios(item)
    setData({
      ...data,
      seguro: item.title
    })
  }

  const borrarArchivos = () => {
    setData({
      ...data,
      archivo: null
    })
  }

  const descargar = (e: any) => {
    e.preventDefault()
    if (descarga) {
      setData({
        ...data,
        archivo: null
      })
    }
    setDescarga(!descarga)
  }

  const insertarArchivo = (e: any) => {
    setData({
      ...data,
      archivo: e.target.files[0]
    })
  }

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (data.asesoria !== '' && data.seguro !== '') {
      setError(false)
      const formData = new FormData()
      Object.keys(data).forEach((key: any) => {
        formData.append(key, data[key])
      })
      try {
        setLoading(true)
        const result = await axios.post(
          `${API_URL}/api/correo/contacto`,
          formData
        )
        setLoading(false)
        if (result.status === 200) {
          setSent(true)
        } else {
          setError(true)
        }
      } catch (error) {
        console.log('error', error)
        setLoading(false)
        setError(true)
      }
    } else {
      setCompleteFields(true)
    }
  }

  return (
    <div className="sm:mx-3">
      <div className="bg-white w-full h-full flex justify-center">
        <h2 className="text-redOmega text-2xl md:text-3xl lg:text-4xl font-bold font-myriad w-[65%] md:w-full lg:w-[80%] text-center  tracking-widest md:my-7">
          ESCRÍBENOS PARA AYUDARTE
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto md:pb-5">
        <div className="relative flex justify-start sm:justify-center pt-8 md:hidden after:bg-gray-100 after:content-[''] after:absolute after:w-[90%] after:h-[80%] after:rounded-3xl after:top-16 image-shadow after:self-end after:right-0 w-[70%] mx-auto min-w-[250px]">
          <Image
            src={contacto}
            width={360}
            height={180}
            layout="fixed"
            className="rounded-2xl pt-5 z-10"
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </div>

        <div className="w-full flex flex-col items-start lg:mx-auto md:w-full my-5 md:my-0 lg:max-w-[530px] md:px-5">
          <div className="px-3 md:h-[13%] lg:h-[15%] my-5 md:my-10 lg:my-5 md:mx-0 max-w-[85%] min-w-[320px] m-auto md:px-0">
            <h1 className="text-center md:text-left font-bold font-myriad">
              Selecciona el seguro que necesitas
            </h1>
            <div className="flex flex-row justify-between md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-12 my-5 md:my-2 lg:my-2">
              {dataSecure.map((item: any) => (
                <div key={item.id} className="flex justify-center">
                  <div
                    className={`${
                      servicios.id === item.id
                        ? ''
                        : 'bg-greyOmega hover:bg-redOmega'
                    }  p-5 w-6 h-6 sm:w-6 md:w-10 md:h-10 lg:w-12 lg:h-12 flex justify-center items-center bg-redOmega rounded-full  cursor-pointer hover:scale-105 hover:shadow-redOmega2 hover:shadow-md transition ease-in-out delay-150 duration-150`}
                    onClick={() => handleServicios(item)}
                  >
                    <div
                      className="relative  w-3 h-6 p-2 sm:p-3 md:p-3 lg:p-3 rounded-full"
                      key={item.id}
                    >
                      <Image
                        className="p-4 "
                        layout="fill"
                        src={item.icon}
                        alt=""
                      />
                    </div>
                  </div>
                  <h1
                    className={`${
                      servicios.id === item.id ? 'text-redOmega' : 'hidden '
                    } items-center font-myriad font-bold transition-all pt-[50px]  md:pt-14 absolute `}
                  >
                    {item.title}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col relative w-full px-5 md:px-0">
            <h1 className="text-left font-bold md:pt-0 lg:pt-3 font-myriad mb-2">
              Selecciona la asesoría que necesitas
            </h1>
            <select
              className="rounded-xl py-2 w-full border-greyOmega border-2 md:my-2 lg:my-0"
              name="asesoria"
              onChange={handleChange}
              required
            >
              <option disabled selected></option>
              <option value="Programas de seguros">Programas de seguros</option>
              <option value="Reclamación de siniestros">
                Reclamación de siniestros
              </option>
              <option value="Contrataciones jurídicas">
                Contrataciones jurídicas
              </option>
              <option value="Análisis de administración de riesgos">
                Análisis de administración de riesgos
              </option>
              <option value="No necesito ninguna asesoría">
                No necesito ninguna asesoría
              </option>
            </select>
          </div>
          <div className="relative ">
            <div className="w-[393px] h-[229px] bg-gray-200  bottom-5 rounded-3xl xl:-right-0 lg:-right-16 absolute hidden lg:block xl:hidden"></div>
            <div className="pt-8 md:pt-10 hidden lg:block xl:hidden ">
              <Image
                src={contacto}
                width={393}
                height={229}
                layout="fixed"
                className="rounded-3xl pt-5 static"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
            <div className="w-[303px] h-[180px] bg-gray-200 rounded-3xl  absolute top-16 inset-x-11  hidden md:block lg:hidden"></div>
            <div className="pt-8 md:pt-10 hidden lg:hidden md:block">
              <Image
                src={contacto}
                width={328}
                height={179}
                layout="fixed"
                className="rounded-3xl pt-5"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
            <div className="w-[420px] h-[229px] bg-gray-200 rounded-3xl  absolute top-6 inset-x-8  hidden lg:hidden xl:block 2xl:hidden"></div>
            <div className="pt-8 md:pt-10 hidden lg:hidden xl:block 2xl:hidden">
              <Image
                src={contacto}
                width={420}
                height={229}
                layout="fixed"
                className="rounded-3xl pt-5"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
            <div className="w-[478px] h-[279px] bg-gray-200 rounded-3xl  absolute top-6 inset-x-11  hidden lg:hidden 2xl:block"></div>
            <div className="pt-8 md:pt-14 hidden lg:hidden 2xl:block">
              <Image
                src={contacto}
                width={478}
                height={279}
                layout="fixed"
                className="rounded-3xl pt-5"
                objectFit="cover"
                objectPosition="50% 50%"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full my-0 items-center">
          {sent ? (
            <h3 className="text-2xl font-bold text-redOmega w-full mx-10 py-20 text-center h-[100%] flex items-center">
              Gracias por escribirnos, intentaremos responder lo antes posible!
            </h3>
          ) : (
            <form className="w-full md:pt-5 px-5" onSubmit={handleSubmit}>
              <h1 className="font-bold mb-2">Nombre completo</h1>
              <div className="flex flex-wrap mb-6 md:my-1 lg:my-3">
                <div className="w-full">
                  <input
                    className="appearance-none block w-full  text-normal border border-greyOmega rounded-lg   py-2 px-3 leading-tight focus:outline-none "
                    name="nombre"
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <h1 className="font-bold mb-2">Número de contacto</h1>
              <div className="flex flex-wrap mb-6 md:my-1 lg:my-3">
                <div className="w-full">
                  <input
                    className="appearance-none block w-full  text-normal border border-greyOmega rounded-lg  py-2 px-3 leading-tight focus:outline-none  "
                    name="contacto"
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <h1 className="font-bold mb-2">Correo electrónico</h1>
              <div className="flex flex-wrap mb-6 md:my-1 lg:my-3">
                <div className="w-full">
                  <input
                    className="appearance-none block w-full text-normal border border-greyOmega rounded-lg  py-2 px-3 leading-tight focus:outline-none  "
                    name="correo"
                    onChange={handleChange}
                    type="email"
                    required
                  />
                </div>
              </div>
              <h1 className="font-bold mb-2">Mensaje</h1>
              <div className="flex flex-wrap mb-6 md:my-1 lg:my-3">
                <div className="w-full">
                  <textarea
                    className="form-control ease-in-out  block w-full text-normal border border-greyOmega rounded-xl  h-[90px]  md:h-[90px]  lg:h-[120px] xl:h-[140px] py-2  px-3 leading-tight focus:outline-none  "
                    name="mensaje"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div
                onChange={handleChange}
                className="flex flex-col justify-start items-start w-full mt-4"
              >
                <h5 className="font-bold text-base">
                  ¿Eres empresa o persona?
                </h5>
                <div className="flex items-center justify-start mt-2">
                  <input
                    defaultChecked
                    type="radio"
                    id="empresa"
                    name="tipoPersona"
                    value="Empresa"
                    className="accent-pink-300 focus:accent-pink-500"
                  />
                  &nbsp;
                  <label className="ml-2" htmlFor="empresa">
                    Empresa
                  </label>
                </div>
                <div className="flex items-center justify-start">
                  <input
                    type="radio"
                    id="persona"
                    name="tipoPersona"
                    value="Persona"
                    className="accent-pink-300 focus:accent-pink-500"
                  />
                  &nbsp;
                  <label className="ml-2" htmlFor="persona">
                    Persona
                  </label>
                </div>
              </div>
              <div className="flex justify-between md:justify-start items-center w-full mt-4">
                <h5 className="font-bold text-base">
                  ¿Desea adjuntar el SARLAFT?
                </h5>
                <button
                  className={`${
                    descarga === false
                      ? 'transition ease-in duration-500'
                      : 'transition ease-in duration-500'
                  }   bg-redOmega hover:bg-redOmega rounded-full py-2 px-5 items-center md:ml-5`}
                  onClick={descargar}
                >
                  <h1
                    className={`${
                      descarga === false
                        ? 'block transition ease-in duration-300 opacity-100'
                        : 'hidden transition ease-in duration-300 opacity-0'
                    }   text-white font-bold font-myriad text-sm lg:text-[16px]`}
                  >
                    Descargar plantilla
                  </h1>
                  <h1
                    className={`${
                      descarga === true
                        ? 'block transition ease-in duration-500 opacity-100 '
                        : 'hidden transition ease-in duration-500 opacity-0'
                    }   text-white font-bold font-myriad text-sm lg:text-[16px]`}
                  >
                    Cancelar
                  </h1>
                </button>
              </div>
              <div
                className={`${
                  descarga === true
                    ? 'transition-opacity   duration-300 ease-out opacity-100'
                    : 'transition-opacity  duration-300 ease-in opacity-0'
                }   flex`}
              >
                <button
                  type="button"
                  className="bg-redOmega hover:bg-redOmega  rounded-full py-1 px-3 text-white font-myriad w-[230px] h-[35px] align-middle text-center my-5"
                >
                  <input
                    className={`${
                      descarga === true ? 'block' : 'hidden'
                    }  flex justify-start items-center font-myriad font-bold transition-all  absolute w-[250px] align-middle text-center opacity-0 cursor-pointer`}
                    type="file"
                    name="files"
                    onChange={insertarArchivo}
                  />
                  <h1 className="text-sm md:text-xs lg:text-xs xl:text-base">
                    Subir documento
                  </h1>
                </button>

                <label className="appearance-none w-[64%] text-normal border border-greyOmega rounded-lg   mx-4 my-5  leading-tight focus:outline-none h-[40px] p-2 flex justify-between ">
                  <div className="overflow-auto">{data.archivo?.name}</div>
                  <div className="text-right flex justify-end">
                    <button
                      type="button"
                      className="text-greyOmega"
                      onClick={borrarArchivos}
                    >
                      X
                    </button>
                  </div>
                </label>
              </div>

              <div
                className={`${
                  descarga === true ? 'translate-y-2' : '-translate-y-16'
                } relative flex justify-center md:justify-start items-center font-myriad font-bold transition-all ease-in duration-300 md:w-[40%] align-middle text-center`}
              >
                {error && (
                  <span className="absolute bottom-[95%] text-xs text-redOmega">
                    Hubo un error, inténtelo de nuevo
                  </span>
                )}
                {completeFields && (
                  <span className="absolute bottom-[95%] text-xs text-redOmega">
                    Por favor completa todos los campos
                  </span>
                )}
                {loading ? (
                  <PulseLoader color="#CC0000" />
                ) : (
                  <button
                    className="btn-primary mt-2 w-auto align-middle text-center my-4"
                    type="submit"
                  >
                    Enviar
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormContacto
