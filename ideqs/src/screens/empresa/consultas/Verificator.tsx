import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Search from '../../../assets/administrador/remision/Search'
import Button from '../../../components/buttons/Button'
import Input from '../../../components/inputs/Input'
import RadioButton from '../../../components/inputs/RadioButton'
import SelectInput from '../../../components/inputs/SelectInput'
import {
  getSucursalesByIDUser,
  getUserByIDClient
} from '../../../redux/actions/orderAdminActions'
import { selectUser } from '../../../redux/reducers/authReducer'

const ESTADOS = {
  Pendiente: 1,
  Aceptadas: 2,
  Impresas: 3,
  Finalizadas: 4,
  Anuladas: 5
}

export default function Verificator({
  setFiltros,
  callService
}: {
  setFiltros: any
  callService: any
}) {
  const user = useSelector(selectUser)

  const [isCheck, setIsCheck] = useState({
    usuario: true,
    sucursal: false
  })

  const [dataSelect, setDataSelect] = useState([])

  const statusSelect = [
    {
      value: ESTADOS.Pendiente,
      label: 'Pendiente'
    },
    {
      value: ESTADOS.Aceptadas,
      label: 'Aceptadas'
    },
    {
      value: ESTADOS.Impresas,
      label: 'Impresas'
    },
    {
      value: ESTADOS.Finalizadas,
      label: 'Finalizadas'
    },
    {
      value: ESTADOS.Anuladas,
      label: 'Anuladas'
    }
  ]

  const loadDataSelect = async () => {
    if (!user?.idCliente) return

    if (isCheck.sucursal) {
      const data = await getSucursalesByIDUser(user?.idCliente)
      const mockSelect = data.map((item: any) => ({
        value: item.id,
        label: item.nombre
      }))
      setDataSelect(mockSelect)
      return
    }

    if (isCheck.usuario) {
      const data = await getUserByIDClient(user?.idCliente)
      const mockSelect = data.map((item: any) => ({
        value: item.id,
        label: item.name
      }))
      setDataSelect(mockSelect)
    }
  }

  const handleSelect = (event: any) => {
    if (isCheck.sucursal) {
      setFiltros((oldData: any) => ({
        ...oldData,
        nombreSucursal: event.target.options[event.target.selectedIndex].text
      }))
      return
    }

    if (isCheck.usuario) {
      setFiltros((oldData: any) => ({
        ...oldData,
        nombreUsuario: event.target.options[event.target.selectedIndex].text
      }))
    }
  }

  useEffect(() => {
    loadDataSelect()
  }, [isCheck])

  return (
    <form className="grid gap-[15px] md:grid-cols-3" onSubmit={callService}>
      <Input
        name="identificacion"
        placeholder="Identificación"
        type="number"
        label="Nº Identificación"
        onChange={(e) =>
          setFiltros((oldData: any) => ({
            ...oldData,
            identificacion: e.target.value
          }))
        }
      />
      <Input
        name="poliza"
        placeholder="Póliza"
        type="number"
        label="Nº Póliza"
        onChange={(e) =>
          setFiltros((oldData: any) => ({
            ...oldData,
            poliza: e.target.value
          }))
        }
      />
      <Input
        name="orden"
        placeholder="Orden"
        label="Nº Orden"
        type="number"
        onChange={(e) =>
          setFiltros((oldData: any) => ({
            ...oldData,
            orden: e.target.value
          }))
        }
      />
      <div className="md:col-span-2">
        <section className="flex gap-[60px]">
          <RadioButton
            label="Usuario"
            checked={isCheck.usuario}
            onClick={() => setIsCheck({ usuario: true, sucursal: false })}
          />
          <RadioButton
            label="Sucursal"
            checked={isCheck.sucursal}
            onClick={() => setIsCheck({ usuario: false, sucursal: true })}
          />
        </section>
        <SelectInput
          withoutLabel={false}
          options={dataSelect as any[]}
          onChange={handleSelect}
        />
      </div>
      <SelectInput
        label="Estado"
        options={statusSelect as any[]}
        onChange={(e) =>
          setFiltros((oldData: any) => ({
            ...oldData,
            estado: e.target.value
          }))
        }
      />
      <p className="font-bold text-azulPrimary700 text-textSize7 md:text-textSize6 md:col-span-3">
        Rango de fecha de la creación de la remisión
      </p>
      <Input
        type="date"
        label="Fecha inicio"
        onChange={(e) =>
          setFiltros((oldData: any) => ({
            ...oldData,
            startDate: e.target.value
          }))
        }
      />
      <Input
        type="date"
        label="Fecha final"
        onChange={(e) =>
          setFiltros((oldData: any) => ({
            ...oldData,
            finalDate: e.target.value
          }))
        }
      />
      <p className="font-bold text-azulPrimary700 text-textSize7 md:text-textSize6 md:row-start-5 md:col-span-3">
        Rango de fecha de la caducidad de la remisión
      </p>
      <section className="md:row-start-6">
        <Input type="date" label="Fecha inicio" />
      </section>
      <section className="md:row-start-6">
        <Input type="date" label="Fecha final" />
      </section>
      <section className="md:row-start-7 md:w-[120px]">
        <Button type="submit">
          {
            <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
              Buscar
              <Search />
            </span>
          }
        </Button>
      </section>
    </form>
  )
}
