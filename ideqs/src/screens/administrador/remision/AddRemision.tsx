import React, {CSSProperties, Dispatch, SetStateAction, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Search from '../../../assets/administrador/remision/Search'
import Button from '../../../components/buttons/Button'
import Input from '../../../components/inputs/Input'
import SelectInput from '../../../components/inputs/SelectInput'
import {
  getDataClient,
  getSucursalesClient
} from '../../../redux/actions/adminUserActions'
import {
  getOrdersForRemission
} from '../../../redux/actions/remisionActions'
import { getSucursales } from '../../../redux/reducers/adminUserReducer'
import { getClients } from '../../../redux/reducers/adminUsersReducer'
import { screensRemisiones } from '../../../utils/constants'
import {BeatLoader} from "react-spinners";
export interface filtrosRemisionesModel {
  orden?: number | any
  nombreEmpresa?: string
  nombreSucursal?: string
  startDate?: string
  finalDate?: string
  page: number
}

export default function AddRemision({
  setHandleScreen
}: {
  setHandleScreen: Dispatch<SetStateAction<string>>
}) {
  const clientsList = useSelector(getClients)
  const [idClient, setIdClient] = useState(clientsList ? clientsList[0].id : '')
  const sucursales = useSelector((state) =>
    getSucursales(state, idClient as number)
  )
  const [dataRemision, setDataRemision] = useState<filtrosRemisionesModel>({
    page: 1
  })
  const [disabled, setDisabled] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getDataClient(dispatch)
  }, [])

  useEffect(() => {
    getSucursalesClient(idClient as number, dispatch)
  }, [idClient])

  const clients = clientsList?.map((user) => {
    return {
      value: user.id,
      label: user.nombre
    }
  })

  const sucursalesMock = sucursales?.map((sucursal) => {
    return {
      value: sucursal.id,
      label: sucursal.nombre
    }
  })

  const [loader, setLoader] = useState(false)
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  const handleOnSubmit = async (e: any) => {
    e.preventDefault()

    setLoader(true)

    if (
      dataRemision.nombreEmpresa === 'Seleccione' ||
      !dataRemision.nombreEmpresa
    ) {
      toast.error('Selecciona un cliente')
      return
    }

    const remisions = await getOrdersForRemission({
      dispatch,
      body: dataRemision
    })

    if (!remisions) {
      toast.error('No hay órdenes con esos datos')
      return
    }

    setHandleScreen(screensRemisiones.ADD)
    return remisions
  }

  return (
    <form
      className="grid gap-[14px] md:gap-[24px] xl:w-[60%]"
      onSubmit={handleOnSubmit}
    >
      <p className="text-textSize7 lg:text-textSize6 font-bold">
        Para comenzar busca la órdenes que vas a remisionar.
      </p>

      <SelectInput
        defaultValue="nombreEmpresa"
        label="Selecciona el cliente*"
        name="nombreEmpresa"
        required
        options={clients as any[]}
        onChange={(e) => {
          setDataRemision({
            ...dataRemision,
            nombreEmpresa: e.target.options[e.target.selectedIndex].text
          })
          setIdClient(e.target.value)
          setDisabled(false)
        }}
      />
      <SelectInput
        defaultValue="nombreSucursal"
        label="Sucursales del cliente"
        disabled={disabled}
        name="nombreSucursal"
        options={sucursalesMock as any[]}
        onChange={(e) =>
          setDataRemision({
            ...dataRemision,
            nombreSucursal: e.target.options[e.target.selectedIndex].text
          })
        }
      />
      <Input
        label="Número de orden"
        type="number"
        name="orden"
        placeholder="Número de orden"
        onChange={(e) =>
          setDataRemision({ ...dataRemision, orden: e.target.value })
        }
      />
      <p className="font-bold text-azulPrimary700 text-textSize7 lg:text-textSize6">
        Rango de fecha de creación de las órdenes
      </p>
      <section className="grid gap-[14px] md:gap-[24px] md:grid-flow-col">
        <Input
          label="Fecha inicio"
          name="startDate"
          type="date"
          onChange={(e) =>
            setDataRemision({ ...dataRemision, startDate: e.target.value })
          }
        />
        <Input
          label="Fecha final"
          name="finalDate"
          type="date"
          onChange={(e) =>
            setDataRemision({ ...dataRemision, finalDate: e.target.value })
          }
        />
      </section>
      <div className="md:w-[150px]">
        {loader ?
            <div className="flex w-[114.5px] h-[50px] justify-center items-center">
              <BeatLoader
                  color="#2490D3"
                  loading={loader}
                  cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
              />
            </div>:
            <Button type="submit">
              {
                <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
              Buscar
              <Search />
            </span>
              }
            </Button>
        }
      </div>
    </form>
  )
}
