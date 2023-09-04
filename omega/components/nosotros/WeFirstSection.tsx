import Image from 'next/image'
import howWeAre from '../../assets/images/nosotros/Nosotros.jpg'

const WeFirstSection = () => {
  return (
    <div className='w-full container flex flex-col lg:flex-row flex-wrap lg:pt-14 md:flex-nowrap justify-center items-center xl:justify-between xl:gap-x-20 mx-auto pb-10 lg:px-10'>
      <div className='max-w-full m-auto flex justify-center items-center xl:mx-0 my-10 xl:my-0 w-full'>
        <div className='mx-2 relative w-[320px] sm:w-[330px] lg:w-[351px] xl:w-[586px] h-[192px] sm:h-[214px] lg:h-[236px] xl:h-[341px] before:absolute before:top-[-5%]  before:rounded-2xl before:left-[-5%] before:w-full before:h-full before:bg-[#6B6B6B]/10'>
          <Image
            src={howWeAre}
            layout='fill'
            objectFit='cover'
            className='rounded-2xl'
          />
        </div>
      </div>
      <div className='w-[80%] md:mt-0 xl:w-[100%] flex flex-col flex-end space-y-5'>
        <h1 className='text-redOmega text-large xl:text-extraLarge tracking-[0.2em] text-center lg:text-left uppercase font-bold'>
          ¿Quienes somos?
        </h1>
        <p className='text-blackOmega text-small font-normal xl:text-[16px] text-justify leading-[22px]'>
          Somos una compañía que lleva más de dos décadas asesorando y
          acompañando a personas, y también empresas, en la intermediación de
          seguros, siendo líderes en la región.
          <br/><br/>
          En Omega Seguros nos enfocamos en asesorar de forma integral a
          nuestros clientes, brindando orientación jurídica, examinando y
          estructurando planes de prevención, administración de riesgos,
          acompañando en reclamaciones y desarrollando planes de recuperación
          ante posibles pérdidas.
          <br/><br/>
          Sabemos que no todos los contextos son iguales, es por esto que
          buscamos adaptarnos a cualquier posibilidad y cambio en el entorno con
          el fin de garantizar eficiencia y eficacia en la prestación de
          nuestros servicios, para que de esta manera el cliente se encuentre
          más seguro.
        </p>
      </div>
    </div>
  )
}

export default WeFirstSection
