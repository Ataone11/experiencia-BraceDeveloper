import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataUsers } from '../../../redux/actions/adminUsersActions'
import InvertButton from '../../../components/buttons/buttonPrimaryInvert'
import Field, { TypeFields } from './Fields'
import { cargarPlantilla } from '../../../redux/actions/adminUserActions'
import readXlsxFile from 'read-excel-file'
import { useRouter } from 'next/router'
import { selectUser } from '../../../redux/reducers/authReducer'
import { getCamposState } from '../../../redux/reducers/camposReducer'
import { getCampos } from '../../../redux/actions/camposAction'
import { OK } from '../../../utils/constants'
import { toast } from 'react-toastify'
import { DataParams } from './cargarPlantilla'
import { toBase64 } from '../../../utils/base64'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getFormats } from '../../../redux/actions/formatAdminActions'
import { validUrl } from '../../../utils/validUrl'
export type CamposPlantilla = {
  nombreCampoExcel: string
  orden: number
  nombreCampoPlantilla: string
  obligatorio: number
}

interface Params {
  params: DataParams
  finish: () => void
}

const CargarExcel = ({ params, finish }: Params) => {
  const { idUser } = useRouter().query
  const user = useSelector(selectUser)
  const router = useRouter()
  const [fields, setFields] = useState<TypeFields[]>([
    {
      name: `field-${0}`,
      value: '',
      field: '',
      required: false
    }
  ])
  const [sending, setSending] = useState<boolean>(false)

  const readExcel = async () => {
    if (params.excel) {
      readXlsxFile(params.excel).then((rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        if (rows.length) {
          const dataFields = rows[0].map((item, i) => {
            return {
              name: `field-${i}`,
              value: item.toString(),
              field: '',
              required: false
            }
          })
          setFields(dataFields)
        }
      })
    }
  }

  const loadFiles = async () => {
    try {
      if (
        !params.jasper ||
        !params.diseno ||
        !params.caraA ||
        !params.caraB ||
        !params.excel
      ) {
        toast.error('Debe cargar todos los archivos para continuar')
        return null
      }

      const jasper = await toBase64(params.jasper)
      const diseno = await toBase64(params.diseno)
      const caraA = await toBase64(params.caraA)
      const caraB = await toBase64(params.caraB)
      const excel = await toBase64(params.excel)

      return {
        jasper: (jasper ?? '').toString().replace(/^data:(.*,)?/, ''),
        diseno: (diseno ?? '').toString().replace(/^data:(.*,)?/, ''),
        caraA: (caraA ?? '').toString().replace(/^data:(.*,)?/, ''),
        caraB: (caraB ?? '').toString().replace(/^data:(.*,)?/, ''),
        excel: (excel ?? '').toString().replace(/^data:(.*,)?/, '')
      }
    } catch (error) {
      toast.error('Hubo un error al cargar los archivos')
      return null
    }
  }

  const crearExcel = async () => {
    if (!params.nombrePlantilla) {
      toast.error('Debe agregar un nombre a la plantilla')
      return
    }

    const files = await loadFiles()

    if (!files) return

    let errorFields = false

    const finalCampos = fields.map((field, i) => {
      if (!field.value || !field.field) {
        errorFields = true
      }
      return {
        nombreCampoExcel: field.value,
        orden: i + 1,
        nombreCampoPlantilla: field.field,
        obligatorio: field.required ? 1 : 0
      }
    })

    if (errorFields) {
      toast.error('Debe completar todos los datos de los campos')
      return
    }
    const finalData = {
      jasper: files.jasper,
      excel: files.excel,
      diseno: files.diseno,
      caraA: files.caraA,
      caraB: files.caraB,
      nombrePlantilla: params.nombrePlantilla,
      idCliente: parseInt((idUser ?? '').toString()),
      tipo: params.tipo,
      user: user?.user,
      fecha: params.fecha,
      campos: finalCampos
    }
    setSending(true)
    toast.loading('Creando plantilla')
    const response = await cargarPlantilla(finalData)
    getFormats(dispatch, Number(idUser))
    toast.dismiss()
    if (response === OK) {
      toast.success('Plantilla creada correctamente.')
      finish()
      router.replace(`/${validUrl(user?.rol)}/empresas`, undefined, {
        shallow: true
      })
    } else {
      setSending(false)
      toast.error('Hubo un error al crear la plantilla.')
    }
  }
  const dispatch = useDispatch()

  const campos = useSelector(getCamposState)

  useEffect(() => {
    if (!campos) {
      getCampos(dispatch)
    }
  }, [campos])

  useEffect(() => {
    getDataUsers(dispatch)
  }, [])

  useEffect(() => {
    readExcel()
  }, [params.excel])
  const remove = (name: string) => {
    const newFields = fields.filter((field) => field.name !== name)
    setFields(newFields)
  }

  const handleDragAndDrop = (dragIndex: number, hoverIndex: number) => {
    const dragItem = fields[dragIndex]

    if (dragItem) {
      const state = [...fields]
      const prevTip = state.splice(hoverIndex, 1, dragItem)
      state.splice(dragIndex, 1, prevTip[0])
      setFields(
        state.map((field, index) => ({ ...field, name: `field-${index}` }))
      )
    }
  }
  return (
    <div className="w-[90%]">
      <div className="flex pt-3 gap-10  pl-16 font-semibold">
        <span className="w-[200px]">Nombre en formulario</span>
        <span className="w-[200px] pl-2">Campo en plantilla</span>
        <span className="w-[200px] pl-2">Obligatorio</span>
      </div>
      <div className="">
        {fields.map((field: TypeFields, i: number) => {
          return (
            <DndProvider
              backend={HTML5Backend}
              key={`${field.name}-${field.value}`}
            >
              <Field
                key={`${field.name}-${field.value}`}
                field={field}
                handleDragAndDrop={handleDragAndDrop}
                index={i}
                setField={(data) => {
                  const newFields = [...fields]
                  newFields[i] = data
                  setFields(newFields)
                }}
                deletField={() => remove(field.name)}
              />
            </DndProvider>
          )
        })}

        <div className="flex justify-center my-5 gap-5">
          <InvertButton
            label={'Asignar'}
            className={`w-[78px] rounded h-[40px]  ${
              sending ? 'bg-grisNeutral700' : 'bg-azulPrimary700'
            }`}
            action={crearExcel}
            flag={2}
            index={2}
            disable={sending}
          />
          <InvertButton
            label={'Añadir campo'}
            className={'w-[154px] rounded h-[40px] bg-azulPrimary700 '}
            action={() => {
              const size = fields.length
              setFields([
                ...fields,
                {
                  name: `field-${size + 1}`,
                  value: '',
                  field: '',
                  required: false
                }
              ])
            }}
            flag={2}
            index={2}
          />
        </div>
      </div>
    </div>
  )
}

export default CargarExcel
