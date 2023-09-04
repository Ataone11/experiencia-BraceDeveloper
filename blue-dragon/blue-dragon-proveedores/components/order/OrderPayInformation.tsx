import { useTranslation } from "next-i18next";
import { OrderModel } from "../../interfaces";
import { S3_BUCKET } from "../../src/utils/constants";
import ButtonPage from "../ButtonPage";

export const OrderPayInformation = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  const paymentSupport = `${S3_BUCKET}${visibleOrder?.payment_support}`;
  const { t } = useTranslation();
  return (
    <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
      <span
        className={`flex items-center justify-between ${
          visibleOrder?.payment_support && "mb-2"
        }`}
      >
        <span
          className={`font-bold text-sm text-primary ${
            !visibleOrder?.payment_support && "mb-2"
          }`}
        >
          {t("order:payment")}
        </span>
        {visibleOrder?.payment_support && (
          <ButtonPage>
            <a href={paymentSupport}>
              <span className="px-4">{t("order:proof of payment")}</span>
            </a>
          </ButtonPage>
        )}
      </span>
      <span className="flex items-center justify-between">
        <span className="font-bold text-sm">
        {t("order:subtotal")}&nbsp;&nbsp;&nbsp;(
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
        <span className="font-bold text-sm">{t("order:pay-total")}</span>
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
