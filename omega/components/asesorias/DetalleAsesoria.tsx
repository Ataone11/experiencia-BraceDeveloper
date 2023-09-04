import Image from 'next/image'
import Asesoria from '../../assets/images/asesorias/Asesorias1.png'
import Asesoria2 from '../../assets/images/asesorias/Asesorias_Asesoria_2.jpg'
import Asesoria3 from '../../assets/images/asesorias/Asesorias_Asesoria_3.jpg'
import Asesoria4 from '../../assets/images/asesorias/Asesorias_Asesoria_4.jpg'
import { useState } from 'react'
import 'react-multi-carousel/lib/styles.css'
import ScrollContainer from 'react-indiana-drag-scroll'

interface Props {
  title?: string
  description?: string
  image?: any | string
  id: number
}

const dataSecure: Props[] = [
  {
    id: 1,
    title: 'Programas de seguros',
    description:
      'Te enseñamos todos los servicios que ofrecemos de la mano de nuestros aliados para que escojas cual se ajusta mas a tus necesidades y nos permitas ayudarte a suplirlas.',
    image: Asesoria
  },
  {
    id: 2,
    title: 'Reclamación de siniestros',
    description:
      'Te acompañamos en todo el proceso de tus reclamaciones y cumplimiento de tu seguro en el escenario de un siniestro automotriz',
    image: Asesoria2
  },
  {
    id: 3,
    title: 'Contrataciones juridícas',
    description:
      'Presentamos, tramitamos y llevamos hasta su terminación las reclamaciones que se requieren ante las compañías aseguradoras, asesorando a nuestros clientes en caso de litigios o oonflictos por responsabilidad civil, derivados del programa de seguros.',
    image: Asesoria3
  },
  {
    id: 4,
    title: 'Análisis de administración de riesgos',
    description:
      'Nos enfocamos en asesorar de forma integral a nuestros clientes brindando orientación jurídica, examinando y estructurando planes de seguros para la administración de riesgos.',
    image: Asesoria4
  }
]

const Detalle = () => {
  const [servicios, setServicios] = useState(dataSecure[0])
  return (
    <>
      <ScrollContainer className="flex md:hidden" vertical>
          <button
                onClick={() => setServicios(dataSecure[0])}
                className={`${
                  servicios.id === 1
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
            border-2 border-greyOmega text-greyOmega  py-2 whitespace-nowrap px-3 mx-4 h-[45px] snap-center w-fit`}
              >
                <h1 className="">Programas de seguros</h1>
              </button>
              <button
                onClick={() => setServicios(dataSecure[1])}
                className={`${
                  servicios.id === 2
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
          border-2 border-greyOmega text-greyOmega  py-2 whitespace-nowrap px-3 mx-4 h-[45px] w-fit`}
              >
                Reclamación de siniestros
              </button>
              <button
                onClick={() => setServicios(dataSecure[2])}
                className={`${
                  servicios.id === 3
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
          border-2 border-greyOmega text-greyOmega  py-2 whitespace-nowrap px-3 mx-4 h-[45px] w-fit`}
              >
                Contrataciones juridicas
              </button>
              <button
                onClick={() => setServicios(dataSecure[3])}
                className={`${
                  servicios.id === 4
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
            border-2 border-greyOmega text-greyOmega  py-2 whitespace-nowrap px-3 mx-4 h-[45px] w-fit`}
              >
                Análisis de administración de riesgos
              </button>
      </ScrollContainer>
      <div className="container mx-auto gap-3 space-y-4 md:py-3 lg:py-10 px-5 w-full">
        <div className="flx justify-center">
          <div className="text-center pt-5 lg:flex lg:justify-center lg:w-full mx-auto hidden md:flex flex-wrap justify-center text-base md:pl-10 pl-0 lg:pl-0">
            <div className="md:pl-8 lg:pl-0 pl-0">
              <button
                onClick={() => setServicios(dataSecure[0])}
                className={`${
                  servicios.id === 1
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
            border-2 border-greyOmega text-greyOmega  py-2 xl:mx-5 mx-2 w-[240px] h-[45px] my-1`}
              >
                <h1 className="">Programas de seguros</h1>
              </button>
            </div>
            <div>
              <button
                onClick={() => setServicios(dataSecure[1])}
                className={`${
                  servicios.id === 2
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
          border-2 border-greyOmega text-greyOmega  py-2  xl:mx-5 mx-2 w-[260px] h-[45px] my-1`}
              >
                Reclamación de siniestros
              </button>
            </div>
            <div>
              <button
                onClick={() => setServicios(dataSecure[2])}
                className={`${
                  servicios.id === 3
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
          border-2 border-greyOmega text-greyOmega  py-2  xl:mx-5 mx-2 w-[240px] h-[45px] my-1`}
              >
                Contrataciones juridicas
              </button>
            </div>
            <div className="lg:pr-0 pr-0">
              <button
                onClick={() => setServicios(dataSecure[3])}
                className={`${
                  servicios.id === 4
                    ? ' bg-redOmega border-redOmega text-white'
                    : 'bg-white'
                }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega font-semibold
              border-2 border-greyOmega text-greyOmega py-2 mx-2 w-[310px] lg:w-[280px] xl:w-[380px] h-[45px] my-1`}
              >
                Análisis de administración de riesgos
              </button>
            </div>
          </div>
        </div>

        {dataSecure.map((item: any) => (
          <div key={item.id} className="w-full">
            <div
              className={`${
                servicios.id === item.id ? 'transition-opacity2' : 'hidden '
              } grid grid-cols-1  md:grid-cols-2 gap-x-6 gap-y-8 lg:gap-y-32 rounded-xl container mx-auto md:mx-0 lg:mx-auto w-[99%] xl:w-[80%] md:w-[150%] relative`}
            >
              <div className="relative block md:hidden lg:block">
                <div className="flex justify-center lg:pt-8 h-[50%] after:bg-gray-100 after:content-[''] after:absolute after:w-[90%] after:h-[90%] after:rounded-3xl after:top-14 image-shadow after:self-end after:-left-3">
                  <Image
                    src={item.image}
                    width={535}
                    height={328}
                    className="rounded-3xl  w-[80%] h-[50%] relative z-10"
                    alt=""
                    layout="fixed"
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                </div>
              </div>
              <div className="relative hidden md:block lg:hidden my-10 md:my-0 lg:my-10">
                <div className="flex justify-center xl:pt-8 h-[50%] after:bg-gray-100 after:content-[''] after:absolute after:w-[90%] after:h-[80%] after:rounded-3xl after:top-8 image-shadow after:self-end after:-right-2 ">
                  <Image
                    src={item.image}
                    width={535}
                    height={188}
                    className="rounded-3xl  w-[80%] h-[50%] relative z-10"
                    alt=""
                    layout="fixed"
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:pt-20 pt-0">
                <div className="text-right w-full flex justify-center  md:justify-end">
                  <h2 className="text-redOmega text-2xl md:text-xl xl:text-3xl 2xl:text-4xl font-bold w-full lg:w-[80%] text-center md:w-[70%] md:text-right lg:text-right  tracking-widest font-myriad">
                    ¿PARA QUÉ SIRVE ESTA ASESORÍA?
                  </h2>
                </div>
                <div className="flex justify-center md:justify-end my-5 md:my-0 lg:my-5">
                  <h2 className="text-black text-sm font-semibold w-[90%] md:w-full lg:w-[90%] text-left md:text-right font-myriad">
                    {item.description}
                  </h2>
                </div>
                <div className="flex justify-center md:justify-end my-0 md:my-5 lg:my-0">
                  <a href="#final">
                    <button className="btn-primary mt-2 w-auto align-middle text-center font-myriad">
                      Pide tu cita
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Detalle
