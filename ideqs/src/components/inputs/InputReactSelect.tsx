import Select from 'react-select'

export interface DataSelect {
  label: any
  value: string
  value2: any
}

interface Params {
  name: string | undefined
  options?: DataSelect[]
  nameOptions?: any
  label: string
  action?: (e: any) => void
  className?: string | null
  choose?: string | null | any
  value?: number | string
  create?: boolean
}

const InputReactSelect = ({
  name,
  label,
  action,
  className = 'w-[277px] md:w-[568px]',
  options
}: Params): any => {
  return (
    <label className="base-text input-field flex flex-col">
      {label && <span>{label}</span>}
      <div
        className={`${className} rounded-md h-[56px] border-2 border-azulPrimary700`}
      >
        <Select
          styles={{
            control: (base) => ({
              ...base,
              border: `4`,
              width: `full`,
              height: `52px`
            })
          }}
          name={name ?? ''}
          options={options}
          onChange={action}
        />
      </div>
    </label>
  )
}

export default InputReactSelect
