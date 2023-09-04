import Download from "../../assets/Download";
import File from "../../assets/File";
import { OrderModel } from "../../interfaces";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import ButtonPage from "../ButtonPage";

export const OrderDocuments = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  const invoiceSupport = `${S3_BUCKET_URL}${visibleOrder?.invoice_support}`;
  const packingSupport = `${S3_BUCKET_URL}${visibleOrder?.packing_support}`;
  const blSupport = `${S3_BUCKET_URL}${visibleOrder?.bl_support}`;

  return (
    <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
      <span className="font-bold text-sm text-Principal mb-2">Documentos</span>
      {!visibleOrder?.invoice_support &&
        !visibleOrder?.packing_support &&
        !visibleOrder?.bl_support && (
          <span className="text-sm font-light">No hay archivos</span>
        )}
      {visibleOrder?.invoice_support && (
        <span className="flex flex-col md:flex-row md:gap-x-3 md:items-center gap-y-2 md:gap-y-0 justify-between py-3 border-b border-b-backgroundPage last:border-b-0 last:border-none">
          <span className="flex items-center gap-x-4">
            <File />
            <div className="flex flex-col">
              <span className="text-sm font-bold">Factura_Empresa_Pedido</span>
            </div>
          </span>
          <ButtonPage>
            <a href={invoiceSupport}>
              <span className="flex justify-center md:items-center gap-x-3 px-4">
                <Download />
                <span>Descargar</span>
              </span>
            </a>
          </ButtonPage>
        </span>
      )}
      {visibleOrder?.packing_support && (
        <span className="flex flex-col md:flex-row md:gap-x-3 md:items-center gap-y-2 md:gap-y-0 justify-between py-3 border-b border-b-backgroundPage last:border-b-0 last:border-none">
          <span className="flex items-center gap-x-4">
            <File />
            <div className="flex flex-col">
              <span className="text-sm font-bold">
                Packing list_Empresa_Pedido
              </span>
            </div>
          </span>
          <ButtonPage>
            <a href={packingSupport}>
              <span className="flex justify-center md:items-center gap-x-3 px-4">
                <Download />
                <span>Descargar</span>
              </span>
            </a>
          </ButtonPage>
        </span>
      )}
      {visibleOrder?.bl_support && (
        <span className="flex flex-col md:flex-row md:gap-x-3 md:items-center gap-y-2 md:gap-y-0 justify-between py-3 border-b border-b-backgroundPage last:border-b-0 last:border-none">
          <span className="flex items-center gap-x-4">
            <File />
            <div className="flex flex-col">
              <span className="text-sm font-bold">BL</span>
            </div>
          </span>
          <ButtonPage>
            <a href={blSupport}>
              <span className="flex justify-center md:items-center gap-x-3 px-4">
                <Download />
                <span>Descargar</span>
              </span>
            </a>
          </ButtonPage>
        </span>
      )}
    </section>
  );
};

export default OrderDocuments;
