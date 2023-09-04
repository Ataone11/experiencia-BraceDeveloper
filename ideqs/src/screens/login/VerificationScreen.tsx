import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import Arrow from '../../assets/general/Arrow'
import Button from '../../components/buttons/Button'
import InputCode from '../../components/inputs/InputCode'
import ContainerAuth from './ContainerAuth'
import { SCREENS_ENUM } from './enums'
import { forgotPassword } from '../../proxy/AWSCognito'
import { ResponseType } from '../../proxy/responseData'

export default function VerificationScreen({
  setScreen,
  setRecoverPassword,
  recoverPassword
}: {
  setScreen: Dispatch<SetStateAction<SCREENS_ENUM>>
  setRecoverPassword: Dispatch<SetStateAction<any>>
  recoverPassword: {
    email: string
    code: string
  }
}) {
  const [load, setLoad] = useState(false)
  const [code, setCode] = useState({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: ''
  })

  const handleCode = (e: any) => {
    if (e.target.value.length === 6) {
      const codeArray = e.target.value.split('')
      setCode({
        first: codeArray[0],
        second: codeArray[1],
        third: codeArray[2],
        fourth: codeArray[3],
        fifth: codeArray[4],
        sixth: codeArray[5]
      })
      return
    }

    if (e.target.value.length === 1) {
      const nextInput = e.target.nextElementSibling
      if (nextInput) {
        nextInput.focus()
      }
    } else if (e.target.value.length === 0) {
      const prevInput = e.target.previousElementSibling
      if (prevInput) {
        prevInput.focus()
      }
    }

    setCode({
      ...code,
      [e.target.name]: e.target.value
    })
  }

  const handleVerify = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    const codeAuxiliar = `${code.first}${code.second}${code.third}${code.fourth}${code.fifth}${code.sixth}`
    if (codeAuxiliar.length !== 6) {
      toast.error('Ingrese un código válido')
      return
    }
    setRecoverPassword((prevData: any) => ({ ...prevData, code: codeAuxiliar }))
    setScreen(SCREENS_ENUM.CHANGE_PASSWORD)
  }

  return (
    <ContainerAuth
      title="Verificación"
      description="Hemos enviado el código al correo, revisa tu bandeja de entrada"
    >
      <form
        className="flex flex-col gap-[30px]"
        onChange={handleCode}
        onSubmit={handleVerify}
      >
        <section className="gap-[6px] flex">
          <InputCode name="first" value={code.first} required={true} />
          <InputCode name="second" value={code.second} required={true} />
          <InputCode name="third" value={code.third} required={true} />
          <InputCode name="fourth" value={code.fourth} required={true} />
          <InputCode name="fifth" value={code.fifth} required={true} />
          <InputCode name="sixth" value={code.sixth} required={true} />
        </section>
        <hgroup className="text-center lg:flex lg:gap-[5px]">
          <p className="text-neutral-300">Si no recibiste el código</p>
          <span
            className="text-azulPrimary700 hover:underline cursor-pointer"
            onClick={async () => {
              if (load) return
              if (!recoverPassword || !recoverPassword.email) {
                toast.error('Error al reenviar el código')
              }
              setLoad(true)
              toast.loading('Reenviando código')
              const response = await forgotPassword(recoverPassword.email)
              toast.dismiss()
              setLoad(false)
              if (response.message === ResponseType.OK) {
                toast.success('Código reenviado correctamente')
                return
              }
              toast.error('Error al reenviar el código')
            }}
          >
            Reenviar código
          </span>
        </hgroup>
        <Button type="submit">
          <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
            Verificar
            <Arrow />
          </span>
        </Button>
      </form>
    </ContainerAuth>
  )
}
