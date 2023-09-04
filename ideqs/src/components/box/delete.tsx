import Image from 'next/image'
import { useState } from 'react'
import checkk from '../../assets/administrador/usuarios/manejador/delete.svg'
import checka from '../../assets/administrador/usuarios/manejador/deleter.svg'

interface Params {
  button?: boolean
  classname?: string | null
  action: () => void
}

const Delete = ({ classname = 'w-[199px] h-[287px]', action }: Params) => {
  const hover = () => {
    setFlag(false)
  }
  const hoverout = () => {
    setFlag(true)
  }
  const [flag, setFlag] = useState(true)

  return (
    <div
      onMouseEnter={hover}
      onMouseLeave={hoverout}
      onClick={action}
      className={`bg-white  text-azulPrimary700  container rounded-md shadow-lg border-2 my-2  border-azulPrimary700   relative flex  justify-center ${classname} `}
    >
      {flag && <Image src={checkk} className="mx-auto" alt="" />}
      {flag === false && <Image src={checka} className="mx-auto" alt="" />}
    </div>
  )
}

export default Delete
