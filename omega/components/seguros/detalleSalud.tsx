import Image from 'next/image'
import seguro1 from '../../assets/images/seguros/Seguros_Personas_Vida.jpg'

const Detalle = () => {
  return (
    <div className="">
      <div className="bg-white w-full h-full items-center justify-center">
        <div className="w-full flex justify-between items-center my-5 pt-20 md:pt-5 lg:pt-20">
          <h2
            className="text-redOmega text-3xl xl:text-4xl font-bold
         w-[50%] text-center  tracking-widest md:w-full"
          >
            Seguro de vida
          </h2>
          <div className="w-[319px] h-[181px] bg-gray-100 rounded-3xl  absolute -bottom-3 right-10 md:hidden"></div>
          <div className=" relative  mx-10 md:mx-0 flex md:justify-center  md:hidden">
            <Image
              src={seguro1}
              width={380}
              height={201}
              layout="fixed"
              className="rounded-xl pt-5"
              objectFit="cover"
              objectPosition="center-top"
            />
          </div>
        </div>

        <div className="bg-gray-100 py-8 my-3 md:my-10">
          <div className="container mx-auto"></div>
        </div>
      </div>
      <div className="bg-white w-full h-full flex justify-center mx-auto my-7 ">
        <h2 className="text-redOmega text-2xl md:text-4xl font-bold w-[65%] md:w-[80%] text-center  tracking-widest">
          AGENDA UNA ASESORÍA CON NOSOTROS
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:m-auto container lg:mx-auto  lg:gap-x-52 my-5">
        <div className="relative md:hidden">
          <div className="w-[319px] h-[181px] bg-gray-100 rounded-3xl  absolute -bottom-3 right-10 md:hidden"></div>
          <div className=" relative  mx-10 md:mx-0 flex md:justify-center  md:hidden">
            <Image
              src={seguro1}
              width={380}
              height={201}
              layout="fixed"
              className="rounded-xl pt-5"
              objectFit="cover"
              objectPosition="center-top"
            />
          </div>
        </div>
        <div className="xl:mx-40 lg:mx-5 md:mx-5 md:w-full lg:w-full xl:w-[80%]">
          <div className="w-[85%] my-5 mx-10 md:mx-0">
            <h1 className="text-left font-bold">
              Selecciona la asesoría que necesitas
            </h1>
          </div>
          <div className="flex justify-center md:justify-start relative my-5">
            <select
              className="rounded-xl w-[85%]  lg:w-[100%] py-2 border-greyOmega border-2 "
              name=""
              id=""
            >
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
          <h1 className="text-left font-bold font-myriad w-[85%] my-5 mx-10 md:mx-0">
            *Revisaremos nuestra disponibilidad y te contaremos para agendar una
            reunión remota
          </h1>
          <div className="relative lg:block">
            <div className="w-[500px] h-[270px] bg-gray-100 rounded-3xl  absolute -bottom-3 left-9 hidden  lg:block"></div>
            <div className=" relative  pt-8 md:pt-0 hidden lg:block ">
              <Image
                src={seguro1}
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
                src={seguro1}
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
        <div className="flex flex-col w-full mx-10 md:mx-0">
          <div className="w-[85%]  md:pt-5 sm:w-full xl:w-[80%]">
            <h1 className="font-bold">Nombre completo</h1>
            <div className="flex flex-wrap -mx-3 mb-6 md:my-3">
              <div className="w-full px-3">
                <input
                  className="appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg   py-2 px-3 mb-3 leading-tight focus:outline-none "
                  name="Nombre"
                />
              </div>
            </div>
            <h1 className="font-bold">Número de contacto</h1>
            <div className="flex flex-wrap -mx-3 mb-6 md:my-3">
              <div className="w-full px-3">
                <input
                  className="appearance-none block w-full  text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                  name="contacto"
                />
              </div>
            </div>
            <h1 className="font-bold">Correo electrónico</h1>
            <div className="flex flex-wrap -mx-3 mb-6 md:my-3">
              <div className="w-full px-3">
                <input
                  className="appearance-none block w-full text-gray-700 border border-greyOmega rounded-lg  py-2 px-3 mb-3 leading-tight focus:outline-none  "
                  name="correo"
                />
              </div>
            </div>
            <div className="flex justify-center lg:justify-start">
              <button className="btn-primary mt-4 w-auto align-middle text-center">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <br />
      <br />
    </div>
  )
}
export default Detalle
