import Image from 'next/image'
import Asesoria from '../../assets/images/asesorias/Asesorias1.png'
import Asesoria2 from '../../assets/images/asesorias/Asesorias_Asesoria_2.jpg'
import Asesoria3 from '../../assets/images/asesorias/Asesorias_Asesoria_3.jpg'
import Asesoria4 from '../../assets/images/asesorias/Asesorias_Asesoria_4.jpg'
import { useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

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
    title: 'Análisis de administracion de riesgos',
    description:
      'Nos enfocamos en asesorar de forma integral a nuestros clientes brindando orientación jurídica, examinando y estructurando planes de seguros para la administración de riesgos.',
    image: Asesoria4
  }
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 640, min: 300 },
    items: 1
  }
}

const customLeftArrow = (
  <div className="absolute arrow-btn left-0 text-center p-4 cursor-pointer bg-redOmega rounded-full">
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
)

const customRightArrow = (
  <div className="absolute arrow-btn right-0 text-center p-4 cursor-pointer bg-redOmega rounded-full">
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
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  </div>
)

const DetalleM = () => {
  const [servicios, setServicios] = useState(dataSecure[0])
  return (
    <div className="container mx-auto gap-3 space-y-4 py-10 px-5 w-[60%]">
      <div className="felx justify-center">
        <div className="md:hidden block">
          <Carousel
            containerClass="w-full  mx-auto py-2 md:py-10 md:px-2"
            customLeftArrow={customLeftArrow}
            customRightArrow={customRightArrow}
            responsive={responsive}
            itemClass="mx-1"
            className="md:hidden"
            // centerMode={true}
          >
            {dataSecure.map((item: any) => (
              <div key={item.id}>
                <button
                  onClick={() => setServicios(dataSecure[item])}
                  className={`${
                    servicios.id === item
                      ? ' bg-redOmega border-redOmega text-white'
                      : 'bg-white'
                  }  rounded-full md:rounded-full hover:bg-redOmega hover:text-white hover:border-redOmega
         border-2 border-greyOmega text-greyOmega  py-2 mx-20 w-[240px] h-[45px] snap-center font-semibold`}
                >
                  {item.title}
                </button>
                <div className="grid grid-cols-1  md:grid-cols-2 gap-x-14 gap-y-8 lg:gap-y-32 rounded-xl container mx-auto md:mx-0 lg:mx-auto w-[99%] lg:w-[80%] md:w-[90%] relative`">
                  <div className="relative block md:hidden lg:block">
                    <div className="flex justify-center lg:pt-8 h-[50%] after:bg-gray-100 after:content-[''] after:absolute after:w-[90%] after:h-full after:rounded-3xl after:top-16 image-shadow after:self-end after:-right-10">
                      <Image
                        src={item.image}
                        width={535}
                        height={328}
                        className="rounded-3xl  w-[80%] h-[50%] relative"
                        alt=""
                        layout="fixed"
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:pt-20 pt-0">
                    <div className="text-right w-full flex justify-center  md:justify-end">
                      <h2 className="text-redOmega text-2xl md:text-xl xl:text-3xl 2xl:text-4xl font-bold w-full lg:w-[80%] text-center lg:text-right  tracking-widest font-myriad">
                        ¿PARA QUÉ SIRVE ESTA ASESORÍA?
                      </h2>
                    </div>
                    <div className="flex justify-center md:justify-end my-5">
                      <h2 className="text-black text-sm font-semibold w-[90%] text-left md:text-right font-myriad">
                        {item.description}
                      </h2>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <button className="btn-primary mt-2 w-auto align-middle text-center font-myriad">
                        Pide tu cita
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default DetalleM
