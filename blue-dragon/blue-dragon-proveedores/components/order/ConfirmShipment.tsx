import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FechaModel, OrderModel } from "../../interfaces";
import { PopUpContext } from "../../src/context/PopUpContext";
import { statusUpdate } from "../../src/redux/actions/pedidosActions";
import colores from "../../src/utils/colores";
import ButtonPage from "../ButtonPage";

export const ConfirmShipment = ({
  visibleOrder,
  loadOrder,
}: {
  visibleOrder: OrderModel | null;
  loadOrder: () => Promise<void>;
}) => {
  const { query } = useRouter();
  const setPopUp = useContext(PopUpContext);
  const [loading, setloading] = useState(false);
  const [dateShipmentOrder, setDateShipmentOrder] = useState<FechaModel>({
    fecha: null,
    hora: null,
  });
  const { t } = useTranslation();
  const uploadDate = (e: any) => {
    setDateShipmentOrder({
      ...dateShipmentOrder,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    if (!dateShipmentOrder.fecha || !dateShipmentOrder.hora) {
      alert(t("order:no ship date information"));
      return;
    }
    setloading(true);
    const res = await statusUpdate({
      intermediate: "false",
      date: `${dateShipmentOrder.fecha}T${dateShipmentOrder.hora}`,
      status: visibleOrder ? String(visibleOrder?.status.id + 1) : "4",
      order: query.id as string,
    });
    setPopUp && setPopUp(null);
    loadOrder();
    setloading(false);
  };

  return (
    <div className="flex flex-col gap-y-5">
      <span className="text-sm font-normal">
   {t("order:click on accept when you have sent the order to the port")}
      </span>
      <div className="flex flex-col gap-y-2">
        <span className="font-normal text-sm">{t("order:when you sent the order")}</span>
        <div className="flex items-center gap-x-3">
          <input
            className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
            type="date"
            name="fecha"
            id="fecha"
            required
            onChange={uploadDate}
          />
          <input
            className="border border-light-blue-intermedio rounded-lg px-2 py-1 font-semibold text-sm text-dark-blue focus:outline-none"
            type="time"
            name="hora"
            id="hora"
            required
            onChange={uploadDate}
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
              <span className="md:px-5">{t("order:acept")}</span>
            </ButtonPage>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmShipment;
