import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import aseguradora1 from '../../assets/images/home/Inicio_Aseguradora_1.png'
import aseguradora2 from '../../assets/images/home/Inicio_Aseguradora_2.png'
import aseguradora3 from '../../assets/images/home/Inicio_Aseguradora_3.png'
import aseguradora4 from '../../assets/images/home/Inicio_Aseguradora_4.png'
import aseguradora5 from '../../assets/images/home/Inicio_Aseguradora_5.png'
import aseguradora6 from '../../assets/images/home/Inicio_Aseguradora_6.png'
import aseguradora7 from '../../assets/images/home/Inicio_Aseguradora_7.png'
import aseguradora8 from '../../assets/images/home/Inicio_Aseguradora_8.png'
import aseguradora9 from '../../assets/images/home/Inicio_Aseguradora_9.png'
import aseguradora10 from '../../assets/images/home/Inicio_Aseguradora_10.png'
import aseguradora11 from '../../assets/images/home/Inicio_Aseguradora_11.png'
import CardCarouselHome from './CardCarouselHome'

interface IData {
  id: number
  title: string
  description: string
  // eslint-disable-next-line no-undef
  icon: any | StaticImageData
}

const dataInsures: IData[] = [
  {
    id: 1,
    title: 'Seguros Confianza',
    description:
      'Respaldo ante cualquier eventualidad para tu empresa y colaboradores',
    icon: aseguradora1,
  },
  {
    id: 2,
    title: 'Aseguradora Solidaria',
    description: 'Protegemos tu patrimonio',
    icon: aseguradora2,
  },
  {
    id: 3,
    title: 'Continental',
    description:
      'Contamos con un amplio portafolio de servicios  de asistencias a nivel mundial',
    icon: aseguradora3,
  },
  {
    id: 4,
    title: 'Sura',
    description: 'Lo que tu familia y empresa necesitan ',
    icon: aseguradora4,
  },
  {
    id: 5,
    title: 'Previsora Seguros',
    description: 'Acompañamiento en todo el camino es lo que tu auto necesita',
    icon: aseguradora5,
  },
  {
    id: 6,
    title: 'Nacional Seguros',
    description:
      'Especializados en soluciones para ramos de Cumplimiento y Responsabilidad Civil',
    icon: aseguradora6,
  },
  {
    id: 7,
    title: 'Previsora Seguros',
    description:
      'Más de 50 productos en seguros generales, seguros de vida y riesgos laborales',
    icon: aseguradora7,
  },
  {
    id: 8,
    title: 'Previsora Seguros',
    description:
      'Más de 50 productos en seguros generales, seguros de vida y riesgos laborales',
    icon: aseguradora8,
  },
  {
    id: 9,
    title: 'Previsora Seguros',
    description:
      'Más de 50 productos en seguros generales, seguros de vida y riesgos laborales',
    icon: aseguradora9,
  },
  {
    id: 10,
    title: 'Previsora Seguros',
    description:
      'Más de 50 productos en seguros generales, seguros de vida y riesgos laborales',
    icon: aseguradora10,
  },
  {
    id: 11,
    title: 'Previsora Seguros',
    description:
      'Más de 50 productos en seguros generales, seguros de vida y riesgos laborales',
    icon: aseguradora11,
  },
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 300 },
    items: 1,
  },
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

const CarouselHome = () => {
  return (
    <Carousel
      containerClass="w-full mx-auto py-10 md:px-10"
      infinite={true}
      customLeftArrow={customLeftArrow}
      customRightArrow={customRightArrow}
      responsive={responsive}
      itemClass="mx-1"
      // centerMode={true}
    >
      {dataInsures.map((item: IData) => (
        <CardCarouselHome key={item.id} item={item} />
      ))}
    </Carousel>
  )
}

export default CarouselHome
