import Image from 'next/image'
import caraSeria from '../../../assets/general/cara.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import Button from '../../../components/buttons/buttonPrimaryInvert'
import edit from '../../../assets/edit.svg'
import servicios from '../../../assets/empresa/orders/servicios.svg'
import Cards from '../../../components/box/card'
import Group from '../../../assets/empresa/orders/Group44.png'
import carnett from '../../../assets/empresa/orders/carnet.png'
import ojo from '../../../assets/empresa/orders/Group49.png'
import serviciosM from '../../../assets/empresa/orders/serviciosM.png'
import ojoM from '../../../assets/empresa/orders/ojoM.svg'
import seguroM from '../../../assets/empresa/orders/seguroM.svg'
import mass from '../../../assets/empresa/orders/mass.svg'
import cancelar from '../../../assets/empresa/orders/cancel.svg'
import iden from '../../../assets/empresa/carne/iden.svg'
import { CrearOrdenAction } from '../../../redux/actions/orderAdminActions'
import mobile from '../../../assets/empresa/orders/mobile.png'
import derecha from '../../../assets/empresa/orders/derecha.svg'
import izquierda from '../../../assets/empresa/orders/izuierda.svg'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { selectCardContentFormats } from '../../../redux/reducers/ordersReducer'
import { getCardContentFormat } from '../../../redux/actions/ordersActions'
import FilesDragAndDrop from '../../../components/FilesDragAndDrop'
import PdfImage from '../../../assets/empresa/orders/pdf.png'
import { toBase64 } from '../../../utils/base64'
import AttachFileIcon from '../../../assets/empresa/orders/attach file.svg'
import { BeatLoader } from 'react-spinners'
import { COLORS } from '../../../utils/colors'
import { selectUser } from '../../../redux/reducers/authReducer'
import { useRouter } from 'next/router'
import { getFormatsActivos } from '../../../redux/actions/formatAdminActions'
import { getFormatsSelector } from '../../../redux/reducers/formatAdminReducer'
import { decodeImageBase64 } from '../../../functions/DecodeBase64'
import { Template } from '../../../models/templateModel'
import { validUrl } from '../../../utils/validUrl'

const NuevaOrden = () => {
  const router = useRouter()
  const [observation, setObservation] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)

  const dispatch = useDispatch()
  const [physicId, setPhysicId] = useState(false)
  const [mobileId, setMobileId] = useState(false)
  const [template, setTemplate] = useState<Template | null>(null)
  const [carnet, setCarnet] = useState(1)
  const [pdf, setPdf] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const cardContentFormats = useSelector(selectCardContentFormats)
  const [nombre, setNombre] = useState<string>('')
  const [cara, setCara] = useState<string>('')

  const [carab, setCarab] = useState<string>('')
  const formats = useSelector(getFormatsSelector)

  const user = useSelector(selectUser)

  useEffect(() => {
    const formatos = async () => {
      if (!cardContentFormats && user) {
        setLoading2(true)
        await getCardContentFormat(user?.idCliente, dispatch)
        await getFormatsActivos(dispatch, user?.idCliente)
        setLoading2(false)
      }
    }
    formatos()
  }, [cardContentFormats, user])

  const photos =
    template &&
    template.campos.find((field) => {
      return field.nombreCampoPlantilla === 'imagen'
    })

  const crearOrden = async () => {
    if (!physicId && !mobileId && !pdf) {
      toast.error('Por favor selecciona al menos uno de los servicios')
      return
    } else if (!template && pdf) {
      toast.error('Por favor seleccione un formato')
      return
    } else if (!file) {
      toast.error('Por favor no olvides subir el formato')
      return
    } else if (photos && photos.obligatorio && !photoFile) {
      toast.error('Por favor no olvides subir las fotografías')
      return
    }

    if (!user || !user.user) {
      toast.error('Ha ocurrido un error con la solicitud')
      return
    }

    const excel = await toBase64(file)
    const imagenes = photoFile ? ((await toBase64(photoFile)) as string) : null

    setLoading(true)
    const response = await CrearOrdenAction({
      fisica: physicId,
      idmobile: mobileId,
      pdf,
      observacion: observation,
      excel: (excel ?? '').toString().replace(/^data:(.*,)?/, ''),
      nombreExcel: file.name,
      idPlantilla: pdf ? template?.id ?? 0 : 0,
      usuario: user.user,
      imagenes: imagenes ? imagenes.replace(/^data:(.*,)?/, '') : null
    })
    setLoading(false)
    if (response.error) {
      toast.error(response.error)
    } else if (response?.response?.data?.error) {
      toast.error(response.response.data.error)
    } else {
      toast.success('Orden creada exitosamente')
      router.push(
        `/${validUrl(user?.rol)}/orders/${response.numeroOrden}`,
        undefined,
        { shallow: true }
      )
    }
  }
  const onUpload = (file: File | null) => {
    setFile(file)
  }
  const onUploadPhoto = (file: File | null) => {
    setPhotoFile(file)
  }

  const buttonCreate = (
    <div className="w-[100px]">
      <Button
        label={'Crear'}
        className={'w-[100px] bg-azulPrimary700 rounded h-[45px]'}
        action={crearOrden}
        flag={2}
        index={2}
        icon={mass}
      />
    </div>
  )

  useEffect(() => {
    setFile(null)
  }, [physicId, mobileId, pdf])

  return (
    <div className="container flex flex-col items-center px-4 mx-auto md:py-[57px] md:px-[133px] lg:mx-auto w-fit md:w-[90%]">
      <span className="text-textSize4 container md:text-textSize2 font-extrabold text-azulPrimary900">
        NUEVA ORDEN
      </span>
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-lg w-[288px] md:w-[804px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className=" mx-4 md:mx-7 flex justify-start items-center gap-3 md:text-textSize6 md:gap-5">
            <div className="hidden md:flex">
              <Image src={servicios} alt="" className="" />
            </div>
            <div className="md:hidden flex">
              <Image src={serviciosM} alt="" className="" />
            </div>
            <span className=" text-textSize5 md:text-textSize4  text-azulPrimary700">
              Servicios
            </span>
          </div>
        </div>
        <div className="h-[860px] md:h-[320px]">
          {(user?.physical || user?.mobile || user?.pdf) !== 0 && (
            <span className="flex my-7 justify-center md:justify-start text-center md:mx-24">
              Selecciona los servicios que necesitas para tus identificaciones
            </span>
          )}
          <div className=" grid grid-cols-1 md:flex md:justify-center my-10 mx-auto gap-10">
            {!user?.physical && !user?.mobile && !user?.pdf && (
              <div className="mx-auto flex flex-col justify-center">
                <Image src={caraSeria} alt="" className="" />
                <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
                  Lo siento, no hay servicios disponibles
                </span>
              </div>
            )}

            {user?.physical !== 0 && (
              <Cards
                title={'ID Física'}
                description={'ID Física'}
                img={carnett}
                button={false}
                flag={physicId}
                classname={'h-[225px] w-[177px] mx-auto'}
                action={() => {
                  setPhysicId(!physicId)
                }}
              />
            )}
            {user?.mobile !== 0 && (
              <Cards
                title={'ID Mobile'}
                description={'ID Mobile'}
                img={mobile}
                button={false}
                flag={mobileId}
                action={() => {
                  setPdf(!mobileId)
                  setMobileId(!mobileId)
                }}
                classname={'h-[225px] w-[177px] mx-auto'}
              />
            )}
            {user?.pdf !== 0 && (
              <Cards
                title={'ID PDF'}
                description={'ID PDF'}
                img={PdfImage}
                button={false}
                flag={pdf}
                action={() => {
                  setPdf(!pdf)
                  setMobileId(!pdf)
                }}
                classname={'h-[225px] w-[177px] mx-auto'}
              />
            )}
          </div>
        </div>
      </div>

      {pdf && (
        <div className="container border-2 overflow-x-auto border-azulPrimary100  shadow-xl rounded-lg w-[288px] md:w-[804px] my-10">
          <div className="h-[60px] bg-[#F6FAFF] items-center flex overflow-x-auto ">
            <div className="mx-7 flex justify-start items-center gap-5">
              <Image src={edit} alt="" className="" />
              <span className="text-textSize4  text-azulPrimary700">
                Formatos
              </span>
            </div>
          </div>
          <div className="min-h-[445px] pb-4 md:min-h-[520px] text-center overflow-x-auto">
            <span className="flex my-7 justify-center mx-auto text-textSize7 md:text-textSize6">
              Descarga el formato seleccionado, una vez diligenciado adjunta el
              archivo
            </span>
            <div className="flex overflow-x-auto md:flex md:flex-wrap px-10 md:px-0  md:justify-center my-10 mx-auto gap-10 ">
              {loading2 ? (
                <div className="mx-auto flex flex-col justify-center w-fit">
                  <BeatLoader color={COLORS.azulPrimaryDark} size={15} />
                </div>
              ) : formats && formats.length > 0 ? (
                formats.map((format, i) => {
                  return (
                    <Cards
                      key={`format-${i}`}
                      title={format.nombrePlantilla}
                      description={format.nombrePlantilla}
                      img={Group}
                      flag={!!template && template.id === format.id}
                      action={() => {
                        setTemplate(format)
                        setNombre(format.nombrePlantilla)
                        setCara(format.caraA)
                        setCarab(format.caraB)
                      }}
                      button={true}
                      buttonOnClick={() => {
                        window.open(
                          `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${format.excel}`
                        )
                      }}
                      classname={'min-w-[165px] md:w-[179px] h-[287px]'}
                    />
                  )
                })
              ) : (
                <div className="mx-auto flex flex-col justify-center">
                  <Image src={caraSeria} alt="" className="" />
                  <span className=" text-textSize5 my-5 text-center text-gray-400 w-[220px]">
                    Lo siento, no hay formatos disponibles
                  </span>
                </div>
              )}
            </div>

            <span className="flex my-3 justify-center mx-auto text-textSize7 font-medium text-azulPrimary700">
              Archivos exclusivos para los servicios IDmobile y Carné en PDF
            </span>
            <br />
            <div className="mx-auto w-fit">
              {
                <FilesDragAndDrop
                  file={file}
                  onUpload={onUpload}
                  name={'formato Excel'}
                  nameInput={'Excel'}
                  validFileFormats={
                    mobileId
                      ? [
                          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                          'application/vnd.ms-excel'
                        ]
                      : null
                  }
                />
              }
            </div>

            {photos && (
              <div className="mt-4 mx-auto w-fit">
                <FilesDragAndDrop
                  file={photoFile}
                  onUpload={onUploadPhoto}
                  name={'las fotografías'}
                  nameInput={'fotografias'}
                  validFileFormats={[
                    'application/vnd.rar',
                    'application/x-rar-compressed',
                    'application/octet-stream',
                    'application/zip',
                    'application/octet-stream',
                    'application/x-zip-compressed',
                    'multipart/x-zip'
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {template && (
        <div className="container hidden md:block  w-fit mx-auto">
          <div className="container border-2 border-azulPrimary100 shadow-xl rounded-lg w-[804px] ">
            <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
              <div className="mx-7 flex justify-start items-center gap-10">
                <Image src={iden} alt="" className="" />
                <span className="text-textSize4  text-azulPrimary700">
                  {nombre}
                </span>
              </div>
            </div>
            <div className="min-h-[381px]">
              <div className="grid grid-cols-2 gap-x-10 p-10 px-16">
                <div className="flex flex-col">
                  <Image
                    src={decodeImageBase64(carab)}
                    width={200}
                    height={200}
                    alt="iden"
                  />
                  <span className="mx-auto my-5 font-semibold">Cara A</span>
                </div>
                <div className="flex flex-col">
                  <Image
                    src={decodeImageBase64(cara)}
                    width={200}
                    height={200}
                    alt="iden"
                  />
                  <span className="mx-auto my-5 font-semibold">Cara B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container md:hidden border-2 border-azulPrimary100 shadow-xl rounded-lg w-[288px] my-10">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-4 flex justify-start items-center gap-4 md:gap-10">
            <div className="hidden md:flex">
              <Image src={iden} alt="" className="" />
            </div>
            <div className="md:hidden flex">
              <Image src={seguroM} alt="" className="" />
            </div>
            <span className="text-textSize6 md:text-textSize4  text-azulPrimary700">
              {nombre}
            </span>
          </div>
        </div>
        <div className="min-h-[228px]">
          <div className="flex flex-col gap-x-2 p-5">
            <div className="flex flex-col text-center ">
              <div className="flex w-full items-center justify-between gap-2">
                <button onClick={() => setCarnet(1)}>
                  <Image src={izquierda} layout="fixed" className=" " alt="" />
                </button>
                {carnet === 1 ? (
                  <Image
                    src={decodeImageBase64(cara)}
                    width={200}
                    height={200}
                    alt="iden"
                  />
                ) : (
                  <Image
                    src={decodeImageBase64(carab)}
                    width={200}
                    height={200}
                    alt="iden"
                  />
                )}

                <button onClick={() => setCarnet(2)}>
                  <Image src={derecha} layout="fixed" className=" " alt="" />
                </button>
              </div>

              <span className=" my-5 mx-auto font-semibold text-center w-[238px]">
                {carnet === 1 ? ' Cara A' : ' Cara B'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {physicId && !pdf && (
        <>
          <div className="container hidden md:block border-2 border-azulPrimary100 shadow-xl rounded-lg w-[804px] my-10">
            <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
              <div className="mx-7 flex justify-start items-center gap-5">
                <Image src={AttachFileIcon} alt="" className="" />
                <span className="text-textSize4  text-azulPrimary700">
                  Adjuntos
                </span>
              </div>
            </div>
            <div className="text-start  justify-start py-[20px]">
              <span className="flex my-3 justify-start  text-textSize7 font-medium text-azulPrimary700 mx-20">
                {physicId
                  ? 'Formatos en excel exclusivos para los servicios IDmobile y Carné en PDF'
                  : 'Añade aquí la información necesaria para las identificaciones físicas'}
              </span>
              <div className="flex my-3 justify-start  text-textSize7 font-medium text-azulPrimary700 mx-20">
                <FilesDragAndDrop
                  file={file}
                  onUpload={onUpload}
                  name={'los archivos'}
                  nameInput="adjunto"
                  validFileFormats={null}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {physicId && !pdf && (
        <div className="container border-2 border-azulPrimary100 shadow-xl rounded-lg w-[288px] md:w-[804px] my-10">
          <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
            <div className="mx-5 flex justify-start items-center gap-3 md:gap-5 ">
              <div className="md:hidden flex">
                <Image src={ojoM} alt="" className="" />
              </div>
              <div className="hidden md:flex">
                <Image src={ojo} alt="" className="" />
              </div>
              <span className="text-textSize6 md:text-textSize4  text-azulPrimary700">
                Observaciones
              </span>
            </div>
          </div>
          <div className="h-[320px]">
            <span className="flex my-5  text-center md:mx-16 w-[290px] md:w-[804px]  text-textSize7 md:text-textSize6">
              Deja tus observaciones o aclaraciones necesarias en esta sección
            </span>
            <textarea
              id="message"
              name="observacion"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setObservation(e.target.value)
              }
              rows={10}
              className="block resize-none p-2.5 mx-auto w-[252px] md:w-[670px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Agregar Observación (Opcional)..."
            ></textarea>
          </div>
        </div>
      )}
      {pdf && (
        <div className="container border-2 border-azulPrimary100 shadow-xl rounded-lg w-[288px] md:w-[804px] my-10">
          <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
            <div className="mx-5 flex justify-start items-center gap-3 md:gap-5 ">
              <div className="md:hidden flex">
                <Image src={ojoM} alt="" className="" />
              </div>
              <div className="hidden md:flex">
                <Image src={ojo} alt="" className="" />
              </div>
              <span className="text-textSize6 md:text-textSize4  text-azulPrimary700">
                Observaciones
              </span>
            </div>
          </div>
          <div className="h-[320px]">
            <span className="flex my-5  text-center md:mx-16 w-[290px] md:w-[804px]  text-textSize7 md:text-textSize6">
              Deja tus observaciones o aclaraciones necesarias en esta sección
            </span>
            <textarea
              id="message"
              name="observacion"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setObservation(e.target.value)
              }
              rows={10}
              className="block resize-none p-2.5 mx-auto w-[252px] md:w-[670px] text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Agregar Observación (Opcional)..."
            ></textarea>
          </div>
        </div>
      )}
      <div className="my-5 flex justify-center md:justify-end gap-3 w-[288px] md:w-[804px] items-center">
        {loading ? (
          <div className="w-[100px] bg-azulPrimary900 rounded h-[45px]">
            <div className="flex w-fit mx-auto py-3">
              <BeatLoader color={'white'} size={15} />
            </div>
          </div>
        ) : (
          <>
            <div className="w-[130px]">
              <Button
                label={'Cancelar'}
                className={'w-[130px] bg-azulPrimary700 rounded h-[45px]'}
                action={() =>
                  router.push('/empresas/orders', undefined, { shallow: true })
                }
                flag={2}
                index={2}
                icon={cancelar}
              />
            </div>
            {physicId ? buttonCreate : mobileId && buttonCreate}
          </>
        )}
      </div>
      <div className="md:hidden h-5"></div>
    </div>
  )
}

export default NuevaOrden
