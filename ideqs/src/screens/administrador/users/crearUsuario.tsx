import { text } from './text/createUser'
import Select from '../../../components/inputs/selectUser'
import ButtonSec from '../../../components/inputs/inputTexto'
import Button from '../../../components/buttons/primaryButton'
import cancel from '../../../assets/administrador/usuarios/cancel.svg'
import check from '../../../assets/administrador/usuarios/check.svg'
import React, { CSSProperties, useEffect, useState } from 'react'
import InputFile from '../../../components/inputs/inputFile'
import {
  CreateDataUser,
  getClientsData,
  getSucursalesClient
} from '../../../redux/actions/adminUserActions'
import { account } from './text/account'
import { state } from './text/state'
import { useDispatch, useSelector } from 'react-redux'
import { getClients } from '../../../redux/reducers/adminUserReducer'
import SelectSucursales from './inputs/SelectSucursales'
import { BeatLoader } from 'react-spinners'
import { UserDataModel } from '../../../models/userDataModel'
import { toast } from 'react-toastify'

const CreateUser = () => {
  const [classButton, setClassButton] = useState('bg-[#2490D3]')
  const [buttonTriger, setButtonTriger] = useState(true)
  // const [toast, setToast] = useState('')
  const [createLoader, setCreateLoader] = useState(false)
  const [user, setUser] = useState<UserDataModel>({
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

  const clients = useSelector(getClients)
  const dispatch = useDispatch()

  const changeInputs = (event: any) => {
    if (event.target.name === 'rol') {
      setUser({
        rol: parseInt(event.target.value),
        idSucursal: 1
      })
    } else if (event.target.type === 'file') {
      setUser({ ...user, [event.target.name]: event.target.files[0] })
    } else {
      if (event.target.name === 'activo') {
        setUser({ ...user, [event.target.name]: parseInt(event.target.value) })
      } else setUser({ ...user, [event.target.name]: event.target.value })
    }
  }

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

  const createUser = async () => {
    setCreateLoader(true)
    const response = await CreateDataUser(user)

    setCreateLoader(false)

    if (response.statusCode === 200) {
      if (user.rol === 7) {
        getClientsData(dispatch)
      }
      if (user.rol === 8 && user.idCliente) {
        getSucursalesClient(user.idCliente, dispatch)
      }
      toast.success('El usuario fue creado correctamente')
      const form = document?.getElementById('CreateForm') as any
      form.reset()
      setUser({
        rol: 1,
        idSucursal: 1,
        activo: 1,
        pdf: 1,
        physical: 1,
        mobile: 0
      })
    }

    if (response.statusCode === 400)
      toast.error(
        response.idAWS?.error !== undefined
          ? response.idAWS?.error
          : 'El usuario no pudo ser creado'
      )
  }

  const optionsClients = (clients ?? []).map((sucursal) => {
    return {
      value: sucursal.id,
      name: sucursal.nombre
    }
  })

  return (
    <>
      {user?.rol !== undefined && (
        <>
          <form
            id="CreateForm"
            className="lg:grid lg:grid-cols-2 gap-x-8 w-full"
            onChange={changeInputs}
          >
            <div className="lg:pt-6 pt-4 w-full h-full">
              <Select
                name={'rol'}
                label={text.acount.es + ':'}
                choose={'Selecciona'}
                className={
                  ' w-full border border-azulPrimary700 lg:h-12 h-10 text-[13px]'
                }
                options={account}
              ></Select>
            </div>
            <div className="lg:pt-6 pt-4 w-full h-full">
              <ButtonSec
                color={'border-azulPrimary700 '}
                name={'name'}
                placeholder={text.name.es}
                label={text.name.es + ':'}
                type={'text'}
                className={
                  ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                }
              ></ButtonSec>
            </div>
            {user?.rol <= 5 && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <ButtonSec
                  name={'lastname'}
                  placeholder={text.lastName.es}
                  label={text.lastName.es + ':'}
                  type={'text'}
                  className={
                    ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                  }
                ></ButtonSec>
              </div>
            )}
            {(user?.rol <= 5 || user?.rol === 7) && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <ButtonSec
                  name={'correo'}
                  placeholder={'email@domain.com'}
                  label={text.email.es + ':'}
                  type={'text'}
                  className={
                    ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                  }
                ></ButtonSec>
              </div>
            )}
            {(user?.rol <= 5 || user?.rol === 7) && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <ButtonSec
                  name={'identificacion'}
                  placeholder={user?.rol === 7 ? 'NIT' : 'identificacion'}
                  label={user?.rol === 7 ? 'NIT' + ':' : 'Identificación' + ':'}
                  type={'text'}
                  className={
                    ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                  }
                ></ButtonSec>
              </div>
            )}

            {user?.rol === 7 && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <ButtonSec
                  name={'direccion'}
                  placeholder={text.direction.es}
                  label={text.direction.es + ':'}
                  type={'text'}
                  className={
                    ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                  }
                ></ButtonSec>
              </div>
            )}
            {user?.rol === 7 && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <ButtonSec
                  name={'telefono'}
                  placeholder={text.telefono.es}
                  label={text.telefono.es + ':'}
                  type={'text'}
                  className={
                    ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                  }
                ></ButtonSec>
              </div>
            )}

            {user?.rol < 7 && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <Select
                  name={'activo'}
                  options={state}
                  label={text.state.es + ':'}
                  choose={'Selecciona'}
                  className={
                    ' w-full border border-azulPrimary700 lg:h-12  h-10 text-[13px]'
                  }
                ></Select>
              </div>
            )}

            {(user?.rol === 4 || user?.rol === 5 || user?.rol === 8) && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <Select
                  name={'idCliente'}
                  options={optionsClients}
                  label={text.business.es + ':'}
                  choose={'Selecciona'}
                  className={
                    ' w-full border border-azulPrimary700 lg:h-12  h-10 text-[13px]'
                  }
                ></Select>
              </div>
            )}
            {(user?.rol === 4 || user?.rol === 5) && (
              <SelectSucursales id={user.idCliente ?? 1} />
            )}
            {user?.rol <= 5 && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <ButtonSec
                  name={'user'}
                  placeholder={'lina.nieto'}
                  label={'Usuario' + ':'}
                  type={'text'}
                  className={
                    ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                  }
                ></ButtonSec>
              </div>
            )}

            {user?.rol < 7 && (
              <div className="lg:pt-6 pt-4 w-full h-full">
                <ButtonSec
                  name={'password'}
                  placeholder={text.password.es}
                  label={text.password.es + ':'}
                  type={'password'}
                  className={
                    ' w-full border border-azulPrimary700  h-10 lg:h-12 text-[13px] rounded-[6px]'
                  }
                ></ButtonSec>
              </div>
            )}

            {user?.rol === 7 && (
              <div className="lg:w-[80%] w-full lg:pt-6 pt-4">
                <InputFile />
              </div>
            )}
          </form>

          <div className="w-full flex lg:justify-end justify-center">
            <Button
              color={'bg-[#2490D3]'}
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
                color={classButton}
                label={text.createButton.es}
                type="button"
                className={' h-10 justify-between'}
                classNameText={'mr-5 lg:text-[10px] text-[15px] font-bold'}
                icon={check}
                action={createUser}
                disable={buttonTriger}
              ></Button>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default CreateUser
