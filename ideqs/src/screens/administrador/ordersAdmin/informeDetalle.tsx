/* eslint-disable no-unused-vars */
import Image from 'next/image'
import servicios from '../../../assets/administrador/orders/servicios.svg'
import Unidades from '../../../assets/administrador/orders/324 Unidades.png'
import carnet from '../../../assets/administrador/orders/carnet.png'
import ojo from '../../../assets/administrador/orders/Group49.png'
import creado from '../../../assets/administrador/orders/creado.svg'
import atach from '../../../assets/administrador/orders/atachblue.svg'
import iden from '../../../assets/administrador/orders/iden.svg'
import Creado from '../../../components/box/cardCreado'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '../../../components/buttons/primaryButton'
import { getOrders } from '../../../redux/actions/ordersActions'

const handleChange = async () => null
const dispach = async (dispatch: any, Id: any) => {
  const res = await getOrders(dispatch, Id, 1)
  return res
}

const InformeDetalle = ({
  setMenu
}: {
  menu: number
  setMenu: (e: number) => void
}) => {
  const [orden, setOrden] = useState<any>() 
  const router = useRouter()
  const Id = router.query.id
  const dispatch = useDispatch()
  useEffect(() => {
    getOrders(dispatch, Id, 1)
    if (!orden) {
      setOrden(dispach(dispatch, Id))
    }
  }, [])
  return (
    <div className="container py-[57px] px-[133px]  w-[90%]">
      <span className="text-textSize2 font-extrabold text-azulPrimary900">
        INFORME
      </span>
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl  w-[804px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-10">
            <Image src={creado} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              N° Orden: 69347
            </span>
          </div>
        </div>
        <div className="h-[220px] text-center text-grisNeutral300 font-bold">
          <div className="flex flex-col gap-y-4 my-6 mx-20">
            <span className="flex  justify-start ">Cliente:</span>
            <span className="flex  justify-start ">Sucursal:</span>
            <span className="flex  justify-start ">Usuario:</span>
            <span className="flex  justify-start ">Fecha:</span>
            <label className=" flex text-azulPrimary700 font-medium my-3 cursor-pointer ">
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className={`hidden`}
              />
              <Image src={atach} alt="" className="" />
              <span className="mx-3">Seguros Estudiantiles 2.xlsx</span>
            </label>
          </div>
        </div>
      </div>
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[804px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-10">
            <Image src={servicios} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              Detalles de Orden
            </span>
          </div>
        </div>
        <div className="h-[380px]">
          <div className="flex justify-center my-10 mx-auto">
            <Creado
              title="ID Física"
              img={carnet}
              img2={Unidades}
              button={'Detalles ->'}
            />
          </div>
        </div>
      </div>

      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[804px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-10">
            <Image src={ojo} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              Observaciones
            </span>
          </div>
        </div>
        <div className="h-[110px]">
          <span className="flex my-5 justify-start mx-20">
            Prueba de visaualizacion de comentario
          </span>
        </div>
      </div>
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[804px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-10">
            <Image src={iden} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              Remisíon
            </span>
          </div>
        </div>
        <div className="h-[180px] flex justify-start text-grisNeutral300 font-bold">
          <div className="flex flex-col gap-y-4 my-6 mx-20">
            <span className="flex  justify-start ">Fecha:</span>
            <span className="flex  justify-start ">Remisíon:</span>
            <span className="flex  justify-start ">Cantidad:</span>
          </div>
        </div>
      </div>
      <Button
        label={'Regresar'}
        className={'w-[130px] bg-azulPrimary700 rounded h-[45px]'}
        action={() => setMenu(2)}
        color={'bg-azulPrimary700'}
      />
    </div>
  )
}

export default InformeDetalle
