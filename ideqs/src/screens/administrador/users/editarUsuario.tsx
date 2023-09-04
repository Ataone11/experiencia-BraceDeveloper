import { text } from './text/editUser'
import Select from '../../../components/inputs/selectUser'
import ButtonSec from '../../../components/inputs/inputTexto'
import Button from '../../../components/buttons/primaryButton'
import cancel from '../../../assets/administrador/usuarios/cancel.svg'
import check from '../../../assets/administrador/usuarios/check.svg'
import React, { CSSProperties, useEffect, useState } from 'react'
import InputFile from '../../../components/inputs/inputFile'
import { state } from './text/state'
import { getSucursal } from '../../../redux/reducers/adminUserReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import {
  getDataClient,
  getDataSucursal,
  getDataUser,
  updateDataUser
} from '../../../redux/actions/adminUserActions'
import { UserDataModel } from '../../../models/userDataModel'
import { BeatLoader, PuffLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const EditUser = () => {
  const dispatch = useDispatch()
  const sucursal = useSelector(getSucursal)
  const router = useRouter()
  const [classButton, setClassButton] = useState(' bg-[#086EAE] opacity-50')
  const [user, setUser] = useState<UserDataModel | null>()
  const [postData, setPostData] = useState<UserDataModel>()
  const [loader, setLoader] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [updateLoader, setUpdateLoader] = useState(false)
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }

  useEffect(() => {
    if (router.query.sucursal !== 'false' && router.query.sucursal && !user)
      getDataSucursal(dispatch, router.query.sucursal, setLoader, setUser)
    else {
      if ((router.query.Client === 'false' || !router.query.Client) && !user)
        getDataUser(dispatch, router.query.idUser, setLoader, setUser)
      if (router.query.Client === 'true' && !user)
        getDataClient(dispatch, router.query.idUser, setLoader, setUser)
    }
  }, [router.query.idUser, router.query.sucursal])

  useEffect(() => {
    if (user) setClassButton(' bg-[#2490D3]')
  }, [user])

  const changeInputs = (event: any) => {
    setDisabled(false)
    if (event.target.type === 'file') {
      setUser({ ...user, [event.target.name]: event.target.files[0] })
    } else {
      if (event.target.name === 'activo') {
        setUser({ ...user, [event.target.name]: parseInt(event.target.value) })
      } else setUser({ ...user, [event.target.name]: event.target.value })
    }

    if (event.target.type === 'file') {
      setPostData({ ...postData, [event.target.name]: event.target.files[0] })
    } else {
      if (event.target.name === 'activo') {
        setPostData({
          ...postData,
          [event.target.name]: event.target.value !== 1
        })
      } else
        setPostData({ ...postData, [event.target.name]: event.target.value })
    }
  }

  const OnPostData = async () => {
    setUpdateLoader(true)
    const response = await updateDataUser(user)
    setUpdateLoader(false)
    if (response.statusCode === 200) {
      toast.success('El usuario fue editado correctamente')
    }

    if (response.statusCode === 400)
      toast.error('El usuario no pudo ser editado')
  }

  return (
    <>
      {!user && (
        <div className="flex h-[60vh] justify-center items-center">
          <PuffLoader
            color="#086eae"
            loading={loader}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {user && user.rol !== undefined && (
        <div>
          <div
            className="lg:grid lg:grid-cols-2 gap-x-8 w-full"
            onChange={changeInputs}
          >
            <div className="lg:pt-6 pt-3 w-full h-full">
              <ButtonSec
                color={'border-azulPrimary700 lg:my-2 lg:h-12 h-10'}
                name={sucursal ? 'name' : user.name ? 'name' : 'nombre'}
                className={
                  'border border-azulPrimary700 rounded-[6px] h-[47px] w-full'
                }
                placeholder={text.name.es}
                label={text.name.es + ':'}
                type={'text'}
                value={user.name ? user.name : user.nombre}
              ></ButtonSec>
            </div>
            {user.rol <= 5 && (
              <div className="lg:pt-6 pt-3 w-full h-full">
                <ButtonSec
                  color={'border-azulPrimary700 lg:my-2 lg:h-12 h-10'}
                  className={
                    'border border-azulPrimary700 rounded-[6px] h-[47px] w-full'
                  }
                  name={'lastname'}
                  placeholder={text.lastName.es}
                  label={text.lastName.es + ':'}
                  type={'text'}
                  value={user.lastname}
                ></ButtonSec>
              </div>
            )}
            {user.rol <= 5 && (
              <div className="lg:pt-6 pt-3 w-full h-full">
                <ButtonSec
                  color={'border-azulPrimary700 lg:my-2 lg:h-12 h-10'}
                  className={
                    'border border-azulPrimary700 rounded-[6px] h-[47px] w-full'
                  }
                  name={'correo'}
                  placeholder={'email@domain.com'}
                  label={text.email.es + ':'}
                  type={'text'}
                  value={user.correo}
                ></ButtonSec>
              </div>
            )}
            {(user.rol <= 5 || user.rol === 7) && (
              <div className="grid-item lg:pt-6 pt-3 w-full h-full">
                <ButtonSec
                  color={'border-azulPrimary700 lg:my-2 lg:h-12 h-10'}
                  name={user.rol === 7 ? 'NIT' : 'identificacion'}
                  className={
                    'border border-azulPrimary700 rounded-[6px] h-[47px] w-full'
                  }
                  placeholder={user.rol === 7 ? 'NIT' : 'identificacion'}
                  label={user.rol === 7 ? 'NIT' + ':' : 'Identificación' + ':'}
                  type={'text'}
                  value={user.rol === 7 ? user.nit : user.identificacion}
                ></ButtonSec>
              </div>
            )}

            {user.rol === 7 && (
              <div className="lg:pt-6 pt-3 w-full h-full">
                <ButtonSec
                  color={'border-azulPrimary700 lg:my-2 lg:h-12 h-10'}
                  className={
                    'border border-azulPrimary700 rounded-[6px] h-[47px] w-full'
                  }
                  name={'direccion'}
                  placeholder={text.direction.es}
                  label={text.direction.es + ':'}
                  type={'text'}
                  value={user.direccion}
                ></ButtonSec>
              </div>
            )}
            {user.rol === 7 && (
              <div className="lg:pt-6 pt-3 w-full h-full">
                <ButtonSec
                  color={'border-azulPrimary700 lg:my-2 lg:h-12 h-10'}
                  className={
                    'border border-azulPrimary700 rounded-[6px] h-[47px] w-full'
                  }
                  name={'telefono'}
                  placeholder={text.telefono.es}
                  label={text.telefono.es + ':'}
                  type={'text'}
                  value={user.telefono}
                ></ButtonSec>
              </div>
            )}

            {user.rol < 7 && (
              <div className="lg:pt-6 pt-3 w-full h-full">
                <Select
                  name={'activo'}
                  options={state}
                  label={text.state.es + ':'}
                  choose={'Selecciona'}
                  value={user.activo === 1 ? 1 : 2}
                ></Select>
              </div>
            )}
            {user.rol <= 5 && (
              <div className="grid-item lg:pt-6 pt-3 w-full h-full">
                <ButtonSec
                  color={'border-azulPrimary700 lg:my-2 lg:h-12 h-10'}
                  className={
                    'border border-azulPrimary700 rounded-[6px] h-[47px] w-full'
                  }
                  name={'user'}
                  placeholder={'lina.nieto'}
                  label={'Usuario' + ':'}
                  type={'text'}
                  value={user.user}
                  disabled={true}
                ></ButtonSec>
              </div>
            )}

            {user.rol === 7 && (
              <div className="w-full pt-6">
                <InputFile></InputFile>
              </div>
            )}
          </div>
          <div className="w-full flex lg:justify-end justify-center items-end h-full">
            <Button
              color={'bg-[#2490D3]'}
              label={text.cancelButton.es}
              type="button"
              className={'mb-0 h-10 mr-8 justify-between'}
              classNameText={'mr-2 lg:text-[10px] text-[15px] font-bold'}
              icon={cancel}
              link={'/administrador/usuarios'}
            ></Button>
            {updateLoader && (
              <div className="flex w-[114.5px] justify-center items-center">
                <BeatLoader
                  color="#2490D3"
                  loading={updateLoader}
                  cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
            {!updateLoader && (
              <Button
                color={classButton}
                label={text.updateButton.es}
                type="button"
                className={' h-10 mb-0 justify-between'}
                classNameText={'mr-2 lg:text-[10px] text-[15px] font-bold'}
                icon={check}
                action={OnPostData}
                disable={disabled}
              ></Button>
            )}
          </div>
        </div>
      )}
      <div className="h-[100px]"></div>
    </>
  )
}

export default EditUser
