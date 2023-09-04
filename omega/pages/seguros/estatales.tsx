import Image from 'next/image'
import Link from 'next/link'
import estatales from '../../assets/images/seguros/Seguros_Empresas_Estatales.jpg'
import Hogar from '../../assets/images/seguros/Seguros_Detalle_Estatales.jpg'
import auto from '../../assets/images/seguros/Seguros_Detalle_Estatales_Programa.jpg'
import pymes from '../../assets/images/seguros/Seguros_Detalle_Estatales_Vida.jpg'
import personaje from '../../assets/images/seguros/Seguros_Personaje.png'

const detalle = () => {
  return (
    <div className="">
      <div className="bg-white w-full h-full  items-center justify-evenly ">
        <div className="w-full md:grid lg:grid-cols-2 items-center pt-5 md:pt-5 lg:pt-20 max-w-[1400px] mx-auto md:my-auto lg:px-5">
          <div className=" mx-5">
            <Link href="/seguros">
              <div className="items-center md:my-10 pb-10">
                <div className="absolute arrow-btn  text-center p-2 cursor-pointer bg-redOmega rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </div>
              </div>
            </Link>
            <div className="min-w-[250px] w-full relative flex lg:hidden lg:pt-8 h-[100%] mx-auto after:bg-gray-200 after:content-[''] after:absolute after:w-[80%] after:h-full after:rounded-2xl after:top-3 image-shadow after:self-end after:left-0">
              <Image
                src={estatales}
                width={335}
                height={128}
                className="rounded-2xl relative z-10  w-[95%] h-full shadow mr-auto"
                alt=""
                layout="fixed"
                objectFit="cover"
                objectPosition="90% 50%"
              />
            </div>
            <h2 className="text-redOmega text-2xl md:text-3xl xl:text-4xl font-bold text-left tracking-widest md:w-full mb-[3px] mt-[25px]">
              SEGURO ESTATAL
            </h2>
            <div className="w-full lg:w-[75%] items-center justify-center">
              <span className="text-left text-[14px]">
                Este conjunto de seguros va dirigidos a escenarios donde
                intervienen instrtuciones Estatales, ejerciendo la función
                titular, regulando las bases, y estructura del seguro y
                asumiendo el riesgo en todo.{' '}
              </span>
              <span className="text-left text-[14px] my-3">
                En Omega te ofrecemos{' '}
                <b>un seguro de cumplimiento a favor de entidades estatales.</b>
              </span>
            </div>
          </div>
          {/*  */}
          {/* <div className="min-w-[250px] w-full relative flex lg:hidden lg:pt-8 h-[100%] mx-auto after:bg-gray-200 after:content-[''] after:absolute after:w-[80%] after:h-full after:rounded-2xl after:top-3 image-shadow after:self-end after:left-0">
              <Image
                src={estatales}
                width={335}
                height={128}
                className="rounded-2xl relative z-10  w-[95%] h-full shadow mr-auto"
                alt=""
                layout="fixed"
                objectFit="cover"
                objectPosition="90% 50%"
              />
            </div> */}
          <div className="relative container mx-auto hidden lg:block">
            <div className="relative mx-10 md:mx-0 flex md:justify-center after:bg-gray-200 after:content-[''] after:absolute after:w-[80%] after:h-full after:rounded-2xl after:top-6 image-shadow after:self-end after:left-0">
              <Image
                src={estatales}
                width={580}
                height={321}
                layout="fixed"
                className="rounded-3xl pt-5"
                objectFit="cover"
                objectPosition="center-top"
              />
            </div>
          </div>
        </div>
        <div className="w-[45%] mx-auto hidden lg:block">
          <h2 className="text-redOmega text-2xl md:text-3xl xl:text-4xl font-bold text-center tracking-widest md:w-full my-5 md:mt-[70px]">
            SEGURO DE CUMPLIMIENTO A FAVOR DE ENTIDADES ESTATALES
          </h2>
        </div>
        <div className="flex lg:grid lg:grid-cols-2 mx-auto lg:gap-x-[35px] container lg:px-10">
          <div className="container hidden lg:w-[90%] lg:mx-auto lg:flex items-center lg:self-center justify-center after:bg-gray-200 relative after:content-[''] after:absolute after:w-[80%] after:h-full after:rounded-2xl after:top-6 image-shadow after:self-end after:left-0">
            <Image
              src={Hogar}
              width={555}
              height={306}
              layout="fixed"
              className="rounded-3xl relative mx-auto"
              objectFit="cover"
              objectPosition="center-top"
            />
          </div>
          <div className="container mx-auto lg:my-5 mt-[38px]">
            <div className="bg-white rounded-xl shadow-xl m-auto w-[300px] lg:w-full lg:flex lg:flex-row static py-[27px] px-[22px] lg:py-[41px] lg:px-[63px]">
              <div className="w-full h-auto">
                <h2 className="text-redOmega text-2xl lg:text-3xl font-bold w-[70%] text-left tracking-widest md:w-full">
                  ¿QUE ES?
                </h2>
                <h1 className="mt-5 text-sm">
                  Cualquier entidad estatal puede solicitar a sus constansisas
                  el ortorgamiento de este seguro para garantizar el
                  cumplimiento de los contratos suscritos por estos.
                </h1>
              </div>
            </div>
            <div className="mx-auto container my-5">
              <div className="container ">
                <div className="bg-white rounded-xl shadow-xl m-auto w-[300px] md:h-[45%] lg:w-full lg:flex lg:flex-row static pt-[27px] px-[22px] lg:pt-[41px] lg:pl-[63px] lg:pr-[10px]">
                  <div className="w-full h-auto">
                    <h2 className="text-redOmega text-2xl lg:text-3xl font-bold w-[70%]  text-left tracking-widest md:w-full">
                      ¿CUÁNDO USAR ESTE SEGURO?
                    </h2>
                    <h1 className="my-5 text-sm md:mb-[41px]">
                      Este seguro de proteccíon y seguridad a su entidad estatal
                      ante la falla de los contratistas. Respaldará su gestión
                      administrativa y sentirá tranquilidad a la hora de firmar
                      contratos, ofertas mercantines, órdenes de compra u otros
                      documentos con los que el patrimonio de su organización
                      está en juego.
                    </h1>
                  </div>
                  <div className="lg:flex hidden self-end">
                    <Image
                      src={personaje}
                      width={190}
                      height={221}
                      layout="fixed"
                      className="rounded-3xl"
                      objectFit="cover"
                      objectPosition="center-bottom"
                    />
                  </div>
                  <div className="lg:hidden flex flex-row-reverse">
                    <Image
                      src={personaje}
                      width={140}
                      height={141}
                      layout="fixed"
                      className="rounded-2xl"
                      objectFit="cover"
                      objectPosition="center-bottom"
                    />
                    <Image
                      src={Hogar}
                      width={180}
                      height={111}
                      layout="fixed"
                      className="rounded-2xl"
                      objectFit="cover"
                      objectPosition="center-bottom"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 mt-5 md:mt-10 relative py-[23px] lg:py-[70px]">
          <div className="md:grid md:grid-cols-2 container lg:mx-auto">
            <div className="bg-white rounded-xl shadow-xl m-auto w-[85%] sm:w-[400px] md:w-[70%] relative md:flex md:flex-col">
              <div className="relative w-full h-[180px]">
                <Image
                  src={auto}
                  alt=""
                  layout="fill"
                  className="rounded-t-lg md:rounded-r-xl"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
              <div className="rounded-b-xl md:rounded-r-xl flex flex-col py-[27px] px-[22px]">
                <h3 className="text-redOmega text-large tracking-[.2em] font-bold  lg:mx-8">
                  PROGRAMA DE SEGUROS PPARA ENTIDADES ESTATALES
                </h3>
                <p className="text-sm mt-2  lg:mx-8 md:my-4 font-normal lg:text-[16px]">
                  Cada negocio es diferente, y así mismo lo son sus necesidades.
                </p>
                <p className="text-sm mt-2 lg:mx-8 md:my-2 font-normal lg:text-[16px]">
                  Contamos con coberturas básicas que protegen tu capittal y
                  también cib coberturas adicionales que se ajustan a los
                  riesgos que se puede llegar a enfrentar tu empresa dentro de
                  su actividad comercial.
                </p>
                <div className="flex flex-row static my-3 text-[14px]">
                  <h1 className="text-redOmega font-bold  mx-2 lg:mx-8">⚫︎</h1>
                  Protección contra daño material de su capital físico
                </div>
                <div className="flex flex-row static my-3 text-[14px]">
                  <h1 className="text-redOmega font-bold  mx-2 lg:mx-8">⚫︎</h1>
                  Responsabilidad ante pérdidas directas de dinero, títulos
                  valores u otras propiedades, a causa de malas prácticas de
                  cualquier empleado o asegurado de la empresa
                </div>
                <div className="flex flex-row static my-3 text-[14px]">
                  <h1 className="text-redOmega font-bold  mx-2 lg:mx-8">⚫︎</h1>
                  Asistencia Jurídica
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl m-auto w-[85%] sm:w-[400px] md:w-[70%] relative md:flex md:flex-col my-[25px] md:my-0">
              <div className="relative w-full h-[180px]">
                <Image
                  src={pymes}
                  alt=""
                  layout="fill"
                  className="rounded-t-lg md:rounded-r-xl"
                  objectFit="cover"
                  objectPosition="top"
                />
              </div>
              <div className="rounded-b-xl md:rounded-r-xl flex flex-col py-[27px] px-[22px]">
                <h3 className="text-redOmega text-large tracking-[.2em] font-bold lg:mx-8">
                  SEGURO DE VIDA PARA ENTIDADES ESTATALES
                </h3>
                <p className="text-sm mt-2 lg:mx-8 md:my-4 font-normal lg:text-[16px]">
                  Si eres el principal proveedor de capital económico en tu
                  familia, somo conscientes de que no quieres dejar a tus seres
                  queridos sin un sustento en caso de que ya no te encuentres
                  presente.
                </p>
                <p className="text-sm mt-2 lg:mx-8 md:my-2 font-normal lg:text-[16px]">
                  Es por esto que un seguro de vida es la mejor forma de
                  garantizar la subsistencia de aquellos que dependen de ti en
                  caso dde un fallecimiento repentino.
                </p>
                <div className="flex flex-row static my-3 text-[14px]">
                  <h1 className="text-redOmega font-bold  mx-2 lg:mx-8">⚫︎</h1>
                  Soporte económico en caso de fallecimiento del asegurado
                </div>
                <div className="flex flex-row static my-3 text-[14px]">
                  <h1 className="text-redOmega font-bold mx-2 lg:mx-8">⚫︎</h1>
                  Cobertura de incapacidad total o permanente
                </div>
                <div className="flex flex-row static my-3 text-[14px]">
                  <h1 className="text-redOmega font-bold  mx-2 lg:mx-8">⚫︎</h1>
                  Cobertura de enfermedades graves no preexistentes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default detalle
