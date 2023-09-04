import Image from 'next/image'
import Button from '../../../components/buttons/primaryButton'
import deletee from '../../../assets/administrador/orders/delete.svg'
import { Colors } from '../../../components/buttons/typesButton'
import Inputs from '../../../components/inputs/inputTexto'

interface actionsFiltros {
  action?: (e: any) => void
  aplyFilter?: () => void
  deleteA?: () => void
  valueStart?: string
  valueFinal?: string
}

const FiltroFecha = ({
  action,
  aplyFilter,
  deleteA,
  valueStart,
  valueFinal
}: actionsFiltros) => {
  const flag = true

  return (
    <div
      className={`bg-white z-20    container rounded-md shadow-lg border-2${
        flag ? ' ' : 'border-grisNeutral300'
      }    w-[400px] h-[310px] relative flex flex-col justify-center  `}
    >
      <div className="px-10 pt-7">
        <span className=" text-grisNeutral100 mx-auto font-medium ">
          Rango de fecha de creación de la orden
        </span>

        <div className="flex flex-col justify-start text-center  py-5">
          <div className="flex flex-col gap-y-5">
            <Inputs
              name={'startDate'}
              label={'Fecha inicial'}
              className={' rounded-md border-2 border-azulPrimary700 w-[300px]'}
              action={action}
              type={'date'}
              placeholder={'Orden n°'}
              value={valueStart}
            />
            <Inputs
              name={'finalDate'}
              label={'Fecha final'}
              className={
                '  rounded-md border-2 border-azulPrimary700 w-[300px]'
              }
              action={action}
              type={'date'}
              placeholder={'Orden n°'}
              value={valueFinal}
            />
          </div>
          <div className="flex items-center">
            <button
              type={'button'}
              onClick={deleteA}
              className={`snap-center rounded-lg py-2 px-4 flex text-white  text-sm my-5  w-[48px] h-[36px] border-2 border-azulPrimary700 items-center `}
            >
              <Image
                src={deletee}
                alt=""
                className="flex justify-center"
                width={16}
                height={16}
              />
            </button>

            <Button
              color={Colors.blue_primary}
              label={'Aplicar filtro'}
              action={aplyFilter}
              className={
                'text-center w-[228px] h-[36px] mx-auto bg-azulPrimary700 disabled:bg-azulPrimary300'
              }
              classNameText={'text-textSize7  mx-auto'}
              type={'button'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltroFecha
