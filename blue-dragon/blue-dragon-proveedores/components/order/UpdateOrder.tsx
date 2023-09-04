import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FechaModel, OrderModel } from "../../interfaces";
import { PopUpContext } from "../../src/context/PopUpContext";
import { statusUpdate } from "../../src/redux/actions/pedidosActions";
import colores from "../../src/utils/colores";
/* import { INCOTERMS } from "../../src/utils/constants"; */
import ButtonPage from "../ButtonPage";

/* const CONFIRM_DELIVERY_TEXTS: any = {
  [INCOTERMS.EXW]: {
    textOne: "Haz click en aceptar cuando hayas entregado el pedido",
    textTwo: "Cuando se realizó la entrega:",
  },
  [INCOTERMS.FOB]: {
    textOne:
      "Haz click en aceptar cuando hayas entregado el pedido en puerto de origen",
    textTwo: "Cuando se realizó la entrega en el puerto:",
  },
}; */

export const UpdateOrder = ({
  visibleOrder,
  loadOrder,
}: {
  visibleOrder: OrderModel | null;
  loadOrder: () => Promise<void>;
}) => {
  const { query } = useRouter();
  const setPopUp = useContext(PopUpContext);
  const [loading, setloading] = useState(false);
  const [updateText, setUpdateText] = useState({
    updateText: "",
  });
  const [updateOrder, setUpdateOrder] = useState<FechaModel>({
    fecha: null,
    hora: null,
  });

  const uploadDate = (e: any) => {
    setUpdateOrder({
      ...updateOrder,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    if (!updateOrder.fecha || !updateOrder.hora) {
      alert("Sin información de fecha de entrega en puerto");
      return;
    }
    setloading(true);
    const res = await statusUpdate({
      name: updateText.updateText,
      intermediate: "true",
      date: `${updateOrder.fecha}T${updateOrder.hora}`,
      status: String(visibleOrder?.status.id),
      order: query.id as string,
    });
    setPopUp && setPopUp(null);
    loadOrder();
    setloading(false);
  };

  const handleUpdate = (e: any) => {
    setUpdateText({
      ...updateText,
      [e.target.name]: e.target.value,
    });
  };
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <span className="text-sm font-normal">
          {/* {visibleOrder &&
          CONFIRM_DELIVERY_TEXTS[visibleOrder?.product.incoterm.id].textOne} */}
          {t("order:enter any news you make before sending")}
        </span>
        <input
          className="border border-gray-page px-2 py-2 rounded-md font-semibold text-sm text-dark-blue focus:outline-none placeholder:font-light placeholder:text-sm"
          placeholder="El pedido se encuentra listo y empacado"
          type="text"
          name="updateText"
          id="updateText"
          onChange={handleUpdate}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <span className="font-normal text-sm">
          {/* {visibleOrder &&
            CONFIRM_DELIVERY_TEXTS[visibleOrder?.product.incoterm.id].textTwo} */}
          {t("order:when")}
        </span>
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
              <span className="md:px-5">{t("order:up-date")}</span>
            </ButtonPage>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateOrder;
