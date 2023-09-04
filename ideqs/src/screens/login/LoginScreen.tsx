import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import Button from '../../components/buttons/Button'
import ContainerAuth from './ContainerAuth'
import { SCREENS_ENUM } from './enums'
import Arroba from '../../assets/login/Arroba'
import Password from '../../assets/login/Password'
import Input from '../../components/inputs/Input'
import { signInUser } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
import { MoonLoader } from 'react-spinners'

interface CredentialsInterface {
  username: string
  password: string
  recaptcha: boolean
}

export default function LoginScreen({
  setScreen
}: {
  setScreen: Dispatch<SetStateAction<SCREENS_ENUM>>
}) {
  const [credentials, setCredentials] = useState<CredentialsInterface>({
    username: '',
    password: '',
    recaptcha: false
  })

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleCredentials = (e: ChangeEvent<HTMLFormElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const validateIdentification = async (
    event: ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (!credentials.recaptcha) {
      toast.error('Por favor confirme que no es un robot')
      return
    }

    if (!credentials.username) {
      toast.error('Por favor ingrese su usuario')
      return
    }

    if (!credentials.password) {
      toast.error('Por favor ingrese su contraseña')
      return
    }
    setLoading(true)
    const user = await signInUser(
      dispatch,
      credentials.username,
      credentials.password
    )

    if (user && user.error) {
      toast.error(user.error)
      setLoading(false)
      return
    }

    if (!user) {
      toast.error('Este usuario es invalido')
      setLoading(false)
      return
    }

    toast.success('¡Inicio de sesion exitoso!')
  }

  return loading ? (
    <div className="flex justify-center mx-auto  items-center h-screen">
      <MoonLoader color="#425AC5" />
    </div>
  ) : (
    <ContainerAuth title="Iniciar sesión">
      <form
        className="bg-white px-[20px] flex flex-col gap-[30px] items-center"
        onSubmit={validateIdentification}
        onChange={handleCredentials}
      >
        <Input
          placeholder="Usuario"
          Icon={<Arroba />}
          name="username"
          label="Usuario"
          type="text"
          required={true}
          autoComplete="on"
        />
        <Input
          placeholder="Contraseña"
          Icon={<Password />}
          name="password"
          label="Contraseña"
          type="password"
          required={true}
          autoComplete="on"
        />
        <small
          className="text-azulPrimary500 -mt-[20px] w-full text-right hover:underline cursor-pointer"
          onClick={() => setScreen(SCREENS_ENUM.FORGET_PASSWORD)}
        >
          Olvidé mi contraseña
        </small>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_APIKEY || ''}
          onChange={() =>
            setCredentials({
              ...credentials,
              recaptcha: true
            })
          }
        />
        <Button type="submit">Iniciar sesión</Button>
      </form>
    </ContainerAuth>
  )
}
