import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import Upload from '../../../../src/assets/empresa/informacion/Upload'
import Button from '../../../../src/components/buttons/Button'
import FilesDragAndDrop from '../../../../src/components/FilesDragAndDrop'
import Input from '../../../../src/components/inputs/Input'
import { createDocInformation } from '../../../../src/redux/actions/informationActions'
import { selectUser } from '../../../../src/redux/reducers/authReducer'
import Layout from '../../../../src/screens/formatos/Layout'
import { dataSidebar } from '../../../../src/utils/constants'
import { SIDEBAR_ENUM } from '../../../../src/utils/enums'

export default function AddInformation() {
  const [loading, setLoading] = useState(false)
  const [information, setInformation] = useState<{
    file: File | null
    image: File | null
    name: string
  }>({
    file: null,
    image: null,
    name: ''
  })
  const router = useRouter()
  const user = useSelector(selectUser)
  const createInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user && user.idCliente) {
      setLoading(true)
      const result = await createDocInformation(
        information,
        user.idCliente,
        user.name
      )
      setLoading(false)
      if (result === 'OK') {
        toast.success('Nuevo documento creado')
        router.push('/empresas/informacion', undefined, { shallow: true })
      } else toast.error('Hubo un error al tratar de crear el documento')
    }
  }

  function validateInfo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!information.file || !information.image || !information.name) {
      toast.warning('Todos los campos son obligatorios')
    } else {
      createInfo(e).then(null)
    }
  }

  return (
    <Layout
      titleSection="AÑADIR INFORMACIÓN"
      dataSidebar={dataSidebar[SIDEBAR_ENUM.INFORMACION]}
      titleBasePage="Añadir información"
    >
      <form className="grid gap-[20px] lg:w-[350px]" onSubmit={validateInfo}>
        <Input
          name="name"
          type="text"
          defaultValue={information.name}
          placeholder="Añadir un nombre"
          label="Nombre del archivo"
          required={false}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInformation({ ...information, name: e.target.value })
          }
        />
        <FilesDragAndDrop
          file={information.file}
          name="el archivo"
          validFileFormats={['application/pdf']}
          nameInput="file"
          required={false}
          onUpload={(file: File | null) =>
            setInformation((information) => ({ ...information, file }))
          }
        />
        <FilesDragAndDrop
          file={information.image}
          name="la imagen"
          validFileFormats={['image/*']}
          nameInput="image"
          required={false}
          onUpload={(file: File | null) =>
            setInformation((information) => ({ ...information, image: file }))
          }
        />
        <div className="sm:w-1/2">
          {loading ? (
            <Button>
              <BeatLoader color={'white'} size={15} />
            </Button>
          ) : (
            <Button type="submit">
              <span className="flex gap-[10px] justify-center cursor-pointer text-white items-center w-full mx-auto h-[50px] bg-azulPrimary900 rounded-[5px] text-textSize7 font-bold">
                <Upload />
                Guardar archivo
              </span>
            </Button>
          )}
        </div>
      </form>
    </Layout>
  )
}
