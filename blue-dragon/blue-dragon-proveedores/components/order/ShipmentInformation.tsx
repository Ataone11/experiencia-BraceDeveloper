import { useTranslation } from "next-i18next";
import { OrderModel } from "../../interfaces";
import { FOB_ORDER_STATES, ORDER_STATES } from "../../src/utils/constants";
import ButtonPage from "../ButtonPage";

export const ShipmentInformation = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  const { t } = useTranslation();
  return (
    <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
      <span className="font-bold text-sm text-primary mb-2">
      {t("order:shipment information")}
      </span>
      <div className="flex md:items-center justify-between">
        <span className="text-base font-bold">{t("order:factory")}</span>
        <span className="text-[10px] font-normal text-primary bg-blue-texts-buttons py-[2px] px-1 rounded-md mt-10 ml-16">
          FOB
        </span>
        <span className="text-right text-base font-bold">{t("order:port-origin")}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="w-[16px] h-[15px] rounded-full bg-primary ml-5 z-[1]" />
        <div className={`w-[calc(100%-70px)] rounded-full ${[FOB_ORDER_STATES.ENVIADO, FOB_ORDER_STATES.FINALIZADO].includes(visibleOrder?.status?.id || -1) ? "bg-primary h-[2px]" : "bg-light-blue-intermedio h-[1px]"}`}>
          <div
            className="bg-primary h-[1px] rounded-full"
            style={
              visibleOrder?.status.id === ORDER_STATES.ENVIADO
                ? { width: "53%" }
                : visibleOrder?.status.id === ORDER_STATES.FINALIZADO
                ? { width: "100%" }
                : { width: "0%" }
            }
          />
        </div>
        <span
          className={`${
            visibleOrder?.status.id === FOB_ORDER_STATES.FINALIZADO
              ? "bg-primary"
              : "border border-light-blue-intermedio bg-white"
          } w-[16px] h-[15px] rounded-full mr-5 md:mr-[50.5px] z-[1]`}
        />
      </div>
      <span className="mx-auto text-xs font-normal w-44 text-center">
        {visibleOrder?.provider.company.name}
      </span>
    </section>
  );
};

export default ShipmentInformation;
