import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import Arrow from '../../assets/general/Arrow'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import { forgotPassword } from '../../proxy/AWSCognito'
import { ResponseType } from '../../proxy/responseData'
import ContainerAuth from './ContainerAuth'
import { SCREENS_ENUM } from './enums'

export default function ForgetPasswordScreen({
  setScreen,
  setRecoverPassword
}: {
  setScreen: Dispatch<SetStateAction<SCREENS_ENUM>>
  setRecoverPassword: Dispatch<SetStateAction<any>>
}) {
  const [email, setEmail] = useState<string>('')
  const handleEmail = (e: any) => {
    setEmail(e.target.value)
  }
  const handleSendCode = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) {
      toast.error('Ingresa un correo electrónico')
      return
    }

    const response = await forgotPassword(email)

    if (response.message === ResponseType.OK) {
      setRecoverPassword((prevData: any) => ({ ...prevData, email }))
      setScreen(SCREENS_ENUM.VERIFICATION)
    }
  }
  return (
    <ContainerAuth
      title="Recuperar contraseña"
      description="Ingresa el nombre de usuario"
    >
      <form
        className="flex flex-col gap-[30px]"
        onChange={handleEmail}
        onSubmit={handleSendCode}
      >
        <Input
          placeholder="nombre.usuario"
          name="email"
          type="text"
          required={true}
        />
        <p className="text-textSize6 text-azulPrimary700 text-center">
          Enviaremos un código de verificación al correo registrado
        </p>
        <div>
          <Button type="submit">
            <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
              Enviar código {'->'}
            </span>
          </Button>
        </div>
      </form>
    </ContainerAuth>
  )
}
