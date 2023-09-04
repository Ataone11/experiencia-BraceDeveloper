import { useState } from 'react'
import url from '../../../assets/empresa/carne/url.svg'
import downdload from '../../../assets/downdload.svg'
import Button from '../../../components/buttons/buttonPrimaryInvert'
import Table from '../../general/table/Table'

const headers = [
  'N° Orden',
  'N° Carnet',
  'Póliza',
  'Asegurado',
  'N° NOrdenentificación',
  'Tomador',
  'NIT tomador',
  'Código',
  'Nivel educativo',
  'Sucursal/Agencia',
  'Fecha inicio',
  'Fecha fin',
  'Plan',
  'Direccíon Sucursal',
  'Nombre contacto',
  'Telefono'
]

const content: any[] = [
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  },
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  },
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  },
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  },
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  },
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  },
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  },
  {
    NOrden: {
      link: true,
      href: `/administrador/remisiones/33257`,
      text: '68976'
    },
    NCarnet: 1,
    Poliza: '3100022076',
    Asegurado: 'Juan Sebastián Millán',
    NIdentificacion: '1018499233',
    Tomador: 'Sociedad Salesiana Centro Juan Bosco Obrero',
    NITtomador: '8600080100',
    Codigo: 0,
    Niveleducativo: 'Educación superior',
    SucursalAgencia: 'Chapinero',
    Fechainicio: '22/09/2022',
    Fechafin: '22/09/2022',
    Plan: 'plan',
    DireccionSucursal: 'Cra 7 #57-67',
    Nombrecontacto: 'Jose damar castro',
    Telefono: '3456765414'
  }
]
const Formatos = () => {
  const [flag, setFlag] = useState(false)

  return (
    <div className="container py-[57px] px-[16px] xl:mx-auto  w-full">
      <span className="text-textSize2 font-semibold text-azulPrimary900">
        ORDEN 69347
      </span>
      <div className="flex">
        <div className="flex font-semibold my-3 justify-start">
          <span className="text-azulPrimary900">CantNOrdenad:</span>
          <span className="mx-1 text-grisNeutral500">132 unidades</span>
        </div>
        <div className="flex gap-2  absolute top-16 right-0 m-10">
          <Button
            action={() => setFlag(!flag)}
            label={'Copiar URL'}
            className={
              'text-center w-[148px] h-[44px] mx-auto bg-azulPrimary900 rounded-lg'
            }
            classNameText={'text-textSize7 mx-2 w-full'}
            icon={url}
            type={'button'}
          />
          <Button
            action={() => setFlag(!flag)}
            label={'Descargar'}
            className={
              'text-center w-[140px] h-[44px] mx-auto bg-azulPrimary900 rounded-lg  '
            }
            classNameText={'text-textSize7 mx-2 w-full'}
            icon={downdload}
            type={'button'}
          />
        </div>
      </div>
      <Table
        title={headers}
        colorTitle={'bg-azulSecondary100'}
        list={content}
        totalPage={0}
        functionPagination={() => null}
        isLoading={false}
        // className={'lg:w-[150%] xl:w-[170%]'}
      />
    </div>
  )
}

export default Formatos
