import Image from 'next/image'

const Carousel = ({ team }: any) => {
  return (
    <div className="container w-full m-auto pt-20 space-y-10">
      <h3 className="text-redOmega tracking-[0.2em] font-bold text-large lg:text-extraLarge text-center uppercase">
        Conoce al equipo
      </h3>
      <div className="relative w-fit mx-auto max-w-full justify-start flex gap-10 snap-x overflow-x-auto pb-14">
        {team.map((worker: any) => (
          <div
            key={worker.id}
            className="snap-center shadow-md rounded-md shrink-0 overflow-x-auto first:ml-8 last:mr-8"
          >
            <div className="relative w-[155px] h-[156px] ">
              <Image
                layout="fill"
                src={`${worker.attributes.foto.data.attributes.formats.small.url ?? worker.attributes.foto.data.attributes.url}`}
                objectPosition="center"
                objectFit="cover"
                priority={true}
              />
            </div>
            <div className="flex flex-col justify-center items-center py-2">
              <span className="text-redOmega font-semibold text-small">
                {worker.attributes.nombre}
              </span>
              <span className="text-blackOmega text-small">
                {worker.attributes.rol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
