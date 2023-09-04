import Image from 'next/image'

import Button from '../../../components/buttons/buttonPrimaryInvert'
import servicios from '../../../assets/empresa/orders/servicios.svg'
import anulada from '../../../assets/empresa/orders/anulada.svg'
import Unidades from '../../../assets/empresa/orders/324 Unidades.png'
import iden from '../../../assets/administrador/orders/iden.svg'
import carnet from '../../../assets/empresa/orders/carnet.png'
import carnetpdf from '../../../assets/empresa/orders/carnetPdf.png'
import IDMovile from '../../../assets/empresa/orders/ID Mobile.png'
import ojo from '../../../assets/empresa/orders/Group49.png'
import creado from '../../../assets/empresa/orders/creado.svg'
import atach from '../../../assets/empresa/orders/atachblue.svg'
import Creado from '../../../components/box/cardCreado'
import { PuffLoader } from 'react-spinners'
import { useRouter } from 'next/router'
import {
  editarEstadoOrden,
  getOrderDetalle
} from '../../../redux/actions/orderAdminActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getOrderDetail } from '../../../redux/reducers/orderAdminReducer'
import AnularOrden from './eliminarOrden'
import { selectUser } from '../../../redux/reducers/authReducer'
import cara from '../../../assets/general/cara.svg'
import moment from 'moment'
import 'react-loading-skeleton/dist/skeleton.css'
import { decodeExcelBase64 } from '../../../functions/DecodeBase64'
import AprobarOrden from '../../../components/ordenDetails/aprobarOrden'
import OrdenRechazada from '../../../components/ordenDetails/ordenRechazada'
import OrdenAprobada from '../../../components/ordenDetails/ordenAprobada'
import OrdenEspera from '../../../components/ordenDetails/ordenEspera'
import VerificarAprobar from '../../../components/ordenDetails/verificarAprobar'
import { USER_ROLES } from '../../../utils/user-roles'
import RechazarOrden from '../../../components/ordenDetails/rechazar'
import { validUrl } from '../../../utils/validUrl'
import { ORDERS_STATES } from '../../../utils/ordenState'
export interface EditarOrden {
  orden: number
  estado: number
}

const DetalleO = ({
  setMenu,
  admin
}: {
  menu: number
  setMenu: (e: number) => void
  admin?: boolean
}) => {
  const user = useSelector(selectUser)
  const [anular, setAnular] = useState(false)
  const [aprobar, setAprobar] = useState(false)
  const [rechazar, setRechazar] = useState(false)
  const orders = useSelector(getOrderDetail)

  const [loadingPdfs, setLoadingPdfs] = useState(true)
  const [primera, setPrimera] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const Id = router.query.id
  const dispatch = useDispatch()
  const [editar, setEditar] = useState<EditarOrden>({
    orden: Number(Id),
    estado: 1
  })
  const playStore =
    'https://play.google.com/store/apps/details?id=co.com.idmobile.app'
  const appStrore = 'https://apps.apple.com/co/app/idmobile/id1596784384?l=en'
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']
  let os = null
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = appStrore
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = appStrore
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = playStore
  } else if (/Android/.test(userAgent)) {
    os = playStore
  } else if (/Linux/.test(platform)) {
    os = playStore
  }
  useEffect(() => {
    if (orders) {
      if (orders?.flagProcesado !== 0) {
        setLoadingPdfs(true)
        const timer = setTimeout(() => {
          getOrderDetalle(dispatch, Id)
        }, 30000)
        return () => clearTimeout(timer)
      } else {
        setLoadingPdfs(false)
      }
    }
  }, [orders, Id])
  useEffect(() => {
    const action = async () => {
      if (!primera) {
        setLoading(true)
        await getOrderDetalle(dispatch, Id)
        setPrimera(true)
        setLoading(false)
      }
    }
    action()
  }, [Id])

  const handleChange = async (e: any) => {
    setEditar({ ...editar, [e.target.name]: e.target.value })
  }
  const recargar = async () => {
    setLoading(true)
    setAnular(false)
    setAprobar(false)
    setRechazar(false)
    await getOrderDetalle(dispatch, Number(Id))
    setLoading(false)
  }
  const cancel = async () => {
    setAnular(false)
    setAprobar(false)
    setRechazar(false)
  }

  const handleSubmit = async () => {
    setLoading(true)
    await editarEstadoOrden(editar)
    await getOrderDetalle(dispatch, Number(Id))
    setLoading(false)
  }

  const override: any = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  return loading ? (
    <div className="flex w-full absolute inset-0  justify-center items-center">
      <PuffLoader
        color="#086eae"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div className="container md:px-[10px] lg:px-[233px] md:mx-32 lg:ml-40 mx-auto h-full my-5 w-[90%] md:my-5">
      <span className="text-textSize4 md:text-textSize2 flex my-20 font-bold md:font-extrabold  text-azulPrimary900">
        ORDEN {orders && orders.id}
      </span>
      {orders &&
        orders.estado !== ORDERS_STATES.ANULADO &&
        orders.estado !== ORDERS_STATES.RECHAZADO &&
        orders.estado !== ORDERS_STATES.PORAPROBAR && (
          <div className="flex flex-col">
            <div className="w-[288px] md:w-[804px] h-[17px] md:h-[20px] mb-2 bg-grisNeutral100 rounded-full  dark:bg-gray-300">
              <div
                className={`flex justify-end h-[20px] bg-[#2490D3] rounded-full dark:bg-blue-500  text-end items-center   ${
                  orders && orders?.estado === ORDERS_STATES.PENDIENTE
                    ? 'w-[20%]'
                    : orders && orders?.estado === ORDERS_STATES.ACEPTADO
                    ? 'w-[40%]'
                    : orders && orders?.estado === ORDERS_STATES.IMPRESO
                    ? 'w-[70%]'
                    : orders && orders?.estado === ORDERS_STATES.FINALIZADA
                    ? 'w-[100%]'
                    : 'w-[0%]'
                }`}
              >
                <span className="mx-2 text-white font-light h-fit">
                  {orders && orders?.estado === ORDERS_STATES.PENDIENTE
                    ? 'Paso 1'
                    : orders && orders?.estado === ORDERS_STATES.ACEPTADO
                    ? 'Paso 2'
                    : orders && orders?.estado === ORDERS_STATES.IMPRESO
                    ? 'Paso 3'
                    : orders && orders?.estado === ORDERS_STATES.FINALIZADA
                    ? 'Paso 4'
                    : 'w-[0%]'}
                </span>
              </div>
            </div>
            {!admin &&
              USER_ROLES.PRDUCCION !== user?.rol &&
              USER_ROLES.RECEPCION !== user?.rol && (
                <div className="w-[288px] md:w-[970px]  grid grid-cols-4 text-textSize7 md:text-textSize6">
                  <span className="font-bold text-azulPrimary900">
                    Pendiente
                  </span>
                  <span className="font-bold text-azulPrimary900">
                    Aceptada
                  </span>
                  <span className="font-bold text-azulPrimary900">Impresa</span>
                  <span className="font-bold text-azulPrimary900">
                    Finalizada
                  </span>
                </div>
              )}
            {admin && (
              <div>
                <div className="w-[288px] md:w-[970px]  grid grid-cols-4 text-textSize7 md:text-textSize6">
                  <div className="flex items-center">
                    {orders?.estado === 1 ? (
                      <input
                        type="radio"
                        id="1"
                        name="estado"
                        value="1"
                        defaultChecked={true}
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id="1"
                        name="estado"
                        value="1"
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    )}
                    <span className="font-bold text-azulPrimary900 mx-2">
                      Pendiente
                    </span>
                  </div>

                  <div className="flex items-center">
                    {orders?.estado === 2 ? (
                      <input
                        type="radio"
                        id="2"
                        name="estado"
                        value="2"
                        defaultChecked={true}
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id="2"
                        name="estado"
                        value="2"
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    )}
                    <span
                      className={`font-bold  ${
                        orders?.estado >= 2
                          ? 'text-azulPrimary900'
                          : ' text-grisNeutral100'
                      } mx-2`}
                    >
                      Aceptada
                    </span>
                  </div>

                  <div className="flex items-center">
                    {orders?.estado === 3 ? (
                      <input
                        type="radio"
                        id="3"
                        name="estado"
                        value="3"
                        defaultChecked={true}
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id="3"
                        name="estado"
                        value="3"
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    )}

                    <span
                      className={`font-bold  ${
                        orders?.estado >= 3
                          ? 'text-azulPrimary900'
                          : ' text-grisNeutral100'
                      } mx-2`}
                    >
                      Impresa
                    </span>
                  </div>

                  <div className=" flex items-center ">
                    {orders?.estado === 4 ? (
                      <input
                        type="radio"
                        id="4"
                        name="estado"
                        value="4"
                        defaultChecked={true}
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    ) : (
                      <input
                        type="radio"
                        id="4"
                        name="estado"
                        value="4"
                        className="w-[15px] h-[15px] border-2 border-gray-100"
                        onChange={handleChange}
                      />
                    )}
                    <span
                      className={`font-bold  ${
                        orders?.estado >= 4
                          ? 'text-azulPrimary900'
                          : ' text-grisNeutral100 '
                      } mx-2`}
                    >
                      Finalizada
                    </span>
                  </div>
                </div>
                {user?.rol !== USER_ROLES.PRDUCCION && orders?.estado !== 4 && (
                  <div className=" flex justify-center pt-5 w-[288px] md:w-[804px]">
                    <Button
                      label={'Actualizar'}
                      action={handleSubmit}
                      type={'button'}
                      className={`w-[80px] md:w-[137px] h-[20px] md:h-[44px] text-white bg-azulPrimary900 rounded-md  border-0`}
                      classNameText={
                        'text-textSize7 md:text-textSize6 font-normal '
                      }
                    />
                  </div>
                )}
              </div>
            )}
            {USER_ROLES.ENCARGADO !== user?.rol &&
              USER_ROLES.ADMIN !== user?.rol &&
              USER_ROLES.USUARIO_PRINCIPAL !== user?.rol &&
              USER_ROLES.USUARIO_SUCURSAL !== user?.rol && (
                <div>
                  <div className="w-[288px] md:w-[970px]  grid grid-cols-4 text-textSize7 md:text-textSize6">
                    <div className="flex items-center">
                      <span className="font-bold text-azulPrimary900 mx-2">
                        Pendiente
                      </span>
                    </div>

                    <div className="flex items-center">
                      {orders?.estado === ORDERS_STATES.PENDIENTE && (
                        <input
                          type="radio"
                          id="2"
                          name="estado"
                          value="2"
                          className="w-[15px] h-[15px] border-2 border-gray-100"
                          onChange={handleChange}
                        />
                      )}
                      <span
                        className={`font-bold  ${
                          orders?.estado >= ORDERS_STATES.ACEPTADO
                            ? 'text-azulPrimary900'
                            : ' text-grisNeutral100'
                        } mx-2`}
                      >
                        Aceptada
                      </span>
                    </div>

                    <div className="flex items-center">
                      {orders?.estado === ORDERS_STATES.ACEPTADO &&
                        user?.rol !== USER_ROLES.RECEPCION && (
                          <input
                            type="radio"
                            id="3"
                            name="estado"
                            value="3"
                            className="w-[15px] h-[15px] border-2 border-gray-100"
                            onChange={handleChange}
                          />
                        )}
                      <span
                        className={`font-bold  ${
                          orders?.estado >= ORDERS_STATES.IMPRESO
                            ? 'text-azulPrimary900'
                            : ' text-grisNeutral100'
                        } mx-2`}
                      >
                        Impresa
                      </span>
                    </div>

                    <div className=" flex items-center ">
                      {orders?.estado === ORDERS_STATES.IMPRESO &&
                        USER_ROLES.RECEPCION === user?.rol && (
                          <input
                            type="radio"
                            id="4"
                            name="estado"
                            value="4"
                            className="w-[15px] h-[15px] border-2 border-gray-100"
                            onChange={handleChange}
                          />
                        )}
                      <span
                        className={`font-bold  ${
                          orders?.estado >= ORDERS_STATES.FINALIZADA
                            ? 'text-azulPrimary900'
                            : ' text-grisNeutral100 '
                        } mx-2`}
                      >
                        Finalizada
                      </span>
                    </div>
                  </div>
                  {user?.rol !== USER_ROLES.RECEPCION &&
                    user?.rol !== USER_ROLES.PRDUCCION && (
                      <div className=" flex justify-center pt-5 w-[288px] md:w-[804px]">
                        <Button
                          label={'Actualizar'}
                          action={handleSubmit}
                          type={'button'}
                          className={`w-[80px] md:w-[137px] h-[20px] md:h-[44px] text-white bg-azulPrimary900 rounded-md  border-0`}
                          classNameText={
                            'text-textSize7 md:text-textSize6 font-normal '
                          }
                        />
                      </div>
                    )}
                  {user?.rol === USER_ROLES.PRDUCCION &&
                    orders?.estado < ORDERS_STATES.IMPRESO && (
                      <div className=" flex justify-center pt-5 w-[288px] md:w-[804px]">
                        <Button
                          label={'Actualizar'}
                          action={handleSubmit}
                          type={'button'}
                          className={`w-[80px] md:w-[137px] h-[20px] md:h-[44px] text-white bg-azulPrimary900 rounded-md  border-0`}
                          classNameText={
                            'text-textSize7 md:text-textSize6 font-normal '
                          }
                        />
                      </div>
                    )}
                  {user?.rol === USER_ROLES.RECEPCION &&
                    orders?.estado < ORDERS_STATES.ACEPTADO && (
                      <div className=" flex justify-center pt-5 w-[288px] md:w-[804px]">
                        <Button
                          label={'Actualizar'}
                          action={handleSubmit}
                          type={'button'}
                          className={`w-[80px] md:w-[137px] h-[20px] md:h-[44px] text-white bg-azulPrimary900 rounded-md  border-0`}
                          classNameText={
                            'text-textSize7 md:text-textSize6 font-normal '
                          }
                        />
                      </div>
                    )}
                </div>
              )}
          </div>
        )}

      {orders &&
        orders?.estado === ORDERS_STATES.PENDIENTE &&
        user?.rol !== USER_ROLES.ENCARGADO && <OrdenAprobada />}
      {orders &&
        orders?.estado === ORDERS_STATES.PORAPROBAR &&
        user?.rol === USER_ROLES.ENCARGADO && (
          <AprobarOrden
            aprobar={() => setAprobar(true)}
            action={() => setRechazar(true)}
          />
        )}
      {orders &&
        orders?.estado === ORDERS_STATES.PORAPROBAR &&
        user?.rol !== USER_ROLES.ENCARGADO && <OrdenEspera />}

      {orders &&
        orders?.estado === ORDERS_STATES.PORAPROBAR &&
        user?.rol === USER_ROLES.USUARIO_PRINCIPAL && (
          <AprobarOrden
            aprobar={() => setAprobar(true)}
            action={() => setRechazar(true)}
          />
        )}
      {orders &&
        orders?.estado === ORDERS_STATES.RECHAZADO &&
        user?.rol !== USER_ROLES.ENCARGADO && <OrdenRechazada />}

      {rechazar && (
        <RechazarOrden
          id={orders?.id}
          closeDialogue={recargar}
          afterDelete={() => getOrderDetalle(dispatch, Number(Id))}
          cancel={cancel}
        />
      )}
      {aprobar && (
        <VerificarAprobar
          id={orders?.id}
          closeDialogue={recargar}
          afterDelete={() => getOrderDetalle(dispatch, Number(Id))}
          cancel={cancel}
        />
      )}
      {orders && orders?.estado === ORDERS_STATES.ANULADO && (
        <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[288px] md:w-[804px] my-10">
          <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
            <div className="mx-7 flex justify-start items-center gap-10">
              <Image src={anulada} alt="" className="" />
              <span className="text-textSize4  text-azulPrimary700">
                Orden Anulada
              </span>
            </div>
          </div>
          <div className="h-[110px]">
            <span className="flex my-5 justify-start mx-5 md:mx-20">
              {orders && orders?.razonAnulacion
                ? orders?.razonAnulacion
                : 'Sin razon'}
            </span>
          </div>
        </div>
      )}

      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[288px] md:w-[804px] my-10">
        <div className="h-[40px] md:h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-5">
            <Image src={creado} alt="" className="" />
            <span className="text-textSize5 md:text-textSize4  text-azulPrimary700">
              N° Orden: {orders && orders.id}
            </span>
          </div>
        </div>
        <div className="h-[209px] md:h-[240px] text-center text-grisNeutral300 font-bold">
          <div className="grid grid-cols-1 gap-y-4 my-6 mx-5 md:mx-20 w-[80%]  ">
            <div className="flex flex-col gap-y-2 truncate text-ellipsis">
              <div className="flex  justify-start ">
                Cliente:{' '}
                <span className="text-black font-normal mx-5 pl-5">
                  {user && user?.idCliente
                    ? user?.name
                    : 'Sin especificar cliente'}
                </span>
              </div>
              <span className="flex  justify-start ">
                Sucursal:
                <span className="text-black font-normal mx-2 pl-5">
                  {orders && orders?.sucursal
                    ? orders?.sucursal
                    : 'Sin especificar sucursal'}
                </span>{' '}
              </span>
              <span className="flex  justify-start ">
                Usuario:
                <span className="text-black font-normal mx-4 pl-5">
                  {user?.user}
                </span>
              </span>
              <span className="flex  justify-start ">
                Fecha:
                <span className="text-black font-normal mx-7 pl-5 ">
                  {orders && orders?.creado
                    ? moment(orders?.creado).format('YYYY-MM-DD')
                    : 'Sin fecha'}
                </span>{' '}
              </span>
            </div>

            <a download href={decodeExcelBase64(orders?.excel)}>
              <label className="flex w-[245px] md:w-[387px] h-[32px] md:h-[56px]  bg-azulPrimary100 rounded-md  text-azulPrimary700 font-medium my-3 cursor-pointer  ">
                <div className="mx-2 md:mx-5 max-w-[90%] md:pt-4 items-center truncate">
                  <Image src={atach} alt="" className="" />

                  <span className="mx-2 text-ellipsis">
                    {' '}
                    {orders && orders?.nombreExcel
                      ? orders?.nombreExcel
                      : 'No hay nombre de archivo Excel'}
                  </span>
                </div>
              </label>
            </a>
          </div>
        </div>
      </div>
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[288px] md:w-[804px] my-10">
        <div className="h-[40px] md:h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-4 md:gap-10">
            <Image src={servicios} alt="" className="" />
            <span className="text-textSize5 md:text-textSize4  text-azulPrimary700">
              Servicios
            </span>
          </div>
        </div>
        <div className="min-h-[300px] md:h-[424px]">
          {orders && !orders?.fisica && !orders?.idmobile && !orders?.pdf && (
            <div className="mx-auto pt-32 flex flex-col justify-center w-fit ">
              <Image src={cara} alt="" className="" />
              <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
                Lo siento, no hay servicios disponibles
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:flex  mx-auto w-fit  md:justify-center gap-8 m-7 pt-3">
            {orders && orders?.fisica === true && (
              <Creado
                title="ID Física"
                img={carnet}
                unidades={orders?.cantidad < 1 ? '0' : orders?.cantidad}
                img2={Unidades}
                button={'Detalles ->'}
                action={() => setMenu(5)}
              />
            )}
            {orders && orders?.idmobile === true && (
              <Creado
                title="ID Mobile"
                img={IDMovile}
                button={'Ir a la app ->'}
                url={os}
              />
            )}
            {orders && orders?.pdf === true && (
              <Creado
                title="Carné PDF"
                img={carnetpdf}
                button={'Ver orden ->'}
                pdf={loadingPdfs}
                unidades={orders?.cantidad < 1 ? '0' : orders?.cantidad}
                action={
                  admin
                    ? () =>
                        router.push(
                          `/administrador/orders/carne/${Id}`,
                          undefined,
                          { shallow: true }
                        )
                    : () =>
                        router.push(
                          `/${validUrl(user?.rol)}/orders/carne/${Id}`,
                          undefined,
                          { shallow: true }
                        )
                }
              />
            )}
          </div>
        </div>
      </div>

      <div className="container border-2  border-azulPrimary100 shadow-xl rounded-xl w-[280px] md:w-[804px] my-10">
        <div className="w-full md:h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="md:mx-7 flex justify-start  items-center gap-10">
            <Image src={ojo} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">
              Observaciones
            </span>
          </div>
        </div>
        <div className="h-[110px]">
          <span className="flex my-5 justify-start mx-5 md:mx-20">
            {orders && orders?.observacion
              ? orders?.observacion
              : 'Sin observaciones'}
          </span>
        </div>
      </div>
      {orders &&
        orders?.remisiones &&
        orders?.remisiones.lenght &&
        orders?.remisiones.lenght !== 0 && (
          <div className="container border-2 border-azulPrimary100 shadow-xl rounded-xl w-[280px] md:w-[804px] my-10">
            <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
              <div className="mx-7 flex justify-start items-center gap-10">
                <Image src={iden} alt="" className="" />
                <span className="text-textSize4  text-azulPrimary700">
                  Remision
                </span>
              </div>
            </div>
            <div className="h-[128px] md:h-[180px] flex justify-between text-grisNeutral300 font-bold">
              <div className=" flex items-center ">
                <div className="flex flex-col gap-y-4 my-6 mx-5 md:mx-20">
                  <span className="flex  justify-start ">Fecha </span>
                  <span className="flex  justify-start ">
                    Remision:{orders && orders?.referencia}
                  </span>
                  <span className="flex  justify-start ">
                    Cantidad:{orders?.cantidad < 1 ? 0 : orders?.cantidad}
                  </span>
                </div>
                <button
                  onClick={() =>
                    router.push(
                      `/${validUrl(user?.rol)}/orders/detalleRemision/${Id}`,
                      undefined,
                      { shallow: true }
                    )
                  }
                  className="w-[85px] md:w-[185px] h-[22px] md:h-[44px] text-white bg-azulPrimary700 my-6 rounded-md mx-10 md:mx-40  border-0"
                >
                  Ver Remision
                </button>
              </div>
            </div>
          </div>
        )}
      {orders &&
        orders?.estado !== ORDERS_STATES.ANULADO &&
        user?.rol !== USER_ROLES.ENCARGADO &&
        user?.rol !== USER_ROLES.PRDUCCION &&
        user?.rol !== USER_ROLES.RECEPCION &&
        user?.rol !== USER_ROLES.USUARIO_SUCURSAL && (
          <div className=" flex justify-center md:justify-end  ">
            <Button
              label={'Anular'}
              action={() => setAnular(true)}
              type={'button'}
              className={`w-[85px] h-[22px] md:h-[44px] text-white bg-[#EE7B13] rounded-md  border-0`}
            />
          </div>
        )}

      {anular && (
        <AnularOrden
          id={orders?.id}
          closeDialogue={recargar}
          afterDelete={() => getOrderDetalle(dispatch, Number(Id))}
          cancel={cancel}
        />
      )}
    </div>
  )
}

export default DetalleO
