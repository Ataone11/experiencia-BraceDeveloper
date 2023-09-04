import { text } from './text/createUser'
import ButtonSec from '../../../components/inputs/inputTexto'
import Button from '../../../components/buttons/primaryButton'
import cancel from '../../../assets/administrador/usuarios/cancel.svg'
import check from '../../../assets/administrador/usuarios/check.svg'
import React, { useEffect, useState } from 'react'

import FilesDragAndDrop from '../../../components/FilesDragAndDrop'
import { BeatLoader } from 'react-spinners'
interface Params {
  action?: (e: any) => void
  submit: () => void
  onUpload: (e: any) => void
  file: any
}
const createEmpresa = ({ action, submit, onUpload, file }: Params) => {
  const [, setClassButton] = useState('bg-[#2490D3]')
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const input = document.getElementsByTagName('input')
    const select = document.getElementsByTagName('select')
    setClassButton('bg-[#2490D3]')

    for (let i = 0; i <= input.length - 1; i++) {
      if (input[i].value === '') {
        setClassButton(' bg-[#086EAE] opacity-50')
      }
    }

    for (let i = 0; i <= select.length - 1; i++) {
      if (select[i].value === '') {
        setClassButton(' bg-[#086EAE] opacity-50')
      }
    }
  }, [])
  const enviar = async () => {
    setLoad(true)
    await submit()
    setLoad(false)
  }
  return (
    <>
      <>
        <form
          id="CreateForm"
          className="lg:grid xl:grid-cols-2 gap-x-[19rem] w-full xl:w-[75%]"
          onChange={action}
        >
          <div className="lg:pt-5 pt-4 w-full sm:w-[453px] lg:w-[453px] h-[86px]">
            <ButtonSec
              color={'border-azulPrimary700 '}
              name={'name'}
              placeholder={text.name.es}
              label={text.name.es + ':'}
              type={'text'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[13px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className=" my-5 w-full sm:w-[453px] lg:w-[453px] h-[56px]">
            <ButtonSec
              name={'correo'}
              placeholder={'email@domain.com'}
              label={'Correo Notificaciones' + ':'}
              type={'text'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[13px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className=" my-5 w-full sm:w-[453px] lg:w-[453px] h-[56px]">
            <ButtonSec
              name={'identificacion'}
              placeholder={'NIT'}
              label={'NIT' + ':'}
              type={'number'}
              action={action}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[13px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>

          <div className="my-5 w-full sm:w-[453px] lg:w-[453px] h-[56px]">
            <ButtonSec
              name={'direccion'}
              placeholder={'Dirección'}
              label={'Dirección' + ':'}
              action={action}
              type={'text'}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[13px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>
          <div className="my-5 w-full sm:w-[453px] lg:w-[453px] h-[56px]">
            <ButtonSec
              name={'telefono'}
              placeholder={'Teléfono'}
              label={'Teléfono' + ':'}
              action={action}
              type={'text'}
              className={
                ' w-full border-2 border-azulPrimary900  h-10 lg:h-14 text-[13px] rounded-[6px]'
              }
            ></ButtonSec>
          </div>
          <div className=" w-fit pt-7">
            <span className="font-semibold">Logo:</span>
            {
              <FilesDragAndDrop
                file={file}
                onUpload={onUpload}
                name={'Los Archivos'}
                nameInput={'logo'}
                validFileFormats={[
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  'application/vnd.ms-excel',
                  'image/bmp',
                  'image/jpeg',
                  'image/x-png',
                  'image/png',
                  'image/gif'
                ]}
              />
            }
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
          <div className="w-full lg:w-[86%] flex lg:justify-end my-5 justify-center">
            <Button
              color={'bg-[#FF6633]'}
              label={text.cancelButton.es}
              type="button"
              className={' h-10 mr-10 justify-between'}
              classNameText={'mr-5 lg:text-[10px] text-[15px] font-bold'}
              icon={cancel}
              link={'/administrador/usuarios'}
            ></Button>
            <Button
              color={'bg-azulPrimary700'}
              label={text.createButton.es}
              type="button"
              className={' h-10 justify-between'}
              classNameText={'mr-5 lg:text-[10px] text-[15px] font-bold'}
              icon={check}
              action={enviar}
            ></Button>
          </div>
        )}
      </>
    </>
  )
}

export default createEmpresa
