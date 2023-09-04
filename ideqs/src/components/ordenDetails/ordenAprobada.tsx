import Image from 'next/image'
import anulada from '../../assets/administrador/orders/Oaprovado.svg'

const OrdenAprobada = () => {
  return (
    <div className="container  shadow-xl rounded-xl w-[288px] md:w-[804px] my-10">
      <div className="h-[68px] bg-azulSecondary100 items-center flex ">
        <div className="mx-5 flex justify-start items-center gap-5">
          <Image src={anulada} alt="" className="" />
          <span className="text-textSize5 md:text-textSize4  text-azulPrimary700">
            Orden aprobada
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrdenAprobada
