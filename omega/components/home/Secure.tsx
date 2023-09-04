import Image from 'next/image'
import { useState } from 'react'
import iconBills from '../../assets/icons/bills.svg'
import iconVida from '../../assets/icons/vida.svg'
import iconHouse from '../../assets/icons/hogar.svg'
import iconPymes from '../../assets/icons/pymes.svg'
import iconCar from '../../assets/icons/car.svg'
import iconPlus from '../../assets/icons/plus.svg'

import imageLife from '../../assets/images/home/Inicio_Seguros_Vida.jpg'
import imageHome from '../../assets/images/home/Inicio_Seguros_Hogar.jpg'
import imagePymes from '../../assets/images/home/Inicio_Seguros_PYMES.jpg'
import imageCar from '../../assets/images/home/Inicio_Seguros_Automoviles.jpg'
import imageBills from '../../assets/images/home/Inicio_Seguros_Estatales.jpg'
import imageOthers from '../../assets/images/home/Inicio_Seguros_Otros.jpg'
import Link from 'next/link'

interface Props {
  title?: string
  description?: string[]
  // eslint-disable-next-line no-undef
  image?: StaticImageData | string;
  // eslint-disable-next-line no-undef
  icon: StaticImageData | string;
  id: number;
  excerpt: string;
  route?: string;
}

const dataSecure: Props[] = [
  {
    id: 1,
    title: 'Seguro de vida',
    description: [
      'Protege aquello que más te importa.',
      'Asegura el bienestar y el futuro de tu familia, y atrévete a vivir plenamente.',
    ],
    image: imageLife,
    icon: iconVida,
    excerpt: "Vida",
    route: '/seguros/seguro_vida'
  },
  {
    id: 2,
    title: 'Seguro Para hogar',
    description: [
      'Sabemos el valor de tu esfuerzo.',
      'Te ayudamos a cuidar el hogar que has construido y todos los elementos que hacen parte de él',
    ],
    image: imageHome,
    icon: iconHouse,
    excerpt: "Hogar",
    route: '/seguros/seguro_hogar'
  },
  {
    id: 3,
    title: 'Seguro para pymes',
    description: [
      'Queremos verte crecer.',
      'Protegemos tu empresa, negocio y tus empleados. Encuentra con nosotros la opción que más se ajusta a tus necesidades.',
    ],
    image: imagePymes,
    icon: iconPymes,
    excerpt: "PYMES",
    route: '/seguros/seguro_pymes'
  },
  {
    id: 4,
    title: 'Seguro estatales',
    description: [
      'Obtén un seguro de cumplimiento a favor de las entidades estatales.',
      'Dirigidos a escenarios donde intervienen insituciones estatales.',
    ],
    image: imageBills,
    icon: iconBills,
    excerpt: "Estatales",
    route: '/seguros/estatales'
  },
  {
    id: 5,
    title: 'Seguro para automóviles',
    description: [
      'Que nada te detenga en el camino.',
      'Te ayudamos a que te aventures en cualquier travesia sin ningún limite.',
    ],
    image: imageCar,
    icon: iconCar,
    excerpt: "Automóviles",
    route: '/seguros/seguro_automoviles'
  },
  {
    id: 6,
    title: 'Otros seguros',
    description: [
      '¿No has encontrado lo que buscas?',
      'Encuentra aquí los otros servicios que tenemos para ofrecerte',
    ],
    image: imageOthers,
    icon: iconPlus,
    excerpt: "Otros",
    route: '/seguros?tipo=2'
  },
]

const Secure = () => {
  const [servicios, setServicios] = useState(dataSecure[0])

  return (
    <div className='container mx-auto  space-y-8 py-5 px-5 '>
      <h3 className='text-redOmega tracking-[0.2em] font-bold text-[20px] md:text-large lg:text-extraLarge text-center uppercase'>
        Conoce nuestros programas o seguros
      </h3>
      <div className='flex md:flex-col w-full justify-center items-center md:gap-y-10 gap-3'>
        <div className='flex flex-col md:flex-row gap-5 lg:gap-x-10 '>
          {dataSecure.map((item: any) => (
            <div
              key={item.id}
              className='flex flex-col justify-center items-center h-auto md:w-[100px] md:mb-10 md:mx-auto'>
              <div
                className={`${
                  servicios.id === item.id
                    ? ' ring-offset-2 ring ring-redOmega3 bg-redOmega hover:shadow-redOmega2'
                    : 'bg-greyOmega hover:shadow-redOmega2 hover:bg-redOmega'
                }  p-5 md:p-7  flex justify-center items-center  rounded-full w-7 h-7 md:w-14 md:h-14  cursor-pointer relative  hover:shadow-md transition-all`}
                onClick={() => setServicios(item)}>
                <div
                  className='relative  w-6 md:w-10 h-6 md:h-10 p-3 rounded-xl'>
                  <Image
                    className='p-2 rounded-xl'
                    layout='fill'
                    src={item.icon}
                    alt=''
                  />
                </div>
                <span
                  className='absolute bottom-[-65%] hidden md:flex justify-center items-center  text-redOmega font-semibold'
                  onClick={() => setServicios(item)}>
                  {servicios.id === item.id && item.excerpt}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full mx-auto flex justify-center md:mx-0 md:'>
        {
          servicios && <div
            key={`sm-${servicios.id}`}
            className='w-10/12 mx-auto flex flex-col md:flex-row justify-between gap-x-10 '>
            <div className='relative mx-auto md:mx-0 md:w-[470px] w-[220px] h-[130px] md:h-[285px] shadow-xl  before:absolute before: before:top-[10%] md:before:top-[-5%]  before:w-[80%] before:rounded-xl md:before:rounded-3xl rounded-xl md:rounded-3xl before:left-[-5%] md:before:left-[-5%] before: md:before:w-[80%] before:h-full before:bg-[#6B6B6B]/10'>
              <Image
                src={servicios.image || imageOthers}
                alt=''
                layout='fill'
                objectFit='cover'
                objectPosition={`center`}
                className='rounded-xl md:rounded-3xl '
              />
            </div>
            <div className='mt-10 max-w-[250px] md:max-w-full flex flex-col md:items-end  mx-auto'>
              <h3 className='text-redOmega text-medium md:text-large font-bold tracking-[0.2em] mb-4  md:max-w-lg md:text-right'>
                {servicios?.title?.toUpperCase()}
              </h3>
              <p className='text-blackOmega text-small font-semibold leading-5 md:text-normal  md:max-w-lg  md:text-right pb-8'>
                {servicios.description && servicios.description[0]} {''}
                <span className='font-normal'>{servicios.description && servicios.description[1]}</span>
              </p>
              <Link href={servicios.route??""}>
                <button className='btn-primary w-[140px] md:w-auto'>
                  Pide tu seguro
                </button>
              </Link>
            </div>
          </div>
        }
        </div>
      </div>
    </div>
  )
}

export default Secure
