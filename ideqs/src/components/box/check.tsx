import Image from 'next/image'
import checkk from '../../assets/administrador/usuarios/manejador/check.svg'
import checka from '../../assets/administrador/usuarios/manejador/checka.svg'

interface Params {
  button: boolean
  classname?: string | null
  action?: () => void
}

const Check = ({
  button,
  classname = 'w-[199px] h-[287px]',
  action
}: Params) => {
  return (
    <div
      onClick={action}
      className={`bg-white  text-azulPrimary700  container rounded-md shadow-lg border-2 my-2  border-azulPrimary700   relative flex  justify-center ${classname} `}
    >
      {button && <Image src={checka} className="mx-auto" alt="" />}
      {button === false && <Image src={checkk} className="mx-auto" alt="" />}
    </div>
  )
}

export default Check
