import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { ChangeEvent, useState, FormEvent } from 'react'
import { selectUser } from '../../../../src/redux/reducers/authReducer'
import Close from '../../../../src/assets/general/Close'
import Check from '../../../../src/assets/login/Check'
import Button from '../../../../src/components/buttons/Button'
import GoogleMap from '../../../../src/components/GoogleMap'
import Input from '../../../../src/components/inputs/Input'
import { createMapPoint } from '../../../../src/redux/actions/pointsActions'
import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'
import { toast } from 'react-toastify'
import { BeatLoader } from 'react-spinners'
import FilesDragAndDrop from '../../../../src/components/FilesDragAndDrop'

export interface newPoint {
  file: null | File
  name: string
  phone: string
  phone_optional: string
  address: string
}

export default function SedeCreator() {
  const user = useSelector(selectUser)
  const [loading, setLoading] = useState(false)
  const [sede, setSede] = useState<newPoint>({
    file: null,
    name: '',
    phone: '',
    phone_optional: '',
    address: ''
  })
  const router = useRouter()

  const createPoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user && user.idCliente) {
      setLoading(true)
      const result = await createMapPoint(sede, user.idCliente)
      setLoading(false)
      if (result === 'OK') {
        toast.success('Nuevo punto de atención creado')
        router.push('/empresas/puntos', undefined, { shallow: true })
      } else
        toast.error('Hubo un error al tratar de crear el punto de atención')
    }
  }

  return (
    <Layout
      titleSection="CREAR SEDE"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.PUNTOS]}
      titleBasePage="Crear sede"
    >
      <form
        onChange={(e: ChangeEvent<HTMLFormElement>) => {
          if (e.target.type !== 'file') {
            setSede({ ...sede, [e.target.name]: e.target.value })
          }
        }}
        className="flex flex-col md:grid gap-[15px] md:grid-cols-2"
        onSubmit={createPoint}
      >
        <section className="md:col-start-1 md:row-start-1 md:col-span-2">
          <Input
            placeholder="Añadir nombre de sede"
            label="Nombre de sede"
            name="name"
            type="text"
            required
          />
        </section>
        <section className="md:col-start-1 md:row-start-2">
          <Input
            placeholder="Añadir teléfono"
            label="Teléfono"
            name="phone"
            type="number"
            required
          />
        </section>
        <section className="md:col-start-2 md:row-start-2">
          <Input
            placeholder="Añadir teléfono (Opcional)"
            name="phone_optional"
            type="number"
          />
        </section>
        <section className="md:col-start-1 md:row-start-3">
          <Input
            placeholder="Añade dirección"
            label="Dirección"
            name="address"
            type="text"
            required
          />
        </section>
        <section className="md:col-start-2 md:row-start-3">
          <div className="gap-[5px] grid">
            <label htmlFor={'imagen'} className="font-semibold">
              Imagen
            </label>
            <FilesDragAndDrop
              file={sede.file}
              nameInput="file"
              onUpload={(file) => setSede((sede) => ({ ...sede, file }))}
              verification={false}
              name={'la imagen del punto'}
              validFileFormats={['image/*']}
              required={true}
            />
          </div>
        </section>
        <div className="col-span-2">
          <GoogleMap />
        </div>
        <div className="w-full md:w-[300px] mt-[10px] flex flex-col gap-[20px] md:flex-row">
          {loading ? (
            <Button>
              <BeatLoader color={'white'} size={15} />
            </Button>
          ) : (
            <Button type="submit">
              <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
                <Check />
                Guardar
              </span>
            </Button>
          )}
          <Button
            onClick={() =>
              router.push('/empresas/puntos', undefined, { shallow: true })
            }
          >
            <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
              <span className="w-[18px] h-[18px]">
                <Close />
              </span>
              Cancelar
            </span>
          </Button>
        </div>
      </form>
    </Layout>
  )
}
