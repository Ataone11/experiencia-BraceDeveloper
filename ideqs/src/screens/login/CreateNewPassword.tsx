import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import Check from '../../assets/login/Check'
import Password from '../../assets/login/Password'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import { submitPasswordChange } from '../../redux/actions/authActions'
import ContainerAuth from './ContainerAuth'
import { SCREENS_ENUM } from './enums'

export default function CreateNewPassword({
  setScreen,
  recoverPassword
}: {
  setScreen: Dispatch<SetStateAction<SCREENS_ENUM>>
  recoverPassword: any
}) {
  const [passwords, setPasswords] = useState<{
    password: string
    password_confirm: string
  }>({
    password: '',
    password_confirm: ''
  })
  const handlePasswords = (event: any) => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value })
  }
  const validatePasswords = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!passwords.password) {
      toast.error('Por favor ingrese su nueva contraseña')
      return
    }
    if (!passwords.password_confirm) {
      toast.error('Por favor confirme su nueva contraseña')
      return
    }
    if (passwords.password !== passwords.password_confirm) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    const response = await submitPasswordChange(
      recoverPassword.code,
      recoverPassword.email,
      passwords.password
    )

    if (response.error) {
      toast.error(response.error)
      setScreen(SCREENS_ENUM.VERIFICATION)
      return
    }

    setScreen(SCREENS_ENUM.PASSWORD_UPDATED)
  }
  return (
    <ContainerAuth title="Verifación" description="Crea una nueva contraseña">
      <form
        className="flex flex-col gap-[30px]"
        onChange={handlePasswords}
        onSubmit={validatePasswords}
      >
        <Input
          placeholder="Nueva contraseña"
          Icon={<Password />}
          name="password"
          type="password"
          label="Contraseña"
          required={true}
        />
        <Input
          placeholder="Confirmar nueva contraseña"
          Icon={<Password />}
          name="password_confirm"
          type="password"
          label="Confirmar contraseña"
          required={true}
        />
        <div className="mt-[50px]">
          <Button type="submit">
            <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
              Guardar contraseña
              <Check />
            </span>
          </Button>
        </div>
      </form>
    </ContainerAuth>
  )
}
