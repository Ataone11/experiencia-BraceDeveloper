import { text } from './text/createUser'
import Select from '../../../components/inputs/selectUser'
import ButtonSec from '../../../components/inputs/inputTexto'
import Button from '../../../components/buttons/primaryButton'
import cancel from '../../../assets/administrador/usuarios/cancel.svg'
import check from '../../../assets/administrador/usuarios/check.svg'
import React, { CSSProperties, useEffect, useState } from 'react'
import { getClientsData } from '../../../redux/actions/adminUserActions'
import { state } from './text/state'
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from '../../../redux/reducers/adminUserReducer'
import { BeatLoader } from 'react-spinners'
import { UserDataModel } from '../../../models/userDataModel'
interface Params {
  action?: (e: any) => void
  submit: () => void
}
const UserIdqs = ({ action, submit }: Params) => {
  const [, setClassButton] = useState('bg-azulPrimary700')
  const [, setButtonTriger] = useState(false)
  const [createLoader] = useState(false)
  const [load, setLoad] = useState(false)

  const [user] = useState<UserDataModel>({
    rol: 1,
    idSucursal: 1,
    activo: 1,
    pdf: 1,
    physical: 1,
    mobile: 0
  })
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }
  const enviar = async () => {
    setLoad(true)
    await submit()
    setLoad(false)
  }
  const clients = useSelector(getClients)
  const dispatch = useDispatch()

  useEffect(() => {
    const input = document.getElementsByTagName('input')
    const select = document.getElementsByTagName('select')
    setButtonTriger(false)
    setClassButton('bg-[#2490D3]')

    for (let i = 0; i <= input.length - 1; i++) {
      if (input[i].value === '') {
        setClassButton(' bg-[#086EAE] opacity-50')
        setButtonTriger(true)
      }
    }

    for (let i = 0; i <= select.length - 1; i++) {
      if (select[i].value === '') {
        setClassButton(' bg-[#086EAE] opacity-50')
        setButtonTriger(true)
      }
    }
  }, [user])

  useEffect(() => {
    if (user?.rol === 8 || user?.rol === 4 || user?.rol === 5) {
      if (!clients) {
        getClientsData(dispatch)
      }
    }
  }, [user?.rol])

  return (
    <>
      <>
        <form
          id="CreateForm"
          className="lg:grid xl:grid-cols-2 lg:gap-x-[19rem] w-full lg:w-[75%] "
          onChange={action}
        >
          <div className="lg:pt-5 pt-4 w-full sm:w-[453px] h-[86px]">
            <ButtonSec
              color={'border-azulPrimary700 '}
              name={'name'}
              placeholder={text.name.es}
              label={text.name.es + ':'}
              type={'text'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[15px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className=" my-5 w-full sm:w-[453px] h-[56px] ">
            <ButtonSec
              name={'lastname'}
              placeholder={text.lastName.es}
              label={text.lastName.es + ':'}
              type={'text'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[15px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className=" my-5 w-full sm:w-[453px] h-[56px]">
            <ButtonSec
              name={'correo'}
              placeholder={'email@domain.com'}
              label={text.email.es + ':'}
              type={'text'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[15px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className=" my-5 w-full sm:w-[453px] h-[56px]">
            <ButtonSec
              name={'identificacion'}
              placeholder={user?.rol === 7 ? 'NIT' : 'identificacion'}
              label={user?.rol === 7 ? 'NIT' + ':' : 'Identificación' + ':'}
              type={'text'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[15px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className=" my-5 w-full sm:w-[453px] h-[56px]">
            <Select
              name={'activo'}
              options={state}
              label={text.state.es + ':'}
              choose={'Selecciona'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900 lg:h-14  h-10 text-[15px]'
              }
            ></Select>
          </div>

          <div className="my-5 w-full sm:w-[453px] h-[56px] py-[5px]">
            <ButtonSec
              name={'user'}
              placeholder={''}
              label={'Usuario' + ':'}
              type={'text'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900 h-10 lg:h-14 text-[15px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className="my-5 w-full sm:w-[453px] h-[56px]">
            <ButtonSec
              name={'password'}
              placeholder={text.password.es}
              label={text.password.es + ':'}
              type={'password'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[15px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>
        </form>
        {load ? (
          <div className="w-full lg:w-[86%] flex lg:justify-end my-5 justify-center">
            <div className="w-[80px]  bg-azulPrimary700  rounded-md  h-10">
              <div className="flex w-fit mx-auto py-3 md:justify-end">
                <BeatLoader color={'white'} size={15} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full  lg:w-[87%] flex lg:justify-end my-5 justify-center ">
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
                classNameText={'mr-5 lg:text-[10px] text-[15px] font-bold '}
                icon={check}
                action={enviar}
              ></Button>
            )}
          </div>
        )}
      </>
    </>
  )
}

export default UserIdqs
