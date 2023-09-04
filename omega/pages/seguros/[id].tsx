import Image from 'next/image'
import Link from 'next/link'
import seguro1 from '../../assets/images/seguros/Seguros_Personas_Vida.jpg'
import vida from '../../assets/images/seguros/Seguros_Detalle_Vida.jpg'
import Hogar from '../../assets/images/seguros/Seguros_Detalle_Hogar.jpg'
import auto from '../../assets/images/seguros/Seguros_Detalle_Automoviles.jpg'
import pymes from '../../assets/images/seguros/Seguros_Detalle_Pymes.jpg'
import seguro2 from '../../assets/images/seguros/Seguros_Personas_Hogar.jpg'
import seguro3 from '../../assets/images/seguros/Seguros_Personas_Automoviles.jpg'
import personaje from '../../assets/images/seguros/Seguros_Personaje.png'
import seguro4 from '../../assets/images/seguros/Seguros_Empresas_PYMES.jpg'
import { useRouter } from 'next/router'

interface Props {
  title?: string
  negrilla?: string
  description?: string
  // eslint-disable-next-line no-undef
  image?: StaticImageData | string
  // eslint-disable-next-line no-undef
  imageC: StaticImageData | string
  titleC: string
  parrafo: string
  parrafo2: string
  megatitle: string
  col: string
  col2: string
  col3: string
  id: string
}

const dataSecure3: Props[] = [
  {
    id: 'seguro_vida',
    title: 'SEGUROS DE VIDA',
    negrilla: ' Protege aquello que más te importa.',
    description:
      'Asegura el bienestar y futuro de tu familia, y atrévete a vivir plenamente.',
    image: seguro1,
    imageC: vida,
    titleC: '¿CUANDO USAR ESTE SEGURO?',
    parrafo:
      'Si eres el principal proveedor de capital económico en tu familia, somos conscientes de que no quieres dejar a tus seres queridos sin un sustento en caso de que ya no te encuentres presente.',
    parrafo2:
      'Es por esto que un seguro de vida es la mejor forma de garantizar la subsistencia de aquellos que dependen de ti en caso de un fallecimiento repentino.',
    megatitle: '¿QUÉ TE OFRECEMOS CON EL SEGURO DE VIDA OMEGA?',
    col: 'Soporte económico en caso de fallecimiento del asegurado',
    col2: 'Cobertura de incapacidad total o permanente',
    col3: 'Cobertura den enfermedades graves no preexistentes'
  },
  {
    id: 'seguro_hogar',
    title: 'SEGURO PARA HOGAR',
    negrilla: 'Sabemos el valor de tu esfuerzo.',
    description:
      'Te ayudamos a cuidar el hogaaque has construido y todos los elementos que hacen parte de él.',
    image: seguro2,
    imageC: Hogar,
    titleC: '¿CUÁNDO USAR ESTE SEGURO?',
    parrafo:
      'Cualquier imprevisto puede tomar lugar sin dar previo aviso. Protege tu vivienda y los bienes que hay en ella de cualquier daño material producto de accidentes, catástrofes naturales, acciones terroristas o acciones malintencionadas de terceros.',
    parrafo2: 'Protege lo que con tanto esfuerzo has construido.',
    megatitle: '¿QUÉ TE OFRECEMOS CON EL SEGURO PARA HOGAR OMEGA?',
    col: 'Protección contra situaciones imprevistas',
    col2: 'Asistencia domiciliaria para atender emergencias',
    col3: 'Cobertura de gastos de daños causados por ti o tu familia'
  },
  {
    id: 'seguro_automoviles',
    title: 'SEGURO DE AUTOMÓVILES',
    negrilla: 'Que nada te detenga en el camino. ',
    description:
      'Te ayudamos a que te aventures en cualquier travesía sin nungún limite.',
    image: seguro3,
    imageC: auto,
    titleC: '¿CUÁNDO USAR ESTE SEGURO?',
    parrafo:
      'No basta con ser buen conductor, cualquier cosa puede suceder en la vía.',
    parrafo2:
      'Protege tu vehículo ante cualquier eventualidad, desde asistencia y auxilio básico hasta la cobertura de gastos económicos de cada ocupante en caso de un accidente grave.',
    megatitle: '¿QUÉ TE OFRECEMOS CON EL SEGURO PARA HOGAR OMEGA?',
    col: 'Protección para tu patrimonio por robo o daños por accidente',
    col2: 'Cobertura de Responsabilidad Civil Extracontractual',
    col3: 'Asistencia Jurídica'
  },
  {
    id: 'seguro_pymes',
    title: 'SEGURO PARA PYMES',
    negrilla: 'Queremos verte crecer. ',
    description:
      'Protegemos tu empresa, negocio y tus empleados. Encuentra con nosotros la opción que más se ajusta a tus necesidades.',
    image: seguro4,
    imageC: pymes,
    titleC: '¿CUÁNDO USAR ESTE SEGURO?',
    parrafo: 'Cada negocio es diferente y así mismo lo son sus necesidades.',
    parrafo2:
      'Contamos con coberturas básicas que protegen tu capital y también con coberturas adicionales que se ajustan a los riesgos que se puede llegar a enfrentar tu empresa dentro de su actividad comercial.',
    megatitle: '¿QUÉ TE OFRECEMOS CON EL SEGURO PARA PYMES OMEGA?',
    col: 'Protección contra daño material de su capital físico',
    col2: 'Responsabilidad ante pérdidas direcas de dinero, títulos valores u otras propiedades, a causa de malas prácticas de cualquier empleado o asegurado de la empresa',
    col3: 'Asistencia Jurídica'
  }
]

const detalle = () => {
  const router = useRouter()
  return (
    <div className="overflow-x-hidden">
      {dataSecure3.map((item: any) => (
        <div
          key={item.id}
          className={`${
            item.id === router.query.id ? ' transition-opacity2' : 'hidden'
          }  `}
        >
          <div className="bg-white w-full h-full  items-center justify-evenly ">
            <div className="w-full md:grid lg:grid-cols-2 items-center  pt-5 md:pt-5 lg:pt-20 container mx-auto md:my-auto">
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
                <div className="min-w-[250px] w-full relative flex lg:hidden lg:pt-8 h-[100%] mx-auto after:bg-gray-200 after:content-[''] after:absolute after:w-[80%] after:h-full after:rounded-2xl after:top-3 image-shadow after:self-end after:right-0">
                  <Image
                    src={item.image}
                    width={335}
                    height={128}
                    className="rounded-2xl relative z-10  w-[95%] h-full shadow mr-auto"
                    alt=""
                    layout="fixed"
                    objectFit="cover"
                    objectPosition="90% 50%"
                  />
                </div>
                <h2 className="text-redOmega text-2xl md:text-3xl xl:text-4xl font-bold text-left tracking-widest md:w-full my-5">
                  {item.title}
                </h2>
                <div className="w-full items-center justify-center">
                  <span className="text-left text-base font-bold my-3">
                    {item.negrilla}{' '}
                  </span>
                  <br className="md:block hidden " />
                  <span>{item.description}</span>
                </div>
              </div>
              <div className="relative container mx-auto hidden lg:block">
                <div className="w-[519px] h-[281px] bg-gray-100 rounded-3xl  absolute  xl:top-16 xl:right-16"></div>
                <div className=" relative  mx-10 md:mx-0 flex md:justify-center">
                  <Image
                    src={item.image}
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

            <div className="bg-gray-100 lg:py-20 my-3 md:my-10">
              <div className="mx-auto container lg:w-[90vw] lg:h-[550px] relative max-w-[1100px] py-5">
                <div className="z-0 container hidden lg:block w-[55%] absolute lg:left-0 lg:top-0 full-image">
                  <Image
                    src={item.imageC}
                    width={555}
                    height={306}
                    layout="fixed"
                    className="rounded-3xl relative z-0 w-full"
                    objectFit="cover"
                    objectPosition="center-top"
                  />
                </div>
                <div className="container z-10 lg:w-[55%] lg:absolute lg:right-0 lg:bottom-0 m-auto">
                  <div className="bg-white rounded-xl shadow-xl m-auto w-[300px] lg:w-auto lg:flex lg:flex-row lg:min-h-[275px]">
                    <div className="w-full h-auto mb-5 flex flex-col">
                      <h2 className="text-redOmega text-2xl lg:text-3xl font-bold w-[90%] text-left tracking-widest md:w-full my-5 mx-5 lg:mx-16">
                        {item.titleC}
                      </h2>
                      <h1 className="w-[85%] my-5 md:w-[70%] mx-5 lg:mx-16 text-sm">
                        {item.parrafo}
                      </h1>
                      <h1 className="w-[85%] md:w-[70%] mx-5 lg:mx-16 text-sm">
                        {item.parrafo2}
                      </h1>
                    </div>
                    <div className="lg:block hidden self-end">
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
                    <div className="lg:hidden flex flex-row-reverse pl-5">
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
                        src={item.image}
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

          <div className="container mx-auto px-5">
            <div className="bg-white w-full h-full md:grid justify-center my-7 md:grid-cols-2 container ">
              <h2 className="text-redOmega text-2xl md:text-4xl font-bold w-full  text-center md:text-left tracking-widest my-5 md:my-16">
                {item.megatitle}
              </h2>
              <div className="flex flex-col mx-auto container">
                <div className="bg-white rounded-xl shadow-xl m-auto w-[300px] lg:w-[70%] flex flex-row static my-2 items-center mx-auto py-5 pr-3">
                  <h1 className="text-redOmega font-bold mx-5">⚫︎</h1>
                  {item.col}
                </div>
                <div className="bg-white rounded-xl shadow-xl m-auto w-[300px] lg:w-[70%] flex flex-row static my-2 items-center mx-auto py-5 pr-3">
                  <h1 className="text-redOmega font-bold mx-5">⚫︎</h1>
                  {item.col2}
                </div>
                <div className="bg-white rounded-xl shadow-xl m-auto w-[300px] lg:w-[70%] flex flex-row static my-2 items-center mx-auto py-5 pr-3">
                  <h1 className="text-redOmega font-bold mx-5">⚫︎</h1>
                  {item.col3}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default detalle
