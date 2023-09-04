import Checkbox from '../../assets/general/Checkbox'
import Download from '../../assets/general/Download'
import { decodeImageBase64 } from '../../functions/DecodeBase64'
import { Carne } from '../../models/carneModel'
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function CardPDF({ data }: { data: Carne }) {
  const [, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const byteCharacters = Buffer.from(data.carnet, 'base64').toString('binary')
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)

  return (
    <>
      <div className="border-b-2 border-neutral-300 text-right text-neutral-300 pb-[8px]">
        {`Orden ${data.orden}`}
      </div>
      <div className="border mt-[40px] border-neutral-300 rounded-[10px] flex gap-[20px] py-[15px] px-[15px] lg:py-[30px] lg:px-[35px]">
        <Checkbox />
        <section className="flex flex-col gap-[10px] lg:gap-[20px]">
          <h2 className="text-azulPrimary700">{`${data.nombre} ${data.primerApellido}`}</h2>
          <section className="my-[20px]">
            <hgroup className="flex gap-[22px]">
              <h3 className="font-bold text-neutral-300">Cargo:</h3>
              <p className="text-neutral-900">{data.tipoVinculacion}</p>
            </hgroup>
            <hgroup className="flex gap-[22px]">
              <h3 className="font-bold text-neutral-300">{data.tipoId}:</h3>
              <p className="text-neutral-900">{data.identificacion}</p>
            </hgroup>
          </section>
          <a
            href={url}
            download={`${data.identificacion}.pdf`}
            className="rounded-md bg-azulPrimary700 text-white font-bold text-textSize8 w-fit h-[40px] flex items-center gap-[10px] px-[20px]"
          >
            Descargar en PDF
            <Download />
          </a>
        </section>
      </div>
      <div className="border mt-[40px] border-neutral-300 rounded-[10px] flex gap-[20px] py-[15px] px-[15px] lg:py-[30px] lg:px-[35px]">
        <Checkbox />
        <section className="w-full flex flex-col gap-[10px] lg:gap-[20px]">
          <h2 className="text-azulPrimary700">Previsualización</h2>
          <div className="w-full h-full">
            <Document
              file={decodeImageBase64(data.carnet)}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex justify-center my-6"
            >
              <Page pageNumber={pageNumber} width={700} height={700} />
            </Document>
            <div className="flex flex-col justify-center items-center"></div>
          </div>
        </section>
      </div>
    </>
  )
}
