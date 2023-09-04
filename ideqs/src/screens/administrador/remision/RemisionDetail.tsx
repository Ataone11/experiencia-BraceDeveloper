import { useRouter } from 'next/dist/client/router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Delete from '../../../assets/administrador/remision/Delete'
import Footer from '../../../assets/administrador/remision/Footer'
import Link from '../../../assets/administrador/remision/Link'
import Phone from '../../../assets/administrador/remision/Phone'
import Download from '../../../../src/assets/general/Download'
import Ubication from '../../../assets/administrador/remision/Ubication'
import Checkbox from '../../../assets/general/Checkbox'
import Logo from '../../../assets/general/Logo'
import Button from '../../../components/buttons/Button'
import { parseDate } from '../../../functions/HandleDate'
import {
  deleteRemision,
  getRemisionByID
} from '../../../redux/actions/remisionActions'
import { getRemisionByIDSelector } from '../../../redux/reducers/remisionesReducer'
import CardDetail from './CardDetail'
import { useScreenshot } from 'use-react-screenshot'
import jsPDF from 'jspdf'
import { PuffLoader } from 'react-spinners'
export default function RemisionDetail() {
  const remisionById = useSelector(getRemisionByIDSelector)
  const [loading, setLoading] = useState(true)
  const data = [
    remisionById?.ordenes?.map((orden: any) => ({
      id: orden.orden,
      order: orden.orden,
      tomador: orden.tomador,
      poliza: orden.poliza,
      sucursal: orden.sucursal,
      cantidad: orden.cantidad
    }))
  ]
  const { id } = useRouter().query

  const dispatch = useDispatch()

  const router = useRouter()

  useEffect(() => {
    const action = async () => {
      if (id) {
        setLoading(true)
        await getRemisionByID({ dispatch, id: id as string })
        setLoading(false)
      }
    }

    action()
  }, [id])

  const refDetail = useRef<HTMLDivElement>(null)
  const [image, takeScreenshot] = useScreenshot()

  const getImage = () => takeScreenshot(refDetail.current)

  const parseImageToPdf = () => {
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF()

    pdf.addImage(image, 'PNG', 0, 0, 210, 220, undefined, 'NONE')
    pdf.save('remision.pdf')
  }

  useEffect(() => {
    if (image) {
      parseImageToPdf()
    }
  }, [image])

  const contentTop = [
    {
      title: 'Fecha',
      value: parseDate(remisionById?.fecha)
    },
    {
      title: 'Empresa',
      value: remisionById?.nombreCliente
    },
    {
      title: 'Entregar a',
      value: remisionById?.personaContacto
    },
    {
      title: 'Dirección',
      value: remisionById?.direccion
    },
    {
      title: 'Correo(s)',
      value: remisionById?.correo
    },
    {
      title: 'Teléfono',
      value: remisionById?.telefono
    }
  ]
  const override: any = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#086eae'
  }
  return loading ? (
    <div className="flex w-full absolute inset-0  justify-center items-center">
      <PuffLoader
        color="#086eae"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <>
      <article
        ref={refDetail}
        className="border-2 border-neutral-100 rounded-[10px] shadow-md mx-auto"
      >
        <header className="flex gap-[10px] items-center text-azulPrimary700 lg:text-textSize4 bg-azulSecondary100 py-[10px] px-[18px]">
          <Checkbox />
          <h2>Nº de Remisión: {id} </h2>
        </header>
        <main className="px-[10px] md:px-[50px] mt-[24px] grid gap-[21px]">
          <div className="md:flex md:items-center md:justify-between">
            <section className="font-bold text-neutral-300  md:text-textSize6 text-textSize7 grid gap-[20px] md:col-span-2">
              {contentTop.map(({ title, value }: any) => (
                <section className="grid grid-cols-2" key={title + value}>
                  <p className="text-left">{title}: </p>
                  <span className="w-full text-neutral-900 font-normal">
                    {value}
                  </span>
                </section>
              ))}
            </section>
            <span className="hidden md:block md:self-start md:mt-[50px]">
              <Logo />
            </span>
          </div>
          <section className="grid gap-[10px] md:hidden">
            {data.map((information: any) => (
              <CardDetail data={information} key={information?.orden} />
            ))}
          </section>
          <section>
            <table className="hidden md:table shadow-sm w-full">
              <thead>
                <tr className="text-center bg-azulPrimary100 text-azulPrimary900 text-textSize7  md:text-textSize6 font-bold">
                  <th className="w-[100px] py-[8px] rounded-tl-[8px]">
                    Nº de Orden
                  </th>
                  <th className="w-[200px] py-[8px]">Tomador</th>
                  <th className="w-[100px] py-[8px]">Póliza</th>
                  {remisionById?.mostrarSucursal && (
                    <th className="w-[100px] py-[8px]">Sucursal</th>
                  )}
                  <th className="w-[100px] py-[8px] rounded-tr-[8px]">
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {data[0]?.map((information: any) => (
                  <tr
                    className="text-center even:bg-azulPrimary100/70 text-neutral-900 text-textSize7  md:text-textSize6 font-normal"
                    key={information.id}
                  >
                    <td className="w-[100px]">{information.order}</td>
                    <td className="w-[200px]">{information.tomador}</td>
                    <td className="w-[100px]">{information.poliza}</td>
                    {remisionById?.mostrarSucursal && (
                      <td className="w-[100px]">
                        {information.sucursal
                          ? information.sucursal
                          : 'no hay sucursales disponibles'}
                      </td>
                    )}

                    <td className="w-[100px]">{information.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="font-bold text-neutral-300 text-textSize7 md:text-textSize6 grid gap-[20px]">
            <section className="grid grid-cols-2">
              <p className="text-left">Total: </p>
              <span className="w-full text-neutral-900 font-normal">
                {remisionById?.cantidad}
              </span>
            </section>
            <div className="hidden md:grid md:grid-flow-col md:gap-[20px]">
              <section className="grid grid-cols-2 md:flex md:flex-col md:gap-[30px]">
                <p className="text-left">Recibido a satisfacción por: </p>
                <span className="w-full text-neutral-900 font-normal border-b border-black" />
              </section>
              <section className="grid grid-cols-2 md:flex md:flex-col md:gap-[6px]">
                <p className="text-left ">Elaborado por: </p>
                <span className="w-full text-neutral-900 font-normal border-b border-black">
                  {remisionById?.usuario}
                </span>
              </section>
            </div>
          </section>
        </main>
        <footer className="flex flex-col mt-[20px] text-center font-bold text-[12px] text-neutral-900 md:flex-row md:items-center md:justify-between md:px-[50px]">
          <span className="md:hidden mx-auto">
            <Logo />
          </span>
          <span className="hidden md:block w-fit">
            <Footer />
          </span>
          <hgroup className="w-fit mx-auto md:mx-0">
            <p className="mt-[20px] md:text-right flex gap-[5px] items-center">
              Cr 25 # 73 - 51, Bogotá <Ubication />
            </p>
            <p className="my-[8px] md:justify-end md:w-auto w-fit mx-auto flex md:mx-0 gap-[5px] items-center">
              www.ideqs.com
              <span className="text-azulPrimary900">
                <Link />
              </span>
            </p>
            <p className="mb-[8px] md:justify-end w-fit md:w-auto mx-auto flex md:mx-0 gap-[5px] items-center">
              3221503
              <Phone />
            </p>
          </hgroup>
        </footer>
      </article>
      <section className="mt-[40px] md:flex md:items-center md:justify-end">
        <div className="flex gap-[20px] md:w-[230px]">
          <Button
            onClick={async () => {
              setLoading(true)
              await deleteRemision({ dispatch, id: Number(id) })
              setLoading(false)
              router
                .push('/administrador/remisiones', undefined, { shallow: true })
                .then(null)
            }}
          >
            {
              <span className="flex gap-[10px] text-white items-center w-fit mx-auto">
                <Delete />
                Eliminar
              </span>
            }
          </Button>
          <a onClick={() => getImage()}>
            {
              <span className="flex cursor-pointer gap-[10px] text-white items-center justify-center mx-auto h-[50px] bg-azulPrimary900 w-[100px] rounded-[5px] text-textSize7 font-bold">
                <Download />
                Descargar
              </span>
            }
          </a>
        </div>
      </section>
    </>
  )
}
