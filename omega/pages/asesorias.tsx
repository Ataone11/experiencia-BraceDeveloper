import Image from 'next/image'
import CardOne from '../components/CardOne'
import Asesoria1 from '../assets/images/asesorias/Asesorias_Paquete-de-seguros.jpg'
import Formulario from '../assets/images/asesorias/Asesoria_Formulario.jpg'
import Detalle from '../components/asesorias/DetalleAsesoria'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { PulseLoader } from 'react-spinners'

const asesorias = () => {
  const [data, setData] = useState<any>({
    nombre: '',
    correo: '',
    contacto: '',
    mensaje: '',
    asesoria: ''
  })

  const [sent, setSent] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [completeFields, setCompleteFields] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (data.asesoria !== '') {
      setError(false)
      const formData = new FormData()
      Object.keys(data).forEach((key: any) => {
        formData.append(key, data[key])
      })
      try {
        setLoading(true)
        const result = await axios.post(`${API_URL}/api/correo/asesoria`, formData)
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
    <div className="scroll-smooth">
      <div className="bg-white w-full h-full  items-center justify-center">
        <div className="w-full flex flex-col items-center my-5 pt-3 md:pt-5 lg:pt-20">
          <h2
            className="text-redOmega text-3xl xl:text-4xl font-bold
           w-[50%] text-center  tracking-widest md:w-full"
          >
            NUESTRAS ASESORÍAS
          </h2>
        </div>
        <div className="">
          <Detalle />
        </div>
        <div className="bg-gray-100 py-8 my-3 md:my-10">
          <div className="container mx-auto">
            <CardOne
              image={Asesoria1}
              titleOne="ASESORÍA EN PAQUETES DE SEGUROS"
              description="Sabemos que puedes llegar a tener más de un aspecto de tu vida que necesita de la mejor protección, es por eso que te invitamos a que conozcas nuestros diferentes paquetes de seguros, para que no dejes ni un detalle a la deriva."
              button="Cotiza con nosotros"
            />
          </div>
        </div>
      </div>
      <div className="bg-white w-full h-full flex justify-center mx-auto my-7 ">
        <h2 className="text-redOmega text-2xl md:text-4xl font-bold w-[65%] md:w-[80%] text-center  tracking-widest">
          AGENDA UNA ASESORÍA CON NOSOTROS
        </h2>
      </div>
      <div
        id="final"
        className="flex flex-col mx-auto md:grid md:grid-cols-2 md:m-auto container lg:mx-auto  lg:gap-x-52 my-5"
      >
        <div className="relative md:hidden">
          <div className=" relative  mx-10 md:mx-0 flex justify-center  md:hidden after:bg-gray-100 after:content-[''] after:absolute after:w-[90%] after:h-full after:rounded-3xl after:top-5 image-shadow after:self-end after:right-0">
            <Image
              src={Formulario}
              width={380}
              height={201}
              layout="fixed"
              className="rounded-xl pt-5 z-10"
              objectFit="cover"
              objectPosition="center-top"
            />
          </div>
        </div>
        <div className="px-5 xl:mx-40 lg:mx-5 md:mx-5 md:w-full lg:w-full xl:w-[80%]">
          <div className="my-5 md:mx-0">
            <h1 className="text-left font-bold">
              Selecciona la asesoría que necesitas
            </h1>
          </div>
          <div className="flex justify-center md:justify-start relative ">
            <select
              className="rounded-xl w-full py-2 border-greyOmega border-2 md:my-2 lg:my-0 "
              onChange={handleChange}
              name="asesoria"
              required
              id=""
            >
              <option disabled selected></option>

              <option value="Programas de seguros">
                Programas de seguros
              </option>
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
          <h1 className="text-left font-bold font-myriad my-5">
            *Revisaremos nuestra disponibilidad y te contaremos para agendar una
            reunión remota
          </h1>
          <div className="relative lg:block">
            <div className="w-[500px] h-[270px] bg-gray-100 rounded-3xl  absolute -bottom-3 left-9 hidden  lg:block"></div>
            <div className=" relative  pt-8 md:pt-0 hidden lg:block ">
              <Image
                src={Formulario}
                width={500}
                height={280}
                layout="fixed"
                className="rounded-2xl"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
          </div>
          <div className="relative md:block hidden lg:hidden">
            <div className="w-[320px] h-[180px] bg-gray-100 rounded-3xl  absolute -bottom-3 left-9 hidden  md:block lg:hidden"></div>
            <div className=" relative  pt-8 md:pt-0 hidden md:block lg:hidden">
              <Image
                src={Formulario}
                width={320}
                height={180}
                layout="fixed"
                className="rounded-3xl"
                objectFit="cover"
                objectPosition="top"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full px-5">
          {sent ? (
            <h3 className="text-2xl font-bold text-redOmega w-[85%] mx-10 py-20 md:w-[99%] lg:w-[75%] text-center h-[100%] flex items-center">
              Gracias por escribirnos, intentaremos responder lo antes posible!
            </h3>
          ) : (
            <form
              className="w-full md:pt-5 sm:w-full"
              onSubmit={handleSubmit}
            >
              <h1 className="font-bold">Nombre completo</h1>
              <div className="flex flex-wrap mb-6 md:my-3">
                <div className="w-full">
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
                    name="nombre"
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <h1 className="font-bold">Número de contacto</h1>
              <div className="flex flex-wrap mb-6 md:my-3">
                <div className="w-full">
                  <input
                    className="appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="contacto"
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <h1 className="font-bold">Correo electrónico</h1>
              <div className="flex flex-wrap mb-6 md:my-3">
                <div className="w-full">
                  <input
                    className="appearance-none block w-full text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                    name="correo"
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center lg:justify-start relative">
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
                {
                  loading ?
                    <PulseLoader color='#CC0000'/>:
                    <button
                      className="btn-primary mt-2 w-auto align-middle text-center my-4"
                      type="submit"
                    >
                      Enviar
                    </button>
                }
              </div>
            </form>
          )}
        </div>
      </div>
      <div></div>
      <br />
      <br />
    </div>
  )
}

export default asesorias
