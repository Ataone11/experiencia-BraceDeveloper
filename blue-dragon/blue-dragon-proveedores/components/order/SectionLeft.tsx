import { useTranslation } from 'next-i18next'
import { off } from 'process'
import { OrderModel } from '../../interfaces'
import {
  FOB_ORDER_STATES,
  INCOTERMS,
  ORDER_STATES,
  PENULTIMOS_STATES,
} from '../../src/utils/constants'
import { FormatDateWithTime } from '../../src/utils/format_date'
import OrderDetail from './OrderDetail'
import OrderDocuments from './OrderDocuments'
import OrderPayInformation from './OrderPayInformation'
import SectionRight from './SectionRight'
import ShipmentInformation from './ShipmentInformation'

export const SectionLeft = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null
}) => {
  const { t } = useTranslation();
  const RECHAZADO_STATE =
    visibleOrder && ORDER_STATES[visibleOrder?.product.incoterm.id].RECHAZADO

  const FINALIZADO_STATE =
    visibleOrder && ORDER_STATES[visibleOrder?.product.incoterm.id].FINALIZADO

  const PENULTIMO_STATE =
    visibleOrder && PENULTIMOS_STATES[visibleOrder?.product.incoterm.id]

  const getFechaTag = () => {
    const deliveredStatusUpdate = visibleOrder?.status_updates.find((statusUpdate: any) => (statusUpdate.status.id === visibleOrder.status.id) && !statusUpdate.intermediate);
    if (deliveredStatusUpdate) {
      return <span className="w-fit bg-gray-page grid place-content-center px-2 py-1 rounded-md font-bold text-sm">
        {
          FormatDateWithTime(deliveredStatusUpdate?.date)
        }
      </span>
    }
  }


  return (
    <div className="lg:w-[70%] flex flex-col gap-y-4 w-full">
      {/* Numero - Estado y fehca de pedido */}
      <div className="flex flex-col gap-y-3">
        <span className="font-bold text-base text-dark-blue text-left">
        {t("order:order")} {visibleOrder?.id}
        </span>
        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
          <span
            className={`${visibleOrder?.status.id === FINALIZADO_STATE
              ? 'bg-light-green text-dark-blue'
              : visibleOrder?.status.id === RECHAZADO_STATE
                ? 'bg-alert-button text-white'
                : 'bg-blue-texts-buttons text-primary'
              } w-fit grid place-content-center px-2 py-1 rounded-md font-bold text-sm`}
          >
            {visibleOrder && visibleOrder.status.name}
          </span>
          {
            getFechaTag()
          }
        </div>
      </div>

      {/* Seccion Derecha (COMPRADOR) */}
      <div className="flex lg:hidden lg:w-[30%] flex-col lg:mt-[34px]">
        <SectionRight visibleOrder={visibleOrder} />
      </div>

      {/* Detalle de la compra */}
      <OrderDetail visibleOrder={visibleOrder} />

      {/* Envío */}
      <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-4">
        <span className="font-bold text-sm text-primary">{t("order:shipment")}</span>
        <span className="flex items-center gap-x-2">
          <span className="font-bold text-sm">{t("order:shipping method")}</span>
          <span className="font-normal text-xs">
            {visibleOrder?.product.incoterm.name}
          </span>
        </span>
      </section>

      {/* Pago */}
      <OrderPayInformation visibleOrder={visibleOrder} />

      {/* Documentos */}
      {((visibleOrder?.product.incoterm.id === INCOTERMS.FOB &&
        FOB_ORDER_STATES.ESPERANDO_ENVIO) ||
        visibleOrder?.status.id === PENULTIMO_STATE ||
        visibleOrder?.status.id === FINALIZADO_STATE) && (
          <OrderDocuments visibleOrder={visibleOrder} />
        )}
      {/* Información de envío */}
      {visibleOrder?.product.incoterm.id === INCOTERMS.FOB && (
        FOB_ORDER_STATES.ESPERANDO_ENVIO ||
        visibleOrder?.status.id === PENULTIMO_STATE ||
        visibleOrder?.status.id === FINALIZADO_STATE) && (
          <ShipmentInformation visibleOrder={visibleOrder} />
        )}
    </div>
  )
}

export default SectionLeft
