import CarouselHome from './CarouselHome'

const Insures = () => {
  return (
    <section className="max-w-[1550px] mx-auto w-full py-10">
      <div className="flex flex-col justify-center space-y-5 items-center w-11/12 mx-auto md:w-full">
        <h2 className="text-redOmega uppercase font-semibold text-large md:text-extraLarge text-center tracking-[0.2em]">
          Nuestras aseguradoras aliadas
        </h2>
        <p className="text-blackOmega text-sm text-center md:text-medium leading-[22px]">
          Seleccione el portal de pagos correspondiente a la aseguradora en la
          que adquirió su póliza
        </p>
      </div>
      <div className="max-w-[1300px] mx-auto py-10">
        <CarouselHome />
      </div>
    </section>
  )
}

export default Insures
