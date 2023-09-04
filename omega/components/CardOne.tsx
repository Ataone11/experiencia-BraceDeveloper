import Image from 'next/image'

const CardOne = ({ image, titleOne, description }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-xl m-auto w-[300px]  md:h-[350px] sm:w-[400px] md:w-full lg:w-[80%]  relative md:flex md:flex-row-reverse">
      <div className="relative w-full h-[180px] md:h-[350px] ">
        <Image
          src={image}
          alt=""
          layout="fill"
          className="rounded-t-lg md:rounded-r-xl"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <div className="py-5 px-3 rounded-b-xl md:rounded-r-xl">
        <h3 className="text-redOmega text-large md:text-4xl tracking-widest font-bold md:mx-8  md:w-[77%]">
          {titleOne}
        </h3>
        <p className="text-sm md:m-8  md:w-[77%]">{description}</p>
      </div>
    </div>
  )
}

export default CardOne
