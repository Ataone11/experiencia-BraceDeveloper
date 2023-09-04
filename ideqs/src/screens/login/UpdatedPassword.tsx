import { Dispatch, SetStateAction } from 'react'
import Button from '../../components/buttons/Button'
import ContainerAuth from './ContainerAuth'
import { SCREENS_ENUM } from './enums'

export default function UpdatedPassword({
  setScreen
}: {
  setScreen: Dispatch<SetStateAction<SCREENS_ENUM>>
}) {
  return (
    <ContainerAuth title='Contraseña actualizada'>
      <p className='text-textSize7 lg:text-textSize5 text-azulPrimary900 font-semibold text-center'>
        Tu contraseña ha sido actualizada de manera exitosa.
      </p>
      <p className='text-neutral-900 text-center text-textSize7 lg:text-textSize6 lg:w-[70%] mx-auto'>
        Ahora puedes ingresar con tu nueva contraseña, presiona continuar para
        regresar a la página de inicio
      </p>
      <div className='w-full lg:w-[70%] mx-auto'>
        <Button onClick={() => setScreen(SCREENS_ENUM.LOGIN)}>Continuar</Button>
      </div>
    </ContainerAuth>
  )
}
