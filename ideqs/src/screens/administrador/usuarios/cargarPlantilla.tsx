import Image from 'next/image'
import { useEffect, useState } from 'react'
import iden from '../../../assets//administrador/usuarios/manejador/identificación.svg'
import { useDispatch } from 'react-redux'
import { getDataUsers } from '../../../redux/actions/adminUsersActions'
import InputsA from '../../../components/inputs/inputTextoAlternativo'
import InvertButton from '../../../components/buttons/buttonPrimaryInvert'
import { CamposPlantilla } from './cargarExcel'
import CargarExcel from '../../../screens/administrador/usuarios/cargarExcel'
import FilesDragAndDrop from '../../../components/FilesDragAndDrop'

export interface DataParams {
  jasper: File | null
  excel: File | null
  diseno: File | null
  caraA: File | null
  caraB: File | null
  nombrePlantilla: string
  tipo: string
  fecha: string
  campos: CamposPlantilla[]
  base64: {
    jasper: string
    diseno: string
    caraA: string
    caraB: string
    excel: string
  }
}

const Cargar = () => {
  const [plantilla, setPlantilla] = useState<DataParams>({
    jasper: null,
    excel: null,
    diseno: null,
    caraA: null,
    caraB: null,
    nombrePlantilla: '',
    tipo: 'PDF',
    fecha: '2022-12-07 11:34:38',
    campos: [],
    base64: {
      jasper: '',
      diseno: '',
      caraA: '',
      caraB: '',
      excel: ''
    }
  })
  const [manejador, setManejador] = useState(false)
  const [cargar, setCargar] = useState(true)
  const dispatch = useDispatch()

  const handleChange = (e: any) => {
    setPlantilla({ ...plantilla, [e.target.name]: e.target.value })

    if (plantilla.nombrePlantilla) {
      setCargar(false)
    }
  }

  useEffect(() => {
    getDataUsers(dispatch)
  }, [dispatch])

  const finish = () => {
    setPlantilla({
      jasper: null,
      excel: null,
      diseno: null,
      caraA: null,
      caraB: null,
      nombrePlantilla: '',
      tipo: 'PDF',
      fecha: '2022-12-07 11:34:38',
      campos: [],
      base64: {
        jasper: '',
        diseno: '',
        caraA: '',
        caraB: '',
        excel: ''
      }
    })
    setManejador(false)
    setCargar(false)
  }

  return (
    <div>
      <div className="container   w-[90%]">
        <div className="container border-2 border-azulPrimary100 shadow-xl rounded-lg w-[805px] my-10">
          <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
            <div className="mx-7 flex justify-start items-center gap-5">
              <Image src={iden} alt="" className="" />
              <span className="text-textSize4  text-azulPrimary700">
                Cargar plantilla
              </span>
            </div>
          </div>
          <div className="min-h-[450px]">
            <div className="flex  justify-center pt-10 w-full px-[5%] md:px-[7%] lg:px-[9%]">
              <InputsA
                name={'nombrePlantilla'}
                label={'Nombre de plantilla'}
                textClassName={'text-textSize6'}
                className={' w-full  rounded-md border-2 border-azulPrimary900'}
                action={handleChange}
                type={'text'}
                placeholder={'Nombre'}
              />
            </div>
            <div className="flex gap-5 justify-center font-semibold my-5">
              <div className=" max-w-[319px]">
                <span className="flex flex-col my-2">Adjuntar plantilla:</span>
                <FilesDragAndDrop
                  file={plantilla?.jasper}
                  nameInput="jasper"
                  onUpload={(file) =>
                    setPlantilla((plantilla) => ({
                      ...plantilla,
                      jasper: file
                    }))
                  }
                  verification={false}
                  name={'una plantilla'}
                  validFileExtensions={['jasper']}
                  validFileFormats={null}
                />
              </div>
              <div className="max-w-[319px]">
                <span className="flex flex-col my-2">Adjuntar arte:</span>
                <FilesDragAndDrop
                  file={plantilla?.diseno}
                  nameInput="diseno"
                  verification={false}
                  onUpload={(file) =>
                    setPlantilla((plantilla) => ({
                      ...plantilla,
                      diseno: file
                    }))
                  }
                  name={'un diseño'}
                  validFileFormats={['image/*']}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-center font-semibold my-5">
              <div className="max-w-[319px]">
                <span className="flex flex-col my-2">Adjuntar Cara A:</span>
                <FilesDragAndDrop
                  file={plantilla?.caraA}
                  nameInput="caraA"
                  onUpload={(file) =>
                    setPlantilla((plantilla) => ({ ...plantilla, caraA: file }))
                  }
                  verification={false}
                  name={'la cara A'}
                  validFileFormats={['image/*']}
                />
              </div>
              <div className="max-w-[319px]">
                <span className="flex flex-col my-2">Adjuntar Cara B:</span>
                <FilesDragAndDrop
                  file={plantilla?.caraB}
                  nameInput="caraB"
                  verification={false}
                  onUpload={(file) =>
                    setPlantilla((plantilla) => ({ ...plantilla, caraB: file }))
                  }
                  name={'la cara B'}
                  validFileFormats={['image/*']}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-center font-semibold mb-10">
              <div className="max-w-[319px]">
                <span className="flex flex-col my-2">Adjuntar Excel:</span>
                <FilesDragAndDrop
                  file={plantilla?.excel}
                  verification={false}
                  nameInput="excel"
                  onUpload={(file) =>
                    setPlantilla((plantilla) => ({ ...plantilla, excel: file }))
                  }
                  name={'el formato excel'}
                  validFileFormats={[
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-excel'
                  ]}
                />
              </div>
            </div>
            {manejador && (
              <div className="flex justify-center my-7">
                <InvertButton
                  label={'Cargar'}
                  className={
                    'w-[72px] rounded-md h-[36px] bg-azulPrimary700 mx-auto '
                  }
                  action={() => null}
                  flag={2}
                  index={2}
                  disable={cargar}
                />
              </div>
            )}
            <div className="pl-10 my-5">
              {!manejador && plantilla && plantilla.excel && (
                <CargarExcel params={plantilla} finish={finish} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cargar
