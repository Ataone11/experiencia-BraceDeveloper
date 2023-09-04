import Image from "next/image"
import Link from "next/link"

const CardHome = ({ image, titleOne, description, button, href }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-xl m-auto w-[85%]  md:h-[350px] sm:w-[400px] md:w-[70%]  relative md:flex md:flex-col">
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
      <div className="py-5 px-3 rounded-b-xl md:rounded-r-xl flex flex-col">
        <h3 className="text-redOmega text-large tracking-[.2em] font-bold md:mx-8">
          {titleOne}
        </h3>
        <p className="text-sm mt-2 md:mx-8 md:my-4 font-normal lg:text-[16px]">{description}</p>
        <Link href={href}>
          <button className="btn-primary self-center text-center mt-6 md:mx-8 md:mt-4 px-12 m-0">
            {button}
          </button>
          </Link>
      </div>
    </div>
  )
}

export default CardHome
