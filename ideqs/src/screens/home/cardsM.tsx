/* eslint-disable no-unused-vars */
import Link from 'next/dist/client/link'
import Image from 'next/image'
import { useState } from 'react'
interface Params {
  title: string
  description: string
  img: any
  href: string
}

const CardsM = ({ title, img, href }: Params) => {
  const [, setHovering] = useState(false)
  const hover = (e: any) => {
    e.preventDefault()
    setHovering(true)
  }
  const hoverout = (e: any) => {
    e.preventDefault()
    setHovering(false)
  }
  return (
    <Link href={href} shallow>
      <div
        onMouseEnter={hover}
        onMouseLeave={hoverout}
        className="bg-white  text-azulPrimary900  shadow-azulPrimary300 container rounded-xl shadow-lg border-2 border-azulPrimary700 mx-auto  w-[290px] h-[60px] relative flex justify-start "
      >
        <div className="m-3  ">
          <Image
            src={img}
            layout="fixed"
            height={40}
            width={47}
            className="mx-auto "
            alt=""
          />
        </div>
        <div className="flex justify-center text-center">
          <h3 className="text-textSize6 my-auto tracking-[.1em]   font-semibold ">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default CardsM
