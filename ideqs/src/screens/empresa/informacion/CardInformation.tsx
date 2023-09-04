import { useState } from 'react'
import Image from 'next/image'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import Delete from '../../../assets/general/Delete'
import DocumentImg from '../../../assets/general/Document'
import { InformationModel } from '../../../models/informationModel'
import { deleteDocInformation } from '../../../redux/actions/informationActions'
import { COLORS } from '../../../utils/colors'
import Download from '../../../assets/general/Download'
import caraSeria from '../../../assets/general/cara.svg'
import sinImagen from '../../../assets/general/IDMobileNoImage.svg'
import moment from 'moment'
import 'moment/locale/es'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

export default function CardInformation({
  data,
  getInformation
}: {
  data: InformationModel
  getInformation: () => void
}) {
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [src, setSrc] = useState(
    data?.imagen != null ? 'data:image/*;base64,' + data.imagen : ''
  )
  const removeDocInformation = async (id: number) => {
    setLoadingDelete(true)
    const result = await deleteDocInformation(id)
    setLoadingDelete(false)
    if (result === 'OK') {
      getInformation()
      toast.success('Documento eliminado')
    } else toast.error('Hubo un error al tratar de eliminar el documento')
  }
  const getPdfUrl = (base64: any) => {
    const byteCharacters = Buffer.from(base64, 'base64').toString('binary')
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/pdf' })
    return URL.createObjectURL(blob)
  }

  const errorArchivo = (text: string) => (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Image src={caraSeria} alt="Sin archivo" className="" />
      <span className=" text-textSize5 my-4 text-center text-gray-400">
        {text}
      </span>
    </div>
  )

  return (
    <article
      className="border border-neutral-300 rounded-[10px] shadow-sm"
      id={data.id?.toString()}
    >
      <header className="flex justify-between  rounded-t-[10px] items-center py-[19px] px-[10px] bg-azulSecondary100">
        <section className="flex gap-[10px] items-center text-azulPrimary700">
          <DocumentImg />
          <h1 className="text-textSize7 md:text-textSize5">
            {data.nombre || 'Sin nombre'}
          </h1>
        </section>
        {loadingDelete ? (
          <BeatLoader
            color={COLORS.azulPrimaryDark}
            size={15}
            className="lg:min-w-[57px]"
          />
        ) : (
          <span
            className="text-neutral-300 hover:text-azulPrimary700 cursor-pointer"
            onClick={() => data.id && removeDocInformation(data.id)}
          >
            <Delete />
          </span>
        )}
      </header>
      <section className="px-[10px] py-[19px] grid gap-[20px]">
        <p className="text-[10px] text-neutral-300 font-bold md:text-textSize7">
          {data.fecha
            ? `Publicado el ${moment(data.fecha).format('LL')}`
            : 'Sin fecha de publicación'}
        </p>
        <div>
          <h2 className="w-full text-center text-azulPrimary700">
            Previsualización imagen
          </h2>
          <div
            className={`flex bg-cover mx-auto bg-no-repeat w-[220px] h-[90px] overflow-hidden relative `}
          >
            <Image
              alt="Perfil"
              src={src}
              quality={100}
              layout={'fill'}
              style={{
                objectFit: 'contain'
              }}
              onError={() => setSrc(sinImagen)}
            />
          </div>
        </div>

        {data.documento ? (
          <>
            <div>
              <h2 className="w-full text-center text-azulPrimary700">
                Previsualización archivo
              </h2>
              <div className="xl:w-1/2 sm:w-4/5 w-full mx-auto">
                <iframe
                  id="inlineFrameExample"
                  title="Inline Frame Example"
                  className="w-full h-[50vh] border-grisBordesPdf border-4"
                  src={getPdfUrl(data.documento)}
                ></iframe>
              </div>
            </div>
            <div className="flex justify-center">
              <a
                href={getPdfUrl(data.documento)}
                download={`${data.nombre}.pdf`}
                className="rounded-md bg-azulPrimary700 text-white font-bold text-textSize8 w-fit h-[40px] flex justify-center items-center gap-[10px] px-[20px]"
              >
                Descargar archivo
                <Download />
              </a>
            </div>
          </>
        ) : (
          errorArchivo('El documento no se puede visualizar ni descargar')
        )}
      </section>
    </article>
  )
}
