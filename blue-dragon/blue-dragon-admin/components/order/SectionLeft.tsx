import { OrderModel } from "../../interfaces";
import {
  FOB_ORDER_STATES,
  INCOTERMS,
  ORDER_STATES,
  PENULTIMOS_STATES,
  STATES_ORDER,
} from "../../src/utils/constants";
import { FormatDate } from "../../src/utils/functions";
import OrderDetail from "./OrderDetail";
import OrderDocuments from "./OrderDocuments";
import OrderPayInformation from "./OrderPayInformation";
/* import SectionRight from "./SectionRight"; */
import ShipmentInformation from "./ShipmentInformation";

export const SectionLeft = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  const FINALIZADO_STATE =
    visibleOrder && ORDER_STATES[visibleOrder?.product.incoterm.id].FINALIZADO;

  const PENULTIMO_STATE =
    visibleOrder && PENULTIMOS_STATES[visibleOrder?.product.incoterm.id];

  return (
    <div className="lg:w-[70%] flex flex-col gap-y-4 w-full">
      {/* Seccion Derecha (COMPRADOR) */}
      {/* <div className="flex lg:hidden lg:w-[30%] flex-col lg:mt-[34px]">
        <SectionRight visibleOrder={visibleOrder} />
      </div> */}

      {/* Order */}
      <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-5">
            <span className="font-bold text-base">
              Número de la orden: {visibleOrder?.id}
            </span>
            <span className="text-Principal font-normal text-[11px] bg-Active px-2 py-[2px] rounded">
              {`${visibleOrder?.status.name} ${
                visibleOrder?.product.incoterm.name === "FOB" &&
                visibleOrder?.status.name ===
                  STATES_ORDER[visibleOrder.status.id]
                  ? "a puerto"
                  : ""
              }`}
            </span>
          </div>
          <span className="font-bold text-base">
            {FormatDate(visibleOrder?.created_date as string)}
          </span>
        </div>
        <span className="font-normal text-sm">
          Contactate con el proveedor a través de chat para coordinar el envío.
        </span>
      </section>

      {/* Envío */}
      <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-4">
        <span className="font-bold text-sm text-Principal">Envío</span>
        <span className="flex items-center gap-x-2">
          <span className="font-bold text-sm">Metodo de envío:</span>
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
      {visibleOrder?.product.incoterm.id === INCOTERMS.FOB &&
        (FOB_ORDER_STATES.ESPERANDO_ENVIO ||
          visibleOrder?.status.id === PENULTIMO_STATE ||
          visibleOrder?.status.id === FINALIZADO_STATE) && (
          <ShipmentInformation visibleOrder={visibleOrder} />
        )}

      {/* Detalle de la compra */}
      {visibleOrder && visibleOrder.product_order && (
        <OrderDetail visibleOrder={visibleOrder} />
      )}
    </div>
  );
};

export default SectionLeft;
