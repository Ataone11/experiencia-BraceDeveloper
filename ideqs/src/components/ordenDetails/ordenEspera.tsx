import Image from 'next/image'
import anulada from '../../assets/administrador/orders/Oespera.svg'

const OrdenEspera = () => {
  return (
    <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[288px] md:w-[804px] my-10">
      <div className="h-[68px] bg-azulSecondary100 items-center flex ">
        <div className="mx-5 flex justify-start items-center gap-5">
          <Image src={anulada} alt="" className="" />
          <span className="text-textSize5 md:text-textSize4 text-neutral-500">
            Orden en Espera
          </span>
        </div>
      </div>
      <div className="h-[122px]">
        <span className="flex my-5 justify-start mx-5 md:mx-10">
          Tu orden esta en proceso
        </span>
      </div>
    </div>
  )
}

export default OrdenEspera
