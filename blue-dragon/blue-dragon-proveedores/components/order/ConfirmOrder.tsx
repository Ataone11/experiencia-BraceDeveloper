import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { FechaModel, FileOrderModel, OrderModel } from '../../interfaces'
import File from '../../src/assets/general/File'
import { PopUpContext } from '../../src/context/PopUpContext'
import { statusUpdate } from '../../src/redux/actions/pedidosActions'
import colores from '../../src/utils/colores'
import ButtonPage from '../ButtonPage'

const ConfirmOrder = ({
  visibleOrder,
  loadOrder,
}: {
  visibleOrder: OrderModel | null
  loadOrder: () => Promise<void>
}) => {
  const { query } = useRouter()
  const setPopUp = useContext(PopUpContext)
  const [loading, setloading] = useState(false)
  const [filesOrder, setFilesOrder] = useState<FileOrderModel>({
    Factura: null,
    Packing: null,
    BL: null,
  })
  const [estimatedDate, setEstimatedDate] = useState<FechaModel>({
    fecha: null,
    hora: null,
  })
  const [confirmationDate, setConfirmationDate] = useState<FechaModel>({
    fecha: null,
    hora: null,
  })
  const [trackingLink, setTrackingLink] = useState<{
    enlaceRastreo: string
  }>({
    enlaceRastreo: '',
  })

  const uploadFile = (e: any) => {
    setFilesOrder({
      ...filesOrder,
      [e.target.name]: e.target.files[0],
    })
  }

  const uploadEstimatedDate = (e: any) => {
    setEstimatedDate({
      ...estimatedDate,
      [e.target.name]: e.target.value,
    })
  }

  const uploadConfirmationDate = (e: any) => {
    setConfirmationDate({
      ...confirmationDate,
      [e.target.name]: e.target.value,
    })
  }

  const handleTrackingLink = (e: any) => {
    setTrackingLink({
      ...trackingLink,
      [e.target.name]: e.target.value,
    })
  }
  const { t } = useTranslation();
  const onSubmit = async () => {
    if (!filesOrder.Factura || !filesOrder.Packing || !filesOrder.BL) {
      toast.error(t("order:there are no documents to upload"))
      return
    }
    if (!estimatedDate.fecha || !estimatedDate.hora) {
      toast.error(t("order:no estimated date information"))
      return
    }
    if (!confirmationDate.fecha || !confirmationDate.hora) {
      toast.error(t("order:no confirmation date information"))
      return
    }
    if (trackingLink.enlaceRastreo === '') {
      toast.error(t("order:tracking link missing"))
      return
    }

    setloading(true)
    const res = await statusUpdate({
      intermediate: 'false',
      date: `${confirmationDate.fecha}T${confirmationDate.hora}`,
      status: visibleOrder ? String(visibleOrder?.status.id + 1) : '3',
      order: query.id as string,
      // payment_support: filesOrder.Packing,
      estimated_delivery_date: `${estimatedDate.fecha}T${estimatedDate.hora}`,
      tracking_link: trackingLink.enlaceRastreo,
      invoice_support: filesOrder.Factura,
      bl_support: filesOrder.BL,
      packing_support: filesOrder.Packing,
    })
    setPopUp && setPopUp(null)
    loadOrder()
    setloading(false)
  }

  return (
    <div>
      {/* ARCHIVOS */}
      <span className="flex gap-x-3 items-center justify-between py-3 border-b border-b-gray-page last:border-b-0 last:border-none">
        <span className="flex items-center gap-x-4">
          <File />
          <div className="flex flex-col">
            <span className="text-sm font-bold">{t("order:invoice_Company_Order")}</span>
            {filesOrder.Factura && (
              <span className="text-xs font-semibold text-dark-blue">
                {filesOrder.Factura.name}
              </span>
            )}
          </div>
          <input
            type="file"
            name="Factura"
            id="Factura"
            className="hidden"
            onChange={uploadFile}
          />
        </span>
        <label
          htmlFor="Factura"
          className="bg-primary rounded-md px-4 py-2 text-white font-medium text-sm break-words transition-all duration-300 ease-in-out hover:bg-dark-blue"
        >
          {filesOrder.Factura ? t("order:change") :t("order:add")}
        </label>
      </span>
      <span className="flex gap-x-3 items-center justify-between py-3 border-b border-b-gray-page last:border-b-0 last:border-none">
        <span className="flex items-center gap-x-4">
          <File />
          <div className="flex flex-col">
            <span className="text-sm font-bold">
              Packing list_Empresa_Pedido
            </span>
            {filesOrder.Packing && (
              <span className="text-xs font-semibold text-dark-blue">
                {filesOrder.Packing.name}
              </span>
            )}
          </div>
          <input
            type="file"
            name="Packing"
            id="Packing"
            className="hidden"
            onChange={uploadFile}
          />
        </span>
        <label
          htmlFor="Packing"
          className="bg-primary rounded-md py-2 px-4 text-white font-medium text-sm break-words transition-all duration-300 ease-in-out hover:bg-dark-blue"
        >
          {filesOrder.Packing ?  t("order:change") :t("order:add")}
        </label>
      </span>
      <span className="flex gap-x-3 items-center justify-between py-3 last:border-b-0">
        <span className="flex items-center gap-x-4">
          <File />
          <div className="flex flex-col">
            <span className="text-sm font-bold">BL</span>
            {filesOrder.BL && (
              <span className="text-xs font-semibold text-dark-blue">
                {filesOrder.BL.name}
              </span>
            )}
          </div>
          <input
            type="file"
            name="BL"
            id="BL"
            className="hidden"
            onChange={uploadFile}
          />
        </span>
        <label
          htmlFor="BL"
          className="bg-primary rounded-md py-2 px-4 text-white font-medium text-sm break-words transition-all duration-300 ease-in-out hover:bg-dark-blue"
        >
          {filesOrder.BL ?  t("order:change") :t("order:add")}
        </label>
      </span>

      {/* FECHAS Y ENLACE DE RASTREO */}
      <div className="flex flex-col gap-y-3 mt-2 mb-5">
        {/* FECHA ESTIMADA */}
        <div className="flex flex-col gap-y-2">
          <span className="font-normal text-sm">
            {          t("order:choose an estimated date of delivery of the product")
}
          </span>
          <div className="flex items-center gap-x-3">
            <input
              className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
              type="date"
              name="fecha"
              id="fecha"
              required
              onChange={uploadEstimatedDate}
            />
            <input
              className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
              type="time"
              name="hora"
              id="hora"
              required
              onChange={uploadEstimatedDate}
            />
          </div>
        </div>

        {/* FECHA DE CONFIRMACIÓN */}
        <div className="flex flex-col gap-y-2">
          <span className="font-normal text-sm">
            {t("order:order confirmation date")}
          </span>
          <div className="flex items-center gap-x-3">
            <input
              className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
              type="date"
              name="fecha"
              id="fecha"
              required
              onChange={uploadConfirmationDate}
            />
            <input
              className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
              type="time"
              name="hora"
              id="hora"
              required
              onChange={uploadConfirmationDate}
            />
          </div>
        </div>

        {/* ENLACE DE RASTREO */}
        <div className="flex flex-col gap-y-2">
          <label className="font-normal text-sm" htmlFor="enlaceRastreo">
          {t("order:tracking link")}
          </label>
          <input
            className="border border-gray-page rounded-md px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none placeholder:text-gray-page"
            type="text"
            name="enlaceRastreo"
            id="enlaceRastreo"
            placeholder="Link aquí"
            onChange={handleTrackingLink}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-y-3 md:place-content-center gap-x-5">
        {loading ? (
          <ButtonPage>
            <span className="px-2">
              <BeatLoader color={colores.secondary} size={10} />
            </span>
          </ButtonPage>
        ) : (
          <>
            <ButtonPage action={() => setPopUp && setPopUp(null)}>
              <span className="md:px-5">{t("order:cancel")}</span>
            </ButtonPage>
            <ButtonPage action={() => onSubmit()}>
              <span className="md:px-5">{t("order:save")}</span>
            </ButtonPage>
          </>
        )}
      </div>
    </div>
  )
}

export default ConfirmOrder
