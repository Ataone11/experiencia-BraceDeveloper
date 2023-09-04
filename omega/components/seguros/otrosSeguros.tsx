import Image from 'next/image'

const Otros = ({ image, titleOne, description, negrilla }: any) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl m-auto h-[410px] sm:h-[400px] w-[310px] sm:w-[350px] my-5 ">
      <div className="relative w-full h-[160px] ">
        <Image
          src={image}
          alt=""
          layout="fill"
          className="rounded-t-2xl"
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </div>
      <div className="mx-5">
        <div className="py-5 px-3 rounded-b-xl">
          <h3 className="text-redOmega text-large tracking-widest font-bold   ">
            {titleOne}
          </h3>

          <div className="my-3">
            <span className="text-sm font-bold">{negrilla + ' '}</span>
            <span className="text-sm ">{description}</span>
          </div>
          <br className="md:hidden" />
        </div>
      </div>
    </div>
  )
}
export default Otros
