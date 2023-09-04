import Image from 'next/image'
import Inputs from '../../../components/inputs/inputTextoSinIcono'
import Select from '../../../components/inputs/SelectN'
import Check from '../../../components/box/check'
import Delete from '../../../components/box/delete'
import puntos from '../../../assets//administrador/usuarios/manejador/6puntos.svg'
import { useState } from 'react'
export type TypeFields = {
  name: string
  value: string
  field: string
  required: boolean
}
interface Params {
  field: TypeFields
  setField: (data: TypeFields) => void
  deletField: () => void
  index?: number
  handleDragAndDrop: (dragIndex: number, hoverIndex: number) => void
}
const Field = ({ field, setField, deletField }: Params) => {
  const [flag, setFlag] = useState(false)

  const handleChange = (e: any) => {
    setField({
      ...field,
      value: e.target.value
    })
  }
  const handleChangeSelect = (e: any) => {
    setField({
      ...field,
      field: e.target.value
    })
  }
  const handleFlag = () => {
    const actualFlag = flag
    setField({
      ...field,
      required: !actualFlag
    })
    setFlag(!flag)
  }

  return (
    <div className="flex gap-7 pl-5 justify-center">
      <div className="flex">
        <Image src={puntos} alt="" className="" />
        <Inputs
          name={field.name}
          label={''}
          value={field.value}
          textClassName={'text-textSize6'}
          className={' w-[200px] h-[32px] rounded-md mx-2 my-auto'}
          action={handleChange}
          type={'text'}
          placeholder={'Añadir nombre'}
        />
      </div>

      <Select
        name={`select-${field.field}`}
        label={''}
        className={'py-0 w-[200px] h-[32px] rounded-md'}
        action={handleChangeSelect}
        choose={'Añadir campo'}
      />
      <div className="flex ">
        <Check
          button={flag}
          action={handleFlag}
          classname={'w-[86px] h-[32px] '}
        />
        <Delete
          action={deletField}
          button={false}
          classname={'w-[32px] h-[32px] mx-5 '}
        />
      </div>
    </div>
  )
}

export default Field
