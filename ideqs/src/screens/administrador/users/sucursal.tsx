import Select from '../../../components/inputs/tiposUsuario'
import Input from '../../../components/inputs/inputTexto'
import Button from '../../../components/buttons/primaryButton'
import check from '../../../assets/administrador/usuarios/check.svg'
import cancel from '../../../assets/administrador/usuarios/cancel.svg'
import { CSSProperties, useState } from 'react'
import { text } from './text/createUser'
import { BeatLoader } from 'react-spinners'
import { UserDataModel } from '../../../models/userDataModel'
import { useSelector } from 'react-redux'
import { getClients } from '../../../redux/reducers/adminUserReducer'
export interface Props {
  title?: string
  id: number
}
const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#086eae'
}
interface Params {
  action?: (e: any) => void
  submit: () => void
  listUsers?: UserDataModel[]
}
export default function Sucursal({ action, submit, listUsers = [] }: Params) {
  const [createLoader] = useState(false)
  const [load, setLoad] = useState(false)
  const clients = useSelector(getClients)
  const enviar = async () => {
    setLoad(true)
    await submit()
    setLoad(false)
  }
  const dataSource = clients
    ? clients.map((client) => {
        return {
          id: client.id,
          title: client.nombre
        }
      })
    : []

  return (
    <div className="lg:grid xl:grid-cols-2 lg:gap-x-[19rem] w-full lg:w-[75%] ">
      <div className="pt-2 lg:pt-0 w-full sm:w-[453px] h-[86px]">
        <Input
          color={'border-azulPrimary700 '}
          name={'name'}
          placeholder={text.name.es}
          label={text.name.es + ':'}
          type={'text'}
          action={action}
          className={
            ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[15px] rounded-[6px]'
          }
        ></Input>
      </div>
      <Select
        name={'idCliente'}
        label={'Empresas a la que perteneces'}
        dataSecure={dataSource}
        action={action}
        className={
          'text-textSize5 w-full sm:w-[453px] h-[40px] md:h-[56px] border-2 rounded-md border-azulPrimary900 '
        }
      />
      <Select
        name={'idUser'}
        label={'Usuario Encargado'}
        action={action}
        dataSecure={listUsers}
        className={
          'text-textSize5 w-[90%] sm:w-[453px] h-[40px] md:h-[56px] border-2 rounded-md border-azulPrimary900 '
        }
      />
      {load ? (
        <div className="w-full  flex lg:justify-end my-5 justify-center">
          <div className="w-[80px]  bg-azulPrimary700  rounded-md  h-10">
            <div className="flex w-fit mx-auto py-3 md:justify-end">
              <BeatLoader color={'white'} size={15} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full  flex  my-5 justify-center">
          <Button
            color={'bg-[#FF6633]'}
            label={text.cancelButton.es}
            type="button"
            className={' h-10 mr-10 justify-between'}
            classNameText={'mr-5 lg:text-[10px] text-[15px] font-bold'}
            icon={cancel}
            link={'/administrador/usuarios'}
          ></Button>
          {createLoader && (
            <div className="flex w-[114.5px] justify-center items-center">
              <BeatLoader
                color="#2490D3"
                loading={createLoader}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}
          {!createLoader && (
            <Button
              color={'bg-azulPrimary700'}
              label={text.createButton.es}
              type="button"
              className={' h-10 justify-between'}
              classNameText={'mr-5 lg:text-[10px] text-[15px] font-bold mx-0'}
              icon={check}
              action={enviar}
            ></Button>
          )}
        </div>
      )}
    </div>
  )
}
