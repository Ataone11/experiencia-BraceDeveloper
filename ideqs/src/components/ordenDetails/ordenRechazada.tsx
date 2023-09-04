import Image from 'next/image'
import anulada from '../../assets/administrador/orders/Orechazada.svg'

const OrdenRechazada = () => {
  return (
    <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[288px] md:w-[804px] my-10">
      <div className="h-[68px] bg-azulSecondary100 items-center flex ">
        <div className="mx-5 flex justify-start items-center gap-5">
          <Image src={anulada} alt="" className="" />
          <span className="text-textSize5 md:text-textSize4  text-[#FF6633]">
            Orden Rechazada
          </span>
        </div>
      </div>
      <div className="h-[122px]">
        <span className="flex my-5 justify-start mx-5 md:mx-20">
          Los datos fueron validados y sin inválidos
        </span>
      </div>
    </div>
  )
}

export default OrdenRechazada
