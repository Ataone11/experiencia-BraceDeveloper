import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import Attach from '../../../assets/administrador/remision/Attach'
import Pdf from '../../../assets/general/Pdf'
import Check from '../../../assets/login/Check'
import Button from '../../../components/buttons/Button'
import Checkbox from '../../../components/inputs/Checkbox'
import { useRouter } from 'next/router'
import Table from '../../general/table/Table'
import {
  getFilters,
  getOrdersRemission
} from '../../../redux/reducers/remisionesReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDataClient,
  getSucursalesClient
} from '../../../redux/actions/adminUserActions'
import { getClients } from '../../../redux/reducers/adminUsersReducer'
import Input from '../../../components/inputs/Input'
import { useFetchPagination } from '../../../hooks/useFetchPagination'
import {
  createNewRemision,
  getOrdersForRemission
} from '../../../redux/actions/remisionActions'
import { selectUser } from '../../../redux/reducers/authReducer'
import FilesDragAndDrop from '../../../components/FilesDragAndDrop'
import { toBase64 } from '../../../utils/base64'
import { screensRemisiones } from '../../../utils/constants'
import { toast } from 'react-toastify'

const headers: any = [
  <Check key={1} />,
  'Nº Orden',
  'Cliente',
  'Tomador',
  'Cantidad',
  'Remisionada',
  'Saldo',
  'Remisionar'
]

export interface ordenes {
  orden?: number
  cantidad?: number
}
export interface newRemision {
  ordenes?: ordenes[]
  adjunto?: string
  cantidad?: number
  telefono?: string
  direccion?: string
  personaContacto?: string
  correo?: string
  mostrarSucursal?: boolean
  usuario?: string
  fecha?: string
}
interface OrderCheckedState {
  [key: string]: boolean
}

export default function NewRemision({
  setHandleScreen
}: {
  setHandleScreen: Dispatch<SetStateAction<string>>
}) {
  const clientsList = useSelector(getClients)
  const ordersR = useSelector(getOrdersRemission)
  const user = useSelector(selectUser)
  const idClient = clientsList ? clientsList[0].id : ''
  const [file, setFile] = useState<File | null>(null)
  const [format, setFormat] = useState(true)
  const [ordersChecked, setOrdersChecked] = useState<OrderCheckedState>({})
  const [newRemision, setNewRemision] = useState<newRemision>({
    usuario: user?.name,
    ordenes: [],
    mostrarSucursal: false,
    cantidad: 0
  })

  const filters = useSelector(getFilters)
  const router = useRouter()
  const dispatch = useDispatch()
  const { paginator, isLoading } = useFetchPagination({
    functionFetcher: getOrdersForRemission,
    params: { dispatch, body: filters }
  })
  const regresar = (e: any) => {
    e.preventDefault()
    setHandleScreen(screensRemisiones.NEW)
  }
  const contentOrders = ordersR?.map((remision: any) => {
    return {
      check: (
        <Checkbox
          onChange={(e: any) => {
            setOrdersChecked({
              ...ordersChecked,
              [remision.id]: e.target.checked
            })
          }}
          name="ordenes"
          id={remision.id}
        />
      ),
      id: remision.id,
      client: 'No está en el servicio',
      tomador: remision.tomador ? remision.tomador : 'Sin tomador',
      quantity: remision.cantidadOrden
        ? remision.cantidadOrden
        : 'Sin cantidad',
      remisionada: remision.cantidadRemision
        ? remision.cantidadRemision
        : 'Sin remisiones',
      saldo: remision.cantidadOrden
        ? remision.cantidadOrden - remision.cantidadRemision < 1
          ? 0
          : remision.cantidadOrden - remision.cantidadRemision
        : '0',
      remisionar: (
        <input
          type="number"
          className="text-center placeholder:text-neutral-300 focus:outline-none border-2 border-neutral-300 w-1/2 mx-auto rounded-[5px] h-[25px] text-textSize7"
          placeholder="0"
          name="cantidad"
          disabled={!ordersChecked[remision.id]}
          id={remision.id}
          min={0}
        />
      )
    }
  })

  const orders = [
    {
      1: [
        { label: 'Nº Orden', value: 69743 },
        { label: 'Cliente', value: 'Liliam Morales Betancour' },
        { label: 'Tomador', value: 'Liceo San Rafael' },
        { label: 'Cantidad', value: 2 },
        { label: 'Saldo', value: 1500 }
      ]
    }
  ]
  const excel = async (file: File) => {
    const newfile64 = await toBase64(file)
    await setNewRemision({
      ...newRemision,
      adjunto: (newfile64 ?? '').toString().replace(/^data:(.*,)?/, '')
    })
  }

  useEffect(() => {
    getDataClient(dispatch)
    if (file) {
      excel(file)
    }
  }, [file])

  useEffect(() => {
    getSucursalesClient(idClient as number, dispatch)
  }, [idClient])
  const hanleC = (e: any) => {
    setNewRemision({
      ...newRemision,
      [e.target.name]: e.target.value
    })
  }
  const hanleChangeBox = (e: any) => {
    if (e.target.type === 'checkbox') {
      setNewRemision({
        ...newRemision,
        mostrarSucursal: e.target.checked
      })
    }
  }

  const handleOnChange = (event: ChangeEvent<HTMLFormElement>) => {
    if (
      event.target.type === 'checkbox' &&
      event.target.name !== 'mostrarSucursal' &&
      event.target.name !== 'ordenes'
    ) {
      setNewRemision({
        ...newRemision,
        [event.target.name]: event.target.id
      })
    } else if (
      event.target.type === 'checkbox' &&
      event.target.name === 'mostrarSucursal'
    ) {
      setNewRemision({
        ...newRemision,
        mostrarSucursal: true
      })
    } else if (event.target.name === 'ordenes') {
      const orden: ordenes = {
        orden: Number(event.target.id),
        cantidad: 0
      }
      if (event.target.checked === true) {
        newRemision.ordenes?.push(orden)
      } else {
        newRemision.ordenes?.forEach((orden, index) => {
          if (orden.orden === Number(event.target.id)) {
            newRemision.ordenes?.splice(index)
          }
        })
      }
    } else if (event.target.name === 'cantidad') {
      newRemision.ordenes?.forEach((orden) => {
        if (orden.orden === Number(event.target.id)) {
          ordersR?.forEach((O: any) => {
            if (Number(event.target.id) === O.id) {
              if (event.target.value <= O.cantidadOrden - O.cantidadRemision) {
                orden.cantidad = event.target.value
                  ? Number(event.target.value)
                  : 0
              } else {
                toast.error('orden sin saldo que redimensionar')
              }
            }
          })
        }
      })
    } else {
      setNewRemision({
        ...newRemision,
        [event.target.name]: event.target.value
      })
    }
    const cantidad = newRemision?.ordenes?.map((orden: any) => orden?.cantidad)
    const sum = cantidad?.reduce((a, b) => a + b, 0)
    setNewRemision({ ...newRemision, cantidad: sum })

  }

  const crear = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
    if (!newRemision.personaContacto) {
      toast.error('Se requiere nombre del Contacto')
      return
    }
    if (!newRemision.correo) {
      toast.error('Se requiere email')
      return
    }
    if (!newRemision.correo) {
      toast.error('Se requiere email')
      return
    } else if (!newRemision.correo.match(pattern)) {
      toast.error('El correo electronico, No es valido!')
      return
    }
    if (!newRemision.telefono) {
      toast.error('Se requiere numero telefonico')
      return
    }
    if (!newRemision.direccion) {
      toast.error('Se requiere Direccion')
      return
    }
    if (newRemision.cantidad === 0) {
      toast.error('Remisione una cantidad para alguna orden')
      return
    }
    const id = await createNewRemision(newRemision)
    if (id?.code === '200') {
      router.push(`/administrador/remisiones/${id?.message}`, undefined, {
        shallow: true
      })
    } else {
      toast.error('No se pudo crear la remision!')
    }
  }

  const onUpload = (file: File | null) => {
    setFile(file)
  }

  return (
    <form className="grid xl:grid-cols-2 gap-[14px] md:gap-[24px]">
      <section className="flex items-center gap-[3%] text-white xl:col-span-2 xl:w-full">
        <button
          onClick={() => setFormat(true)}
          type="button"
          className={`h-[32px] lg:h-[44px] w-auto px-10 rounded-[10px] text-textSize7 font-bold ${
            !format
              ? 'bg-transparent text-neutral-400 border-2 border-neutral-300'
              : 'border-2 bg-azulPrimary900 text-white border-transparent'
          }`}
        >
          <span className="flex gap-[10px] items-center w-fit mx-auto after:content-['APP'] md:after:content-['Formato_de_APP']">
            <Pdf />
          </span>
        </button>
        <button
          onClick={() => setFormat(false)}
          type="button"
          className={`h-[32px] lg:h-[44px] w-auto px-10 rounded-[10px] text-textSize7 font-bold ${
            format
              ? 'bg-gray-100 text-neutral-400 border-2 border-neutral-300'
              : 'border-2 bg-azulPrimary900 text-white border-transparent'
          }`}
        >
          <span className="flex gap-[10px] items-center w-fit mx-auto after:content-['Adjuntos'] md:after:content-['Formato_y_adjuntos']">
            <Attach />
          </span>
        </button>
        <div>
          <Button
            onClick={regresar}
            className={
              'h-[40px] bg-azulPrimary700 px-4 ml-2 text-white w-full rounded-lg text-textSize7 font-bold'
            }
          >
            Editar búsqueda
          </Button>
        </div>
      </section>

      <Input
        label="Entregar a:"
        name="personaContacto"
        type="text"
        onChange={hanleC}
        placeholder="Nombre de la persona que recibe"
      />
      <Input
        label="Dirección:"
        name="direccion"
        type="text"
        onChange={hanleC}
        placeholder="Dirección de la persona que recibe"
      />
      <Input
        label="Correo:"
        name="correo"
        id={'email'}
        type="email"
        onChange={hanleC}
        placeholder="Correo de la persona que recibe"
      />
      <Input
        name="telefono"
        label="Teléfono:"
        type="tel"
        onChange={hanleC}
        placeholder="Teléfono de la persona que recibe"
      />

      <p className="font-bold text-neutral-900 text-textSize7 xl:col-span-2 md:text-textSize6">
        Selecciona una o varias órdenes
      </p>
      {ordersR && (
        <form
          onChange={handleOnChange}
          className="container w-[320px] xl:w-full xl:col-span-2 mx-auto sm:w-[640px]"
        >
          <Table
            title={headers}
            list={contentOrders}
            bgRow="bg-[#D9D9D9]/30"
            totalPage={1}
            functionPagination={paginator}
            isLoading={isLoading}
          />
        </form>
      )}

      <section className="gap-[14px] hidden xl:flex xl:gap-[10px] xl:col-span-2 w-full">
        <p className="font-bold text-neutral-900 text-textSize7 xl:text-textSize6 xl:w-[190px]">
          Columnas adicionales:
        </p>
        <section
          onChange={hanleChangeBox}
          className="flex flex-col gap-[14px] xl:flex-row xl:gap-[50px]"
        >
          <Checkbox label="Sucursal/Agencia" name="mostrarSucursal" />
        </section>
      </section>
      {!format && (
        <div className=" w-fit">
          <span className="font-semibold">Archivos adjuntos aqui:</span>
          {
            <FilesDragAndDrop
              file={file}
              onUpload={onUpload}
              name={'Los Archivos'}
              nameInput={'adjunto'}
              validFileFormats={[
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
                'image/bmp',
                'image/jpeg',
                'image/x-png',
                'image/png',
                'image/gif'
              ]}
            />
          }
        </div>
      )}
      <article className=" border-2 border-neutral-300 rounded-[10px] hidden">
        {Object.entries(orders[0]).map(([key, value]) => (
          <React.Fragment key={key}>
            {value.map((item) => (
              <>
                <p
                  className={`font-bold text-textSize7 bg-azulPrimary300 text-center text-azulPrimary900 first:rounded-tl-[10px] orders-list py-[4px]`}
                >
                  {item.label}
                </p>
                <p
                  className={`text-textSize7 rounded-r-[10px] text-center py-[4px] first:rounded-tr-[10px] text-ellipsis whitespace-nowrap overflow-hidden px-[15px]`}
                >
                  {item.value}
                </p>
              </>
            ))}
          </React.Fragment>
        ))}

        <p
          className={`font-bold text-textSize7 bg-azulPrimary300 text-center text-azulPrimary900 first:rounded-tl-[10px] orders-list py-[4px]`}
        >
          Remisionar
        </p>
        <input
          type="number"
          className="text-center placeholder:text-neutral-300 focus:outline-none border-2 border-neutral-300 w-1/2 mx-auto rounded-[5px] h-[25px] text-textSize7"
          placeholder="0"
          min={0}
        />
      </article>

      <button
        onClick={(e: any) => crear(e)}
        className="md:w-[150px] xl:col-start-2 xl:place-self-end"
      >
        <Button type="submit">Generar remisión</Button>
      </button>
    </form>
  )
}
