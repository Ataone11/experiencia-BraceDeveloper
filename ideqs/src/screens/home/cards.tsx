/* eslint-disable no-unused-vars */
import Image from 'next/image'
import { useState } from 'react'
import Button from '../../components/buttons/primaryButton'
import { Colors } from '../../components/buttons/typesButton'
interface Params {
  title: string
  description: string
  img: any
  href: string
}

const Cards = ({ title, description, img, href }: Params) => {
  const [hovering, setHovering] = useState(false)
  const hover = () => {
    setHovering(true)
  }
  const hoverout = () => {
    setHovering(false)
  }

  const [, setPrueba] = useState(true)
  return (
    <div
      onMouseEnter={hover}
      onMouseLeave={hoverout}
      className="bg-white hover:bg-azulSecondaryDark group  text-azulPrimary900 hover:text-azulPrimary300 shadow-azulPrimary300 container rounded-xl shadow-lg border-2 border-azulPrimary700 hover:h-[345px] duration-500 ease-in-out min-w-[200px]  md:w-[216px] h-[260px] relative flex flex-col justify-center "
    >
      <div className="mx-auto  pt-3 group-hover:pt-0">
        <Image src={img} layout="fixed" className="mx-auto " alt="" />
      </div>
      <div className="flex flex-col justify-center text-center">
        <h3 className="text-textSize5  tracking-[.1em]   font-bold ">
          {title}
        </h3>
        {hovering && (
          <p className="h-0  group-hover:transition duration-150 ease-in-out text-textSize7 font-normal  text-center mx-auto w-[80%] my-2 ">
            {description}
          </p>
        )}

        <Button
          link={href}
          color={Colors.blue_primary}
          label={'ver ->'}
          action={() => setPrueba(false)}
          className={
            'text-center w-[86px] h-[40px] mx-auto group-hover:translate-y-[3.5rem] group-hover:transition group-hover:duration-500 group-hover:ease-in-out duration-500 ease-in-out'
          }
          classNameText={'text-textSize7 mx-auto '}
          type={'button'}
        />
      </div>
    </div>
  )
}

export default Cards
