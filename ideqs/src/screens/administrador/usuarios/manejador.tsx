import Image from 'next/image'
import { useEffect } from 'react'
import iden from '../../../assets//administrador/usuarios/manejador/servicios.svg'
import InvertButton from '../../../components/buttons/buttonPrimaryInvert'
import { useDispatch, useSelector } from 'react-redux'
import { getDataUsers } from '../../../redux/actions/adminUsersActions'
import { selectUser } from '../../../redux/reducers/authReducer'
import { getFormatsSelector } from '../../../redux/reducers/formatAdminReducer'
import {
  ActivarFormatos,
  getFormats
} from '../../../redux/actions/formatAdminActions'
import { Template } from '../../../models/templateModel'
import { useRouter } from 'next/router'
import DataFormatManejador from './DataFormatManejador'

const Manejador = ({ action }: { action: () => void }) => {
  const user = useSelector(selectUser)
  const formats = useSelector(getFormatsSelector)
  const dispatch = useDispatch()
  const router = useRouter()
  const idClient = parseInt(`${router.query.idUser}`)
  useEffect(() => {
    if (user && router && router.query && router.query.idUser) {
      getFormats(dispatch, idClient)
    }
  }, [])
  useEffect(() => {
    getDataUsers(dispatch)
  }, [dispatch])

  const handleChange = async (e: any, idformat: number) => {
    // To Do: Agregar el cargando en lo que se llama el servicio
    await ActivarFormatos(dispatch, idformat, e.target.value)
  }

  return (
    <div className="container w-[90%]">
      <div className="container border-2 border-azulPrimary100 shadow-xl rounded-lg w-[805px]">
        <div className="h-[60px] bg-[#F6FAFF] items-center flex ">
          <div className="mx-7 flex justify-start items-center gap-5">
            <Image src={iden} alt="" className="" />
            <span className="text-textSize4  text-azulPrimary700">Diseños</span>
          </div>
        </div>

        <div className="min-h-[100px]">
          <ul className="flex flex-col gap-[15px]">
            {formats &&
              formats.map((format: Template) => (
                <div className="flex flex-col pt-5  my-4" key={format.id}>
                  <DataFormatManejador
                    key={format.id}
                    format={format}
                    onchange={handleChange}
                  />
                </div>
              ))}
          </ul>
          <div className=" flex justify-center my-5 mx-auto gap-5">
            <InvertButton
              disable={false}
              className={
                'w-[137px] h-[36px] text-textSize5  text-center bg-azulPrimary700 rounded-md'
              }
              label={'Añadir formatos'}
              classNameText={'text-textSize7 font-bold'}
              action={action}
              flag={1}
              index={1}
            />
          </div>
        </div>
      </div>
      <div className="mb-[100px]"></div>
    </div>
  )
}

export default Manejador
