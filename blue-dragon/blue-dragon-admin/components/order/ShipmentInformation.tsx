import { OrderModel } from "../../interfaces";
import { FOB_ORDER_STATES, ORDER_STATES } from "../../src/utils/constants";
import ButtonPage from "../ButtonPage";

export const ShipmentInformation = ({
  visibleOrder,
}: {
  visibleOrder: OrderModel | null;
}) => {
  return (
    <section className="rounded-lg bg-white p-4 shadow-md flex flex-col gap-y-2">
      <span className="font-bold text-sm text-Principal mb-2">
        Información de envío
      </span>
      <div className="flex md:items-center justify-between">
        <span className="text-base font-bold">Fábrica</span>
        <span className="text-[10px] font-normal text-Principal bg-Active py-[2px] px-1 rounded-md mt-10 ml-16">
          FOB
        </span>
        <span className="text-right text-base font-bold">Puerto de origen</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="w-[16px] h-[15px] rounded-full bg-Principal ml-5 z-[1]" />
        <div
          className={`w-[calc(100%-70px)] rounded-full ${
            [FOB_ORDER_STATES.ENVIADO, FOB_ORDER_STATES.FINALIZADO].includes(
              visibleOrder?.status?.id || -1
            )
              ? "bg-Principal h-[2px]"
              : "bg-Claro-intermedio h-[1px]"
          }`}
        >
          <div
            className="bg-Principal h-[1px] rounded-full"
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
              ? "bg-Principal"
              : "border border-Principal bg-white"
          } w-[16px] h-[15px] rounded-full mr-5 md:mr-[50.5px] z-[1]`}
        />
      </div>
      <span className="mx-auto text-xs font-normal w-44 text-center">
        {visibleOrder?.provider.company.name}
      </span>
      <span className="mx-auto">
        <ButtonPage>
          <span className="px-4">Detalle</span>
        </ButtonPage>
      </span>
    </section>
  );
};

export default ShipmentInformation;
