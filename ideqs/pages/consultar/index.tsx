import login from '../../src/assets/general/login.svg'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Numeral from '../../src/assets/general/Numeral'
import { useRouter } from 'next/router'
import ReCAPTCHA from 'react-google-recaptcha'
import Button from '../../src/components/buttons/Button'
import Logo from '../../src/assets/general/Logo'
import Input from '../../src/components/inputs/Input'
import { useDispatch } from 'react-redux'
import { consultAPI } from '../../src/redux/actions/carneActions'

export default function Consultar() {
  const [credentials, setCredentials] = useState({
    identification: '',
    confirmIdentification: '',
    recaptcha: false
  })

  const router = useRouter()

  const dispatch = useDispatch()

  const validateIdentification = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!credentials.recaptcha) {
      toast.error('Por favor confirme que no es un robot')
      return
    }

    if (!credentials.identification) {
      toast.error('Por favor ingrese su número de identificación')
      return
    }
    if (!credentials.confirmIdentification) {
      toast.error('Por favor confirme su número de identificación')
      return
    }

    if (credentials.identification !== credentials.confirmIdentification) {
      toast.error('Los números de identificación no coinciden')
      return
    }

    const response = await consultAPI({
      dispatch,
      identificacion: credentials.identification,
      tipoCarnet: 'IDEQS 3'
    })

    if (!response) {
      toast.error('El numero de identificación no tiene carné')
      return
    }

    router.push('consultar/formatos', undefined, {shallow:true})
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center py-[50px] lg:py-0 lg:flex-row">
      <section className="bg-azulPrimary500 h-full w-full place-content-center hidden lg:grid">
        <Image
          src={login}
          alt=""
          width={1000}
          height={1000}
          className="border-2 border-black"
          objectFit="cover"
        />
      </section>
      <section className="flex flex-col items-center gap-[50px] lg:w-[600px] xl:w-[1000px]">
        <Logo />
        <h1 className="text-textSize3 text-azulPrimary700 font-bold">
          Inicio de sesión
        </h1>
        <form
          className="bg-white px-[20px] flex flex-col gap-[30px] items-center"
          onChange={(e: ChangeEvent<HTMLFormElement>) =>
            setCredentials({
              ...credentials,
              [e.target.name]: e.target.value
            })
          }
          onSubmit={validateIdentification}
        >
          <Input
            placeholder="Número de identificación"
            Icon={<Numeral />}
            name="identification"
            type="number"
            label="Identificación"
            required={true}
          />
          <Input
            placeholder="Confirmar número de identificación"
            Icon={<Numeral />}
            name="confirmIdentification"
            type="number"
            label="Confirmar identificación"
            required={true}
          />
          <ReCAPTCHA
            sitekey="6LevS0IjAAAAANDXWG3wPO1yAk0mvnLrZQBXOrmk"
            onChange={() =>
              setCredentials({
                ...credentials,
                recaptcha: true
              })
            }
          />
          <section className="flex w-full justify-center">
            <Button type="submit">Iniciar sesión</Button>
          </section>
        </form>
      </section>
    </div>
  )
}
