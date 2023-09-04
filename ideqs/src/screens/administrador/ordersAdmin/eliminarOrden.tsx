import React, { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { anularOrden } from '../../../redux/actions/orderAdminActions'
export interface Anular {
  orden: number
  estado: number
  motivoAnulacion?: string
}
const AnularOrden = ({
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
  const [anular, setAnular] = useState<Anular>({
    orden: id,
    estado: 5
  })
  const handleChange = (e: any) => {
    setAnular({ ...anular, [e.target.name]: e.target.value })
  }
  const handleClick = async () => {
    setLoading(true)
    anularOrden(anular)
    setLoading(false)
    closeDialogue()
    afterDelete()
  }
  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-30 w-[100vw] h-[100vh] z-[30] grid place-items-center p-4 overflow-y-scroll min-h-fit">
      <div
        className="w-full h-full absolute left-0 top-0"
        onClick={closeDialogue}
      ></div>
      <div className="container relative shadow-2xl flex rounded-2xl justify-center mx-auto text-center bg-white px-6 md:px-10 md:py-3 w-[288px] md:min-w-[884px] min-h-[192px] md:h-[229px] my-2">
        <div className="flex flex-col justify-center gap-4">
          <div
            className="flex w-full justify-end mx-2 my cursor-pointer"
            onClick={closeDialogue}
          ></div>
          <h1 className=" text-azulPrimary700 text-textSize6 md:text-textSize4 my-1">
            ¿Deseas anular esta orden?
          </h1>

          <textarea
            className="border-2 rounded-lg w-[252px] md:w-[658px] h-[56px] md:h-[74px] p-3.5 md:p-2.5"
            name="motivoAnulacion"
            onChange={handleChange}
            placeholder="¿Por qué deseas anular esta orden?"
          />
          {loading ? (
            <div className="flex justify-center w-full  m-auto">
              <PulseLoader className="m-auto" color="#9955D4" />
            </div>
          ) : (
            <div className="text-textSize6 md:text-textSize7 flex gap-3 md:justify-center">
              <button
                onClick={() => handleClick()}
                className={` bg-azulPrimary700 text-white  text-base rounded-md py-2 md:px-4  font-myriad w-[105px] md:w-[124px] align-middle text-center  mx-auto md:mx-2`}
              >
                Sí, eliminar
              </button>
              <button
                onClick={cancel}
                className={`bg-[#FF6633] text-white text-base rounded-md py-2 px-0 md:px-4  font-myriad w-[105px] md:w-[124px] align-middle text-center  mx-auto md:mx-2`}
              >
                No, cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnularOrden
