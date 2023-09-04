/* eslint-disable no-unused-vars */
import Image from 'next/image'
import creado from '../../../assets/administrador/orders/creado.svg'
import Inputs from '../../../components/inputs/inputTextoSinIcono'
import { useRouter } from 'next/router'
import attachfile from '../../../assets/empresa/orders/attach file.svg'
import {
  editarOrden,
  getOrderDetalle
} from '../../../redux/actions/orderAdminActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getOrderDetail } from '../../../redux/reducers/orderAdminReducer'
import { selectUser } from '../../../redux/reducers/authReducer'
import Button from '../../../components/buttons/primaryButton'
import { USER_ROLES } from '../../../utils/user-roles'

export interface Editar {
  orden: number
  poliza: string
  cantidad: number
  tomador: string
  referencia: string
}

const EditarOrden = ({
  setMenu
}: {
  menu: number
  setMenu: (e: number) => void
}) => {
  const [orden] = useState<any>()
  const [disable, setDisable] = useState<boolean>(true)
  const user = useSelector(selectUser)
  const orders = useSelector(getOrderDetail)
  const router = useRouter()

  const Id = router.query.id
  const [editar, setEditar] = useState<Editar>({
    orden: Number(Id),
    cantidad: orders?.cantidad,
    tomador: orders?.tomador,
    referencia: orders?.referencia,
    poliza: orders?.poliza
  })
  const dispatch = useDispatch()
  useEffect(() => {
    getOrderDetalle(dispatch, Id)
    if (!orden) {
      getOrderDetalle(dispatch, Id)
    }
  }, [user])
  const handleSubmit = async () => {
    editarOrden(editar)
    setMenu(4)
    getOrderDetalle(dispatch, Id)
  }
  const handleChange = (e: any) => {
    setEditar({ ...editar, [e.target.name]: e.target.value })
    setDisable(false)
  }

  return (
    <div className="container md:py-[57px] md:px-[133px] justify-center mx-auto  w-[90%]">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setMenu(4)}
          className="w-[45px] hidden md:block h-[45px]   bg-azulPrimary900 rounded-full items-center  "
        >
          <span className=" text-white mx-2 ">{'<-'}</span>
        </button>
        <span className="text-textSize4 md:text-textSize2 font-extrabold text-azulPrimary900">
          ORDEN {orders && orders.id}
        </span>
      </div>

      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl  w-[288px] md:w-[809px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className=" mx-5 md:mx-7 flex justify-start items-center gap-10">
            <Image src={creado} alt="" className="" />
            <span className=" text-textSize6 md:text-textSize4  text-azulPrimary700">
              Datos del archivo
            </span>
          </div>
        </div>
        <div className="h-[455px] md:h-[484px] text-center text-grisNeutral300 font-bold">
          <div className="grid grid-cols-2 gap-y-4 my-6 mx-2 md:mx-20 w-[80%] md:w-[30%]">
            <div className="flex flex-col gap-y-4">
              <span className="flex  justify-start ">N° de orden:</span>
              <span className="flex  justify-start ">Sucursal:</span>
              <span className="flex  justify-start ">Cliente:</span>
              <span className="flex  justify-start ">Usuario:</span>
              <span className="flex  justify-start ">Fecha:</span>
              <span className="flex  justify-start ">Cantidad:</span>
              <span className="flex  justify-start  items-center  gap-x-11">
                Póliza:
              </span>
              <span className="flex  justify-start ">Tomador:</span>
              <div className="flex gap-x-2 items-center">
                <span className="flex  justify-start ">Referencia:</span>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <span className="flex  justify-start text-black font-normal  items-center  w-[200px] gap-x-11">
                {orders && orders && orders?.id}
              </span>
              <span className="flex text-black font-normal justify-start  items-center w-[200px]  gap-x-11">
                {orders && orders?.sucursal ? orders?.sucursal : 'Sin sucursal'}
              </span>
              <span className="flex text-black font-normal justify-start  items-center w-[200px]  gap-x-11">
                {orders && orders?.idCliente
                  ? orders.idCliente
                  : 'Sin especificar cliente'}
              </span>
              <span className="flex text-black font-normal justify-start  items-center  w-[200px] gap-x-11">
                {user?.user}
              </span>
              <span className="flex text-black font-normal justify-start  items-center w-[200px]  gap-x-11">
                {orders && orders?.fecha ? orders?.fecha : 'Sin fecha'}
              </span>
              <div className="flex flex-col gap-y-5 md:gap-y-2">
                {orders?.pdf && USER_ROLES.PRDUCCION !== user?.rol && (
                  <div className="flex flex-col gap-y-6 md:gap-y-2 text-black font-normal text-left">
                    <span className="w-[124px] md:w-[250px] h-[14px] md:h-[30px]">
                      {orders?.cantidad
                        ? orders?.cantidad < 1
                          ? 0
                          : orders?.cantidad
                        : 'Sin cantidad'}
                    </span>
                    <span className="w-[124px] md:w-[250px] h-[14px] md:h-[30px] md:pt-0">
                      {orders?.poliza ? orders?.poliza : 'Sin póliza'}
                    </span>
                    <span className="w-[124px] md:w-[250px] h-[14px] md:h-[30px] pt-1 md:pt-0">
                      {orders?.tomador ? orders?.tomador : 'Sin tomador'}
                    </span>
                  </div>
                )}
                {!orders?.pdf && USER_ROLES.PRDUCCION === user?.rol && (
                  <div className="flex flex-col gap-y-6 md:gap-y-2 text-black font-normal text-left">
                    <span className="w-[124px] md:w-[250px] h-[14px] md:h-[30px]">
                      {orders?.cantidad
                        ? orders?.cantidad < 1
                          ? 0
                          : orders?.cantidad
                        : 'Sin cantidad'}
                    </span>
                    <span className="w-[124px] md:w-[250px] h-[14px] md:h-[30px] md:pt-0">
                      {orders?.poliza ? orders?.poliza : 'Sin póliza'}
                    </span>
                    <span className="w-[124px] md:w-[250px] h-[14px] md:h-[30px] pt-1 md:pt-0">
                      {orders?.tomador ? orders?.tomador : 'Sin tomador'}
                    </span>
                  </div>
                )}

                {USER_ROLES.PRDUCCION !== user?.rol && (
                  <div>
                    {orders?.pdf === false && (
                      <div className="flex flex-col gap-y-5 md:gap-y-2">
                        <Inputs
                          name={'cantidad'}
                          label={''}
                          value={orders?.cantidad}
                          className={
                            'w-[124px] md:w-[250px] h-[14px] md:h-[30px] rounded-md '
                          }
                          action={handleChange}
                          type={'text'}
                          color={'border-azulPrimary700 my-0'}
                          placeholder={'Añadir cantidad'}
                        />
                        <Inputs
                          name={'poliza'}
                          label={''}
                          className={
                            'w-[124px] md:w-[250px] h-[14px] md:h-[30px]  rounded-md '
                          }
                          value={orders?.poliza}
                          action={handleChange}
                          type={'text'}
                          color={'border-azulPrimary700 my-0'}
                          placeholder={'Añadir poliza'}
                        />
                        <Inputs
                          name={'tomador'}
                          label={''}
                          className={
                            'w-[124px] md:w-[250px] h-[14px] md:h-[30px]  rounded-md '
                          }
                          value={orders?.tomador}
                          action={handleChange}
                          type={'text'}
                          color={'border-azulPrimary700 my-0'}
                          placeholder={'Añadir tomador'}
                        />
                      </div>
                    )}
                    <div className="pt-3 md:pt-0 my-2">
                      <Inputs
                        name={'referencia'}
                        label={''}
                        className={
                          'w-[124px] md:w-[250px] h-[14px] md:h-[30px]  rounded-md  '
                        }
                        value={orders?.referencia}
                        action={handleChange}
                        type={'text'}
                        color={'border-azulPrimary700 my-0'}
                        placeholder={'Añadir referencia'}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" flex justify-center pr-3 mx-auto w-fit">
            <Button
              color="bg-azulPrimary700"
              label={'Editar'}
              action={handleSubmit}
              type={'button'}
              disable={disable}
              classNameText={'pl-4'}
              className={`w-[109px] h-[44px] text-white disabled:bg-azulPrimary300  text-center border-0`}
            />
          </div>
        </div>
      </div>
      <div className="container hidden border-2 border-azulPrimary100 shadow-xl rounded-xl  w-[804px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-10">
            <Image src={creado} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              Novedades
            </span>
          </div>
        </div>
        <div className="h-[329px] text-center text-grisNeutral300 font-bold">
          <div className=" my-7  mx-10">
            <span>Adjunta aqui la novedades en la ID Físicas</span>
            <label className="box-c rounded-md cursor-pointer w-[387px] h-[56px]  my-5 flex justify-center items-center font-semibold text-grisNeutral500  ">
              <input
                type="file"
                name="poliza"
                onChange={handleChange}
                className={`hidden`}
              />
              <div className="flex py-2 pr-5">
                <Image src={attachfile} alt="" className="" />
              </div>
              Arrastra o
              <span className=" text-azulPrimary700 mx-2">adjunta aquí</span>
              los archivos
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarOrden
