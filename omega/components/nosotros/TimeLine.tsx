import Image from 'next/image'
import { Waypoint } from 'react-waypoint'
import { useState, useEffect } from 'react'
import photo1 from '../../assets/images/nosotros/Nosotros_Historia_1997.jpg'
import photo2 from '../../assets/images/nosotros/Nosotros_Historia_1998.jpg'
import photo3 from '../../assets/images/nosotros/Nosotros_Historia_2000.jpg'
import photo4 from '../../assets/images/nosotros/Nosotros_Historia_2004.jpg'
import photo5 from '../../assets/images/nosotros/Nosotros_Historia_2005.jpg'
import photo6 from '../../assets/images/nosotros/Nosotros_Historia_2007.jpg'
import photo7 from '../../assets/images/nosotros/Nosotros_Historia_2016.jpg'
import photo8 from '../../assets/images/nosotros/Nosotros_Historia_2017.jpg'
interface ITimeLineItem {
  id: number
  age: string
  description: string
  // eslint-disable-next-line no-undef
  image?: StaticImageData | any
}

const timeData: ITimeLineItem[] = [
  {
    id: 1,
    age: '1997',
    description:
      'Omega Seguros es constituida el 17 de septiembre en la ciudad de Villavicencio. Contó con una delegación de SURA para la expedición de la compañía',
    image: photo1
  },
  {
    id: 2,
    age: '1998',
    description:
      'El equipo de trabajo crece para brindar una mejor experiencia y disminuir el tiempo de respuesta a nuestros clientes.',
    image: photo2
  },
  {
    id: 3,
    age: '2002',
    description:
      'Se implementa un Sistema de Gestión de Calidad para mejorar el rendimiento organizacional.',
    image: photo3
  },
  {
    id: 4,
    age: '2004',
    description:
      'Incursionamos en el sector Estatal adjudicando contratos de intermediación de seguros.',
    image: photo4
  },
  {
    id: 5,
    age: '2005',
    description:
      'Asesoramos, intermediamos y acompañamos en grandes proyectos de infraestructura del Meta.',
    image: photo5
  },
  {
    id: 6,
    age: '2007',
    description:
      'Se establecen alianzas estratégicas con la apertura de más de 15 claves con compañías de seguros.',
    image: photo6
  },
  {
    id: 7,
    age: '2016',
    description:
      'Adjudicatarios del proceso de la agencia nacional de Colombia compra eficiente para la intermediación de seguros de las entidades de orden Nacional.',
    image: photo7
  },
  {
    id: 8,
    age: '2017',
    description: 'Implementación del SGSST.',
    image: photo8
  }
]
const TimeLine = () => {
  const [age, setAge] = useState(timeData[0])
  let isMobile = false
  useEffect(() => {
    isMobile = window.innerWidth < 768
  })
  return (
    <div className="container w-full mx-auto pb-16 md:pb-64 lg:pb-16">
      <h3 className="text-redOmega text-large lg:text-extraLarge uppercase tracking-[0.2em] font-bold w-10/12 lg:w-full mx-auto text-center py-10">
        Nuestra historia en el tiempo
      </h3>
      <div className="flex flex-col md:justify-center md:flex-row w-full md:w-[90%] mx-auto  mb-14 max-h-full">
        {timeData.map((item) => (
          <Waypoint
            key={item.id}
            bottomOffset={350}
            topOffset={350}
            onEnter={() => {
              console.log('aca' + item.id)
              if (isMobile) {
                setAge(item)
              }
            }}
          >
            <div className="flex flex-row justify-start relative">
              <div
                onClick={() => setAge(item)}
                className="flex flex-col relative md:flex-row items-center  justify-center w-auto md:py-10 pl-20 md:pl-0
              "
              >
                <div
                  className={`h-[30px] w-[4px] md:h-[3px] md:w-[25px] xl:w-[40px] ${
                    item.id === 1 ? 'bg-white' : 'bg-redOmega'
                  }`}
                />
                <div
                  className={`relative h-5 w-5 md:w-6 md:h-6 ${
                    age.id === item.id
                      ? 'bg-white border-4 border-redOmega'
                      : 'bg-redOmega lg:hover:bg-white hover:border-2 hover:border-redOmega transition-all '
                  } rounded-full before:absolute before:right-[140%] before:top-[-17%] md:before:top-[-30px] md:before:left-[-50%] cursor-pointer before:text-center before:content-[''] before:width-full before:height-full`}
                ></div>
                <div
                  className={`h-[30px] w-[4px] md:h-[3px] md:w-[25px] xl:w-[40px] ${
                    item.id === 8 ? 'bg-white' : 'bg-redOmega'
                  }`}
                />
                <span
                  className={`absolute left-[20%] md:top-0 text-medium ${
                    age.id === item.id ? 'text-redOmega' : 'text-greyOmega'
                  } font-bold tracking-[0.2em]`}
                >
                  {item.age}
                </span>
              </div>
              <div className="box-time-line first-right-0 md:top-[90%]">
                {age.id === item.id && (
                  <div className="relative first:md:right-[-50%] shadow-md max-w-[190px] sm:max-w-[200px] lg:w-[300px] md:max-w-full md:rounded-xl rounded-xl flex flex-col lg:flex-row justify-center items-center mx-auto">
                    <div className="relative w-[190px] sm:[200px] h-[100px] md:w-[200px] lg:w-[250px] md:h-[147px]">
                      <Image
                        src={item.image}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="md:rounded-l-xl rounded-t-xl"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-redOmega tracking-[0.2em] font-semibold">
                        {item.age}
                      </span>
                      <p className=" text-extraSmall md:w-auto">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Waypoint>
        ))}
      </div>
    </div>
  )
}

export default TimeLine
