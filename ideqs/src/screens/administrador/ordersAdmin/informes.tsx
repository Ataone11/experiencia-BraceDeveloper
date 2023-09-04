import Input from '../../../components/inputs/Input'
import SelectInput from '../../../components/inputs/SelectInput'
import Button from '../../../components/buttons/Button'

const Informes = ({ setMenu }: { setMenu: (e: number) => void }) => {
  return (
    <div className="mx-auto w-full">
      <span className="text-textSize2 font-extrabold text-azulPrimary900">
        INFORME
      </span>
      <section className="grid gap-[15px] md:grid-cols-2">
        <SelectInput label="Empresa:" />
        <SelectInput label="Estado:" />
        <Input label="Nº Orden:" type="text" />
        <SelectInput label="Sucursal:" />
        <SelectInput label="Usuarios:" />
        <section className="grid gap-[15px] md:grid-flow-col">
          <Input label="Fecha inicio:" type="date" />
          <Input label="Fecha fin:" type="date" />
        </section>
      </section>

      <div className="mt-[15px] md:flex md:justify-end">
        <section className="md:w-[200px]">
          <Button onClick={() => setMenu(5)}>Generar informe</Button>
        </section>
      </div>
    </div>
  )
}

export default Informes
