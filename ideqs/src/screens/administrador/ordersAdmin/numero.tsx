import Image from 'next/image'

import Button from '../../../components/buttons/primaryButton'

import deletee from '../../../assets/administrador/orders/delete.svg'
import { Colors } from '../../../components/buttons/typesButton'
import Inputs from '../../../components/inputs/inputTexto'

interface actionsFiltros {
  action?: (e: any) => void
  aplyFilter?: () => void
  deleteA?: () => void
  value?: number | string
}

const Numero = ({ action, aplyFilter, deleteA, value }: actionsFiltros) => {
  const flag = true
  return (
    <div
      className={`bg-white  z-20  container rounded-md shadow-lg border-2${
        flag ? ' ' : 'border-grisNeutral300'
      }   w-[90%] md:w-[400px] h-[179px] relative flex flex-col justify-center   `}
    >
      <div className="px-10 ">
        <br />
        <span className=" text-grisNeutral100 mx-auto font-medium  ">
          Número de identificación
        </span>

        <div className="flex flex-col justify-center text-center ">
          <Inputs
            name={'identificacion'}
            label={''}
            className={' w-[300px]  rounded-md border-2 border-azulPrimary700'}
            action={action}
            type={'text'}
            placeholder={'Número'}
            value={value}
          />

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
                'text-center w-[228px] h-[36px] mx-auto bg-azulPrimary700'
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

export default Numero
