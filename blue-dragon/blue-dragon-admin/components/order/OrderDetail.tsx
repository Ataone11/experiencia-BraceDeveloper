import Image from "next/image";
import { OrderModel } from "../../interfaces";
import ThruLogo from "../../assets/logo_blue.svg";
import { S3_BUCKET_URL } from "../../src/utils/constants";
import ImageWithFallback from "../general/ImageWithFallback";

export const OrderDetail = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  const variantValues =
    visibleOrder?.product_order?.variant_values &&
    JSON.parse(visibleOrder?.product_order.variant_values);

  return (
    <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-4">
      <span className="font-bold text-sm text-Principal">
        Detalle de la compra
      </span>
      <div className="flex flex-col gap-y-5 md:flex-row md:gap-x-5">
        <div className="flex gap-x-4 md:block">
          <div className="bg-white w-[60px] h-[50px] md:w-28 md:h-24 rounded-md relative overflow-hidden">
            <ImageWithFallback
              src={
                `${visibleOrder?.product_order.photo}`
              }
              layout="fill"
              objectFit="cover"
              alt={visibleOrder?.product_order.name}
            />
          </div>
          <span className="font-bold text-sm block md:hidden">
            {visibleOrder?.product_order?.name}
          </span>
        </div>
        <div className="flex flex-col gap-y-2">
          <span className="font-bold text-sm md:block hidden">
            {visibleOrder?.product_order?.name}
            {variantValues?.length > 0 &&
              ` - ${variantValues
                .map(
                  (variantValue: any) =>
                    `${variantValue.variant.name}: ${variantValue.value}`
                )
                .join(", ")}`}
          </span>
          <span className="flex items-center gap-x-4 md:gap-x-10">
            <span className="flex items-center gap-x-2">
              <span className="font-bold text-sm">Precio:</span>
              <span className="font-normal text-xs">
                USD{" "}
                {visibleOrder?.product_order?.discount_price ||
                  visibleOrder?.product_order?.price}
              </span>
            </span>
            <span className="flex items-center gap-x-2">
              {/* TODO: CAMBIAR UNIDAD POR LA DEL PRODUCT_ORDER */}
              <span className="font-bold text-sm">{`Cantidad ${visibleOrder?.product.product_detail.product.unit ?? "sets"
                }:`}</span>
              <span className="font-normal text-xs">
                {visibleOrder?.quantity}
              </span>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;
