import seguro1 from '../../assets/images/seguros/Seguros_Personas_Vida.jpg'
import seguro2 from '../../assets/images/seguros/Seguros_Personas_Hogar.jpg'
import seguro3 from '../../assets/images/seguros/Seguros_Personas_Automoviles.jpg'
import Link from 'next/link'
import Image from 'next/image'

const Personas = () => {
  const ImageShadow = ({ img }: any) => (
    <div>
      <div className="min-w-[250px] w-full relative flex lg:hidden lg:pt-8 h-[100%] mx-auto after:bg-gray-200 after:content-[''] after:absolute after:w-[80%] after:h-full after:rounded-2xl after:top-3 image-shadow after:self-end after:right-0">
        <Image
          src={img}
          width={335}
          height={128}
          className="rounded-2xl relative z-10  w-[95%] h-full shadow mr-auto"
          alt=""
          layout="fixed"
          objectFit="cover"
          objectPosition="90% 50%"
        />
      </div>

      <div className="min-w-[250px] w-[360px] relative  hidden lg:block lg:pt-8 h-[80%] mx-auto after:bg-gray-200 after:content-[''] after:absolute after:w-[90%] after:h-full after:rounded-3xl after:top-16 image-shadow after:self-end after:right-0">
        <Image
          src={img}
          width={335}
          height={228}
          className="rounded-3xl z-10 w-[80%] h-[50%] relative"
          alt=""
          layout="fixed"
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </div>
    </div>
  )
  return (
    <div className="bg-white h-full w-full container mx-auto px-5">
      <div className="lg:flex lg:justify-between my-5  md:grid md:grid-cols-2">
        <br className="block md:hidden" />
        <div className="container mx-auto flex flex-col">
          <ImageShadow img={seguro1} />
          <h1 className="text-2xl text-greyOmega my-10 font-myriad font-bold tracking-[4px] text-center hidden lg:block lg:my-6">
            SEGUROS DE VIDA
          </h1>
          <div className="lg:justify-center flex my-8 lg:my-0 items-center justify-between">
            <h1 className="text-xl text-greyOmega  font-myriad font-bold tracking-widest text-left block lg:hidden">
              SEGUROS DE VIDA
            </h1>
            <Link href="/seguros/seguro_vida">
              <button className="btn-primary  lg:w-auto lg:h-auto align-middle text-center h-[60%] w-[20%]  md:w-[40%] min-w-[100px] ml-1">
                Ver más
              </button>
            </Link>
          </div>
        </div>
        <br className="block md:hidden" />
        <div className="container mx-auto flex flex-col">
          <ImageShadow img={seguro2} />
          <h1 className="text-2xl text-greyOmega my-10 font-myriad font-bold tracking-[2px] text-center hidden lg:block lg:my-6">
            SEGUROS PARA HOGAR
          </h1>
          <div className="lg:flex lg:justify-center flex my-8 lg:my-0 items-center justify-between">
            <h1 className="text-xl text-greyOmega  font-myriad font-bold tracking-widest text-left block lg:hidden  md:pl-4 ">
              SEGUROS PARA HOGAR
            </h1>
            <Link href="/seguros/seguro_hogar">
              <button className="btn-primary  lg:w-auto lg:h-auto align-middle text-center h-[60%] w-[20%]  md:w-[40%]  min-w-[100px] ml-1">
                Ver más
              </button>
            </Link>
          </div>
        </div>
        <br className="block md:hidden" />
        <div className="container mx-auto flex flex-col">
          <ImageShadow img={seguro3} />
          <h1 className="text-2xl text-greyOmega my-10 font-myriad font-bold tracking-[2px] text-center hidden lg:block lg:my-6">
            SEGUROS PARA AUTOMÓVILES
          </h1>
          <div className="lg:flex lg:justify-center flex my-8 lg:my-0 items-center justify-between">
            <h1 className="text-xl text-greyOmega  font-myriad font-bold tracking-widest text-left block lg:hidden w-[60%]">
              SEGUROS PARA AUTOMÓVILES
            </h1>
            <Link href="/seguros/seguro_automoviles">
              <button className="btn-primary  lg:w-auto lg:h-auto align-middle text-center h-[60%] w-[20%]  md:w-[40%] min-w-[100px] ml-1">
                Ver más
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Personas
