import { OrderModel } from "../../interfaces";

export const OrderPayInformation = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  return (
    <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
      <span
        className={`flex items-center justify-between ${
          visibleOrder?.payment_support && "mb-2"
        }`}
      >
        <span
          className={`font-bold text-sm text-Principal ${
            !visibleOrder?.payment_support && "mb-2"
          }`}
        >
          Pago
        </span>
      </span>
      <span className="flex items-center justify-between">
        <span className="font-bold text-sm">
          Subtotal&nbsp;&nbsp;&nbsp;(
          {`${visibleOrder?.quantity}`}
          &nbsp;item
          {`${visibleOrder && visibleOrder?.quantity > 1 ? "s" : ""}`})
        </span>
        {visibleOrder && (
          <span className="font-bold text-sm">
            USD {visibleOrder.product.price * visibleOrder.quantity}
          </span>
        )}
      </span>
      <div className="border my-2" />
      <span className="flex items-center justify-between">
        <span className="font-bold text-sm">Pago total:</span>
        {visibleOrder && (
          <span className="font-bold text-sm">
            USD {visibleOrder.product.price * visibleOrder.quantity}
          </span>
        )}
      </span>
    </section>
  );
};

export default OrderPayInformation;
