import checka from '../../assets/administrador/usuarios/manejador/checka.svg'
import cancel from '../../assets/administrador/orders/cancelar.svg'
import chulo from '../../assets/administrador/orders/chulo.svg'
import x from '../../assets/administrador/orders/x.svg'
import ButtonA from '../buttons/alternButton'

interface Params {
  classname?: string | null
  action?: () => void
  aprobar?: () => void
}

const AprobarOrden = ({
  classname = 'w-[288px] md:w-[804px] h-[39px] md:h-[69px]',
  action,
  aprobar
}: Params) => {
  return (
    <div
      className={`bg-[#F6FAFF]  text-azulPrimary700  container rounded-lg   my-2    relative flex justify-between items-center ${classname} `}
    >
      <span className="text-textSize6 md:text-textSize4 text-azulPrimary700 mx-5 w-fit">
        Aprobar Orden
      </span>
      <div className="hidden  md:flex gap-5 mx-10">
        <ButtonA
          color=""
          label=""
          icon={checka}
          className={'w-[86px] h-[32px] border border-azulPrimary700'}
          action={aprobar}
        />
        <ButtonA
          color=""
          label=""
          icon={x}
          className={'w-[86px] h-[32px] border border-[#EE7B13]'}
          action={action}
        />
      </div>
      <div className="md:hidden flex gap-5 mx-10">
        <ButtonA
          color=""
          label=""
          icon={chulo}
          className={'w-[46px] h-[22px]  border border-azulPrimary700'}
          action={aprobar}
        />
        <ButtonA
          color=""
          label=""
          icon={cancel}
          className={'w-[46px] h-[22px] border border-[#EE7B13]'}
          action={action}
        />
      </div>
    </div>
  )
}

export default AprobarOrden
