import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Search from '../../../assets/administrador/remision/Search'
import Button from '../../../components/buttons/Button'
import Input from '../../../components/inputs/Input'
import SelectInput from '../../../components/inputs/SelectInput'
import { getDataClient } from '../../../redux/actions/adminUserActions'
import { getSucursales } from '../../../redux/actions/sucursalesActions'
import { getClients } from '../../../redux/reducers/adminUserReducer'
import { screensRemisiones } from '../../../utils/constants'
export interface filtrosBuscarRemisionesModel {
  remision?: number | any
  nombreCliente?: string
  startDate?: string
  finalDate?: string
  page: number
}

export default function SearchRemision({
  setHandleScreen
}: {
  setHandleScreen: Dispatch<SetStateAction<string>>
}) {
  const clientsList = useSelector(getClients)
  const [idClient, setIdClient] = useState(clientsList ? clientsList[0].id : '')
  const [dataRemision, setDataRemision] =
    useState<filtrosBuscarRemisionesModel>({
      page: 1
    })

  const dispatch = useDispatch()
  useEffect(() => {
    getDataClient(dispatch)
  }, [])
  useEffect(() => {
    getSucursales(dispatch, idClient as number)
  }, [idClient])
  const clients = clientsList?.map((user) => {
    return {
      value: user.id,
      label: user.nombre
    }
  })
  const handleOnSubmit = async (e: any) => {
    e.preventDefault()
    setHandleScreen(screensRemisiones.LIST)
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="grid gap-[14px] md:gap-[24px] xl:w-[60%]"
    >
      <SelectInput
        defaultValue="Usuario"
        label="Selecciona el cliente"
        name={'nombreCliente'}
        onChange={(e) => {
          setDataRemision({
            ...dataRemision,
            nombreCliente: e.target.options[e.target.selectedIndex].text
          })
          setIdClient(e.target.value)
        }}
        options={clients as any[]}
      />

      <Input
        label="Número de remisión"
        placeholder="Número de remisión"
        name={'remision'}
        onChange={(e) =>
          setDataRemision({ ...dataRemision, remision: Number(e.target.value) })
        }
        type="number"
      />
      <p className="font-bold text-azulPrimary700 text-textSize7 lg:text-textSize6">
        Rango de fecha de creación de la remisión
      </p>

      <section className="grid gap-[14px] md:gap-[24px] md:grid-flow-col">
        <Input
          label="Fecha inicio"
          type="date"
          name="startDate"
          onChange={(e) =>
            setDataRemision({ ...dataRemision, startDate: e.target.value })
          }
        />
        <Input
          label="Fecha final"
          type="date"
          name="finalDate"
          onChange={(e) =>
            setDataRemision({ ...dataRemision, finalDate: e.target.value })
          }
        />
      </section>
      <div className="w-[150px]">
        <Button type="submit">
          {
            <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
              Buscar
              <Search />
            </span>
          }
        </Button>
      </div>
    </form>
  )
}
