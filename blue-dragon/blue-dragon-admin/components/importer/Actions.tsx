import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ImportadorModel, ModalModel } from '../../interfaces'
import { PopUpContext } from '../../src/context/PopUpContext'
import { changeStatusImportador } from '../../src/redux/actions/importadoresActions'
import BoxShadow from '../BoxShadow'
import ButtonPage from '../ButtonPage'

const Actions = ({
  visibleImporter
}: {
  visibleImporter?: ImportadorModel
}) => {
  const { query } = useRouter()
  const setPopUp = useContext(PopUpContext)

  const changeStatusI = async (status: number) => {
    const res = await changeStatusImportador(query.id as string, status)
    setPopUp && setPopUp(null)
  }

  const popUp = {
    title:
      visibleImporter?.status !== 2
        ? 'Habilitar importador'
        : 'Inhabilitar importador',
    buttonAction: visibleImporter?.status !== 2 ? 'Habilitar' : 'Inhabilitar',
    action: () => changeStatusI(visibleImporter?.status !== 2 ? 2 : 1),
    setPopUp: true,
    children: (
      <p className='text-base'>
        ¿Estás seguro que deseas&nbsp;
        {visibleImporter?.status !== 2 ? 'Habilitar' : 'Inhabilitar'} a&nbsp;
        {visibleImporter?.importerCompany?.company_name ? (
          <span className='font-bold'>
            {`${visibleImporter?.importerCompany.company_name}`}&nbsp;
            <span className='font-normal'>como importador?</span>
          </span>
        ) : (
          <span>este importador?</span>
        )}
      </p>
    )
  }

  return (
    <BoxShadow props={'p-4'}>
      <div className='flex flex-col gap-y-4'>
        <span className='font-bold text-base'>Acciones</span>
        <div className='flex flex-col gap-y-3'>
          <ButtonPage>
            <span>Inicia un chat</span>
          </ButtonPage>
          <ButtonPage action={() => setPopUp && setPopUp(popUp)}>
            <span>
              {visibleImporter?.status !== 2 ? 'Habilitar' : 'Inhabilitar'}
            </span>
          </ButtonPage>
        </div>
      </div>
    </BoxShadow>
  )
}

export default Actions
