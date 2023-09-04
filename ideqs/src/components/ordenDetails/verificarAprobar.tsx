import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PulseLoader } from 'react-spinners'
import { aprobarOrden } from '../../../src/redux/actions/orderAdminActions'
import { selectUser } from '../../redux/reducers/authReducer'
export interface Anular {
  orden: number
  estado: number
  motivoAnulacion?: string
}
const verificarAprobar = ({
  id,
  closeDialogue,
  afterDelete,
  cancel
}: {
  id: number
  closeDialogue: () => void
  afterDelete: () => void
  cancel: () => void
}) => {
  const [loading, setLoading] = useState(false)
  const user = useSelector(selectUser)
  const handleClick = async () => {
    setLoading(true)
    aprobarOrden(id, user?.user)
    setLoading(false)
    closeDialogue()
    afterDelete()
  }
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      <div className="container shadow-2xl flex rounded-2xl justify-center mx-auto text-center bg-white px-6 md:px-10 md:py-3 w-[288px] md:min-w-[884px] min-h-[131px] md:h-[135px] my-2">
        <div className="flex flex-col justify-center gap-4">
          <div
            className="flex w-full justify-end mx-2 my cursor-pointer"
            onClick={closeDialogue}
          ></div>
          <h1 className=" text-azulPrimary700 text-textSize6 md:text-textSize4 ">
            ¿Deseas aprobar la orden?
          </h1>

          {loading ? (
            <div className="flex justify-center w-full  m-auto">
              <PulseLoader className="m-auto" color="#9955D4" />
            </div>
          ) : (
            <div className="text-textSize6 md:text-textSize7 flex gap-3 md:justify-center">
              <button
                onClick={() => handleClick()}
                className={` bg-azulPrimary700 text-white  text-base rounded-md py-2 md:px-2  font-myriad w-[46px] h-[36px]   align-middle text-center  mx-auto md:mx-2`}
              >
                Sí
              </button>
              <button
                onClick={cancel}
                className={`bg-[#FF6633] text-white text-base rounded-md py-2 px-0 md:px-2  font-myriad w-[46px] h-[36px] align-middle text-center  mx-auto md:mx-2`}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default verificarAprobar
