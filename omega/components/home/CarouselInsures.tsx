import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
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
  url: string
}

const dataInsures: IData[] = [
  {
    id: 1,
    title: 'Seguros Confianza',
    description:
      'Respaldo ante cualquier eventualidad para tu empresa y colaboradores',
    icon: aseguradora1,
    url: 'https://www.confianza.com.co'
  },
  {
    id: 2,
    title: 'Aseguradora Solidaria',
    description: 'Protegemos tu patrimonio',
    icon: aseguradora2,
    url: 'https://aseguradorasolidaria.com.co'
  },
  {
    id: 3,
    title: 'Continental',
    description:
      'Contamos con un amplio portafolio de servicios  de asistencias a nivel mundial',
    icon: aseguradora3,
    url: 'https://continentalassist.com'
  },
  {
    id: 4,
    title: 'Sura',
    description: 'Lo que tu familia y empresa necesitan ',
    icon: aseguradora4,
    url: 'https://www.suraenlinea.com'
  },
  {
    id: 5,
    title: 'Previsora Seguros',
    description: 'Acompañamiento en todo el camino es lo que tu auto necesita',
    icon: aseguradora5,
    url: 'https://www.previsora.gov.co'
  },
  {
    id: 6,
    title: 'Nacional Seguros',
    description:
      'Especializados en soluciones para ramos de Cumplimiento y Responsabilidad Civil',
    icon: aseguradora6,
    url: 'https://nacionaldeseguros.com.co'
  },
  {
    id: 7,
    title: 'Previsora Seguros',
    description:
      'Más de 50 productos en seguros generales, seguros de vida y riesgos laborales',
    icon: aseguradora7,
    url: 'https://www.laequidadseguros.coop'
  },
  {
    id: 8,
    title: 'Previsora Seguros',
    description:
      'Seguros de Cumplimiento, Automóviles, Responsabilidad Civil, SOAT, Daños Materiales',
    icon: aseguradora8,
    url: 'https://www.segurosdelestado.com'
  },
  {
    id: 9,
    title: 'Previsora Seguros',
    description:
      'Con productos especializados para tu empresa',
    icon: aseguradora9,
    url: 'https://www.sbseguros.co/'
  },
  {
    id: 10,
    title: 'Previsora Seguros',
    description:
      'Respaldo a patrimonio y productos ',
    icon: aseguradora10,
    url: 'https://www.segurosmundial.com.co/'
  },
  {
    id: 11,
    title: 'Previsora Seguros',
    description:
      'Bienestar, salud y prevención a tu disposición.',
    icon: aseguradora11,
    url: 'https://www.axacolpatria.co/portal/'
  }
]

const CarouselInsures = () => {
  const slideLeft = () => {
    const slider: any = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 310
  }

  const slideRight = () => {
    const slider: any = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 310
  }

  return (
    <div className="max-w-[1550px] mx-auto w-full py-5">
      <div className="flex flex-col justify-center space-y-5 items-center w-11/12 mx-auto md:w-full">
        <h2 className="text-redOmega uppercase font-bold text-large lg:text-extraLarge text-center tracking-[0.2em]">
          Nuestras aseguradoras aliadas
        </h2>
        <p className="text-blackOmega text-sm text-center md:text-medium leading-[22px]">
          Seleccione el portal de pagos correspondiente a la aseguradora en la
          que adquirió su póliza
        </p>
      </div>

      <div className="w-[90%] h-full mx-auto relative flex items-center  justify-center py-10">
        <MdChevronLeft
          size={40}
          className="bg-redOmega hidden lg:block z-10 rounded-full absolute left-[-3%] hover:bg-redOmega2 text-white transition-colors cursor-pointer hover:scale-105 shadow-md"
          onClick={slideLeft}
        />
        <div
          className="w-full h-[400px] items-center snap-x gap-6 lg:gap-20 flex overflow-x-auto scroll-smooth lg:overflow-x-hidden"
          id="slider"
        >
          {dataInsures.map((item: IData) => (
            <CardCarouselHome key={item.id} item={item} />
          ))}
        </div>
        <MdChevronRight
          size={40}
          className="bg-redOmega hidden lg:block rounded-full absolute right-[-3%] hover:bg-redOmega2 text-white transition-colors cursor-pointer hover:scale-105 shadow-md"
          onClick={slideRight}
        />
      </div>
    </div>
  )
}

export default CarouselInsures
